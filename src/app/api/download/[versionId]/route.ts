import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { logger } from '../../../../lib/logger';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function GET(
  request: NextRequest,
  { params }: { params: { versionId: string } }
) {
  try {
    const { versionId } = params;

    const version = await prisma.version.findUnique({
      where: { id: versionId },
    });

    if (!version) {
      return NextResponse.json(
        { error: 'Version not found' },
        { status: 404 }
      );
    }

    // ✅ Allow public download of live versions
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === 'ADMIN';

    if (version.status !== 'live' && !isAdmin) {
      return NextResponse.json(
        { error: 'This version is not available for download' },
        { status: 403 }
      );
    }

    // ✅ Resolve file path correctly
    // filePath is stored like "/uploads/apks/uuid-file.apk"
    const absolutePath = join(process.cwd(), version.filePath);

    if (!existsSync(absolutePath)) {
      logger.error(`File not found: ${absolutePath}`);
      return NextResponse.json(
        { error: 'APK file not found on server' },
        { status: 404 }
      );
    }

    const fileBuffer = await readFile(absolutePath);

    // ✅ Increment download count
    await prisma.version.update({
      where: { id: versionId },
      data: { downloads: { increment: 1 } },
    });

    // ✅ Return file with proper headers for download
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.android.package-archive',
        'Content-Disposition': `attachment; filename="${version.fileName}"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    logger.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    );
  }
}
