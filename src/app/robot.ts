import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/changelog', '/versions', '/privacy', '/terms'],
      disallow: ['/api/', '/_next/', '/admin-dashboard/', '/admin-login'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
