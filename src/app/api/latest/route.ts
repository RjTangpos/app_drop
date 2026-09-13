import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { logger } from '../../../lib/logger';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function GET() {
  try {
    const latestVersion = await prisma.version.findFirst({
      where: { status: 'live' },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        version: true,
        size: true,
        fileSize: true,
        platform: true,
        downloads: true,
        publishedAt: true,
        fileHash: true,
        fileName: true,
        releaseNotes: true,
      },
    });

    if (!latestVersion) {
      return NextResponse.json(
        { error: 'No live version available' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      version: latestVersion,
      downloadUrl: `/api/download/${latestVersion.id}`,
    });
  } catch (error) {
    logger.error('Error fetching latest version:', error);
    return NextResponse.json(
      { error: 'Failed to fetch latest version' },
      { status: 500 }
    );
  }
}
