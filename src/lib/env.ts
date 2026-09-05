interface EnvConfig {
  siteUrl: string;
  adminEmail: string;
  adminPassword: string;
  nodeEnv: string;
}

export function validateEnv(): EnvConfig {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  const nodeEnv = process.env.NODE_ENV || 'development';

  // ✅ Validate required variables
  const errors: string[] = [];

  if (!siteUrl) {
    errors.push('NEXT_PUBLIC_SITE_URL is required');
  }

  // ✅ Only require admin credentials in production
  if (nodeEnv === 'production') {
    if (!adminEmail) {
      errors.push('NEXT_PUBLIC_ADMIN_EMAIL is required in production');
    }
    if (!adminPassword) {
      errors.push('NEXT_PUBLIC_ADMIN_PASSWORD is required in production');
    }
  }

  if (errors.length > 0) {
    console.error('❌ Environment validation failed:', errors.join(', '));
    if (nodeEnv === 'production') {
      throw new Error(`Environment validation failed: ${errors.join(', ')}`);
    }
  }

  return {
    siteUrl: siteUrl || 'http://localhost:3000',
    adminEmail: adminEmail || '',
    adminPassword: adminPassword || '',
    nodeEnv,
  };
}

export const env = validateEnv();
