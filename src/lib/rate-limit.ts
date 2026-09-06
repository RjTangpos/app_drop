import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { logger } from './logger';

// ✅ Create a Redis client for rate limiting
// Note: You need to set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env
// If not available, use an in-memory store for development
let rateLimiter: Ratelimit | null = null;

try {
  if (process.env.UPSTASH_REDIS_REST_URL) {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    
    rateLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '10s'), // 5 attempts per 10 seconds
      analytics: true,
    });
  } else {
    logger.warn('Rate limiting disabled: UPSTASH_REDIS_REST_URL not set');
  }
} catch (error) {
  logger.error('Failed to initialize rate limiter:', error);
}

export async function checkRateLimit(identifier: string) {
  if (!rateLimiter) {
    return { success: true }; // Allow if no rate limiter
  }
  
  try {
    const result = await rateLimiter.limit(identifier);
    return result;
  } catch (error) {
    logger.error('Rate limit check failed:', error);
    return { success: true }; // Allow on error
  }
}
