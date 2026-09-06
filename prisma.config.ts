import { defineConfig } from 'prisma/config';
import dotenv from 'dotenv';
import { resolve } from 'path';

const result = dotenv.config();

if (result.error) {
  console.warn('⚠️ No .env file found or error loading it:', result.error.message);
} else {
  console.log('✅ .env file loaded successfully');
}

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    path: './prisma/migrations',
  },
});
