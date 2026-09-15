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
    const versions = await prisma.version.findMany({
      where: {
        status: {
          in: ['live', 'archived'],
        },
      },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        version: true,
        code: true,
        status: true,
        size: true,
        platform: true,
        downloads: true,
        publishedAt: true,
        releaseNotes: true,
      },
    });

    return NextResponse.json({
      success: true,
      versions,
    });
  } catch (error) {
    logger.error('Error fetching public versions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch versions', versions: [] },
      { status: 500 }
    );
  }
}
