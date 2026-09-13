import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { logger } from '@/lib/logger';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['live', 'draft', 'archived'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    // ✅ Update version status
    const updated = await prisma.version.update({
      where: { id },
      data: {
        status: status as VersionStatus,
        publishedAt: status === 'live' ? new Date() : null,
      },
    });

    // ✅ If setting to live, archive others
    if (status === 'live') {
      await prisma.version.updateMany({
        where: {
          status: 'live',
          id: { not: id },
        },
        data: { status: 'archived' },
      });
    }

    logger.info(`Version ${updated.version} status updated to ${status}`);

    return NextResponse.json({
      success: true,
      version: updated,
    });

  } catch (error) {
    logger.error('Error updating version:', error);
    return NextResponse.json(
      { error: 'Failed to update version' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;

    // ✅ Delete version (only if draft)
    const version = await prisma.version.findUnique({
      where: { id },
    });

    if (!version) {
      return NextResponse.json(
        { error: 'Version not found' },
        { status: 404 }
      );
    }

    if (version.status === 'live') {
      return NextResponse.json(
        { error: 'Cannot delete live version. Archive it first.' },
        { status: 400 }
      );
    }

    // ✅ Delete file from filesystem
    const filePath = join(process.cwd(), version.filePath);
    try {
      await unlink(filePath);
    } catch (err) {
      logger.warn(`Could not delete file: ${filePath}`);
    }

    await prisma.version.delete({
      where: { id },
    });

    logger.info(`Version ${version.version} deleted`);

    return NextResponse.json({
      success: true,
      message: 'Version deleted successfully',
    });

  } catch (error) {
    logger.error('Error deleting version:', error);
    return NextResponse.json(
      { error: 'Failed to delete version' },
      { status: 500 }
    );
  }
}
