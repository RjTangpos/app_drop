import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { readFile, stat } from 'fs/promises';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { logger } from '../../../lib/logger';

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

    // 1. ✅ Get version from database
    const version = await prisma.version.findUnique({
      where: { id: versionId },
    });

    if (!version) {
      return NextResponse.json(
        { error: 'Version not found' },
        { status: 404 }
      );
    }

    // 2. ✅ Check if version is live (or user is admin)
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === 'ADMIN';
    
    if (version.status !== 'live' && !isAdmin) {
      return NextResponse.json(
        { error: 'This version is not available for download' },
        { status: 403 }
      );
    }

    // 3. ✅ Check if file exists
    const filePath = join(process.cwd(), version.filePath);
    try {
      await stat(filePath);
    } catch {
      logger.error(`File not found: ${filePath}`);
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // 4. ✅ Read file
    const fileBuffer = await readFile(filePath);

    // 5. ✅ Increment download count
    await prisma.version.update({
      where: { id: versionId },
      data: { downloads: { increment: 1 } },
    });

    // 6. ✅ Return file
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/vnd.android.package-archive',
        'Content-Disposition': `attachment; filename="${version.fileName}"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'public, max-age=31536000',
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
