import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import { logger } from "./logger";
import { loginSchema } from "./validation";
import { checkRateLimit } from "./rate-limit";

// ✅ Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  logger.error('❌ DATABASE_URL is not set in environment variables');
  throw new Error('DATABASE_URL is required. Please check your .env file.');
}

// ✅ Create connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// ✅ Create adapter
const adapter = new PrismaPg(pool);

// ✅ Pass adapter to PrismaClient
const prisma = new PrismaClient({ adapter });

// ✅ Check if NEXTAUTH_SECRET is set
if (!process.env.NEXTAUTH_SECRET) {
  logger.error('❌ NEXTAUTH_SECRET is not set in environment variables');
  throw new Error('NEXTAUTH_SECRET is required. Please check your .env file.');
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // ✅ Rate limiting
          const ip = credentials?.ip || 'unknown';
          const rateLimitResult = await checkRateLimit(`auth:${ip}`);
          
          if (!rateLimitResult.success) {
            logger.warn(`Rate limit exceeded for IP: ${ip}`);
            throw new Error('Too many login attempts. Please try again later.');
          }

          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          // ✅ Validate input
          const validated = loginSchema.safeParse({
            email: credentials.email,
            password: credentials.password,
          });

          if (!validated.success) {
            const errors = validated.error.errors.map(e => e.message).join(', ');
            logger.warn(`Login validation failed: ${errors}`);
            throw new Error("Invalid credentials format");
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user || !user.password) {
            logger.warn(`Login attempt for non-existent user: ${credentials.email}`);
            throw new Error("Invalid email or password");
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);

          if (!isValid) {
            logger.warn(`Failed login attempt for user: ${credentials.email}`);
            throw new Error("Invalid email or password");
          }

          logger.info(`User logged in: ${user.email}`);

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          logger.error('Authorize error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/admin-login",
    error: "/admin-login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

// Extend NextAuth types
declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    id?: string;
  }
}
