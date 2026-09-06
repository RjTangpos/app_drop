import { defineConfig } from 'prisma/config';
import dotenv from 'dotenv';
import { resolve } from 'path';

const envPath = resolve(process.cwd(), '.env');
console.log('Loading .env from:', envPath);

const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('❌ Error loading .env:', result.error.message);
} else {
  console.log('✅ .env loaded successfully');
  console.log('📋 DATABASE_URL:', !!process.env.DATABASE_URL);
  console.log('📋 NEXTAUTH_SECRET:', !!process.env.NEXTAUTH_SECRET);
  console.log('📋 NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
}

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    path: './prisma/migrations',
    seed: 'npx tsx prisma/seed.ts',
  },
});
