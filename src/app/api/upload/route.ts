import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { writeFile, mkdir, stat } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'crypto';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { logger } from '@/lib/logger';

// ✅ Configuration
const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads/apks';
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ALLOWED_EXTENSIONS = ['.apk', '.aab'];

// ✅ Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// ✅ Helper: Calculate file hash
async function calculateFileHash(buffer: Buffer): Promise<string> {
  const hash = createHash('sha256');
  hash.update(buffer);
  return hash.digest('hex');
}

// ✅ Helper: Format file size
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

export async function POST(request: NextRequest) {
  try {
    // 1. ✅ Authentication Check
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      logger.warn('Unauthorized upload attempt');
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    // 2. ✅ Parse FormData
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const versionName = formData.get('versionName') as string;
    const versionCode = formData.get('versionCode') as string;
    const releaseNotes = formData.get('releaseNotes') as string;
    const minAndroid = formData.get('minAndroid') as string || '8.0';
    const status = formData.get('status') as 'live' | 'draft' || 'draft';

    // 3. ✅ Validate Required Fields
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!versionName) {
      return NextResponse.json(
        { error: 'Version name is required' },
        { status: 400 }
      );
    }

    if (!versionCode || isNaN(parseInt(versionCode))) {
      return NextResponse.json(
        { error: 'Valid version code is required' },
        { status: 400 }
      );
    }

    // 4. ✅ Validate File
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const isAllowed = ALLOWED_EXTENSIONS.some(ext => 
      file.name.toLowerCase().endsWith(ext)
    );

    if (!isAllowed) {
      return NextResponse.json(
        { error: `Only ${ALLOWED_EXTENSIONS.join(', ')} files are allowed` },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit` },
        { status: 400 }
      );
    }

    // 5. ✅ Check for duplicate version
    const existingVersion = await prisma.version.findFirst({
      where: {
        version: versionName,
        OR: [
          { code: parseInt(versionCode) }
        ]
      }
    });

    if (existingVersion) {
      return NextResponse.json(
        { error: `Version ${versionName} or code ${versionCode} already exists` },
        { status: 409 }
      );
    }

    // 6. ✅ Process File
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileHash = await calculateFileHash(buffer);
    const formattedSize = formatFileSize(file.size);

    // 7. ✅ Save File to Filesystem
    const uploadDir = join(process.cwd(), UPLOAD_DIR);
    await mkdir(uploadDir, { recursive: true });

    // Generate unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const uniqueFilename = `${uuidv4()}-${versionName.replace(/^v/, '')}-${timestamp}.apk`;
    const filePath = join(uploadDir, uniqueFilename);
    const relativePath = `/${UPLOAD_DIR.replace(/^\.\//, '')}/${uniqueFilename}`;

    await writeFile(filePath, buffer);
    logger.info(`File saved: ${filePath}`);

    // 8. ✅ Save to Database
    const newVersion = await prisma.version.create({
      data: {
        version: versionName,
        code: parseInt(versionCode),
        status: status as VersionStatus,
        size: formattedSize,
        platform: `Android ${minAndroid}+`,
        downloads: 0,
        publishedAt: status === 'live' ? new Date() : null,
        releaseNotes: releaseNotes || null,
        filePath: relativePath,
        fileName: file.name,
        fileSize: file.size,
        fileHash: fileHash,
        userId: session.user.id,
      },
    });

    // 9. ✅ If this is a live version, set others to archived
    if (status === 'live') {
      await prisma.version.updateMany({
        where: {
          status: 'live',
          id: { not: newVersion.id },
        },
        data: { status: 'archived' },
      });
      
      logger.info(`Version ${versionName} set to live, archived previous versions`);
    }

    // 10. ✅ Return Success Response
    logger.info(`Version ${versionName} uploaded successfully by ${session.user.email}`);
    
    return NextResponse.json({
      success: true,
      message: 'Version uploaded successfully',
      version: {
        id: newVersion.id,
        version: newVersion.version,
        code: newVersion.code,
        status: newVersion.status,
        size: newVersion.size,
        platform: newVersion.platform,
        publishedAt: newVersion.publishedAt,
        filePath: newVersion.filePath,
        fileName: newVersion.fileName,
      },
    });

  } catch (error) {
    logger.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file. Please try again.' },
      { status: 500 }
    );
  }
}

// ✅ GET endpoint to list versions
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const versions = await prisma.version.findMany({
      orderBy: {
        createdAt: 'desc',
      },
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
        filePath: true,
        fileName: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      versions,
    });
  } catch (error) {
    logger.error('Error fetching versions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch versions' },
      { status: 500 }
    );
  }
}
