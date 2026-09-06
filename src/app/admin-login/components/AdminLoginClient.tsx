'use client';

import React, { useState, useEffect } from 'react';
import { signIn, useSession, getCsrfToken } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import AppLogo from '../../../components/ui/AppLogo';
import Link from 'next/link';

export default function AdminLoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');

  const callbackUrl = searchParams?.get('callbackUrl') || '/admin-dashboard';

  // ✅ Get CSRF token
  useEffect(() => {
    getCsrfToken().then((token) => {
      setCsrfToken(token || '');
    });
  }, []);

  // ✅ Redirect if already authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        csrfToken,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        // ✅ Better error messages
        if (result.error === 'CredentialsSignin') {
          setError('Invalid email or password. Please try again.');
        } else if (result.error.includes('rate limit') || result.error.includes('Too many')) {
          setError('Too many login attempts. Please wait a moment and try again.');
        } else {
          setError(result.error);
        }
        setLoading(false);
        return;
      }

      if (result?.ok) {
        router.push(callbackUrl);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  // ✅ Show loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-surface-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  // ✅ Check if authentication is configured
  const isAuthConfigured = process.env.NEXTAUTH_SECRET && process.env.DATABASE_URL;

  return (
    <div className="min-h-screen bg-surface-dark flex items-center justify-center relative overflow-hidden px-4">
      {/* Background */}
      <div className="absolute inset-0 grid-lines-dark pointer-events-none" />
      <div className="absolute inset-0 hero-glow-dark pointer-events-none" />

      {/* Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 blob-primary opacity-40 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 blob-accent opacity-30 pointer-events-none" />

      {/* Back to site */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-medium text-white/50 hover:text-white/80 transition-colors"
        aria-label="Return to main site"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        Back to site
      </Link>

      {/* Login Card */}
      <div className="animate-fade-scale opacity-0 relative z-10 w-full max-w-md" style={{ animationFillMode: 'forwards' }}>
        <div className="glass-panel-dark border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <AppLogo size={40} />
            <div>
              <p className="font-bold text-white text-lg leading-tight">AppDrop</p>
              <p className="text-xs text-white/40 font-medium uppercase tracking-widest">Admin Portal</p>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
            Welcome back
          </h1>
          <p className="text-sm text-white/50 mb-8">
            Sign in to manage your app distribution.
          </p>

          {/* ⚠️ Configuration Warning */}
          {!isAuthConfigured && (
            <div
              className="mb-6 flex items-center gap-2 px-4 py-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl"
              role="alert"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400 flex-shrink-0">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="text-xs text-yellow-400">
                Authentication service is not configured. Please set up your environment variables.
              </p>
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div
              className="mb-6 flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl animate-fade-up"
              role="alert"
              aria-live="assertive"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 flex-shrink-0">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          {/* Form - Only show if configured */}
          {isAuthConfigured ? (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* CSRF Token */}
              <input type="hidden" name="csrfToken" value={csrfToken} />
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@appdrop.io"
                    required
                    aria-required="true"
                    autoComplete="email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-primary/60 focus:bg-white/8 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    aria-required="true"
                    autoComplete="current-password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-12 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-primary/60 focus:bg-white/8 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" x2="23" y1="1" y2="23"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-download w-full py-4 text-primary-foreground text-sm font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label={loading ? 'Signing in...' : 'Sign in to admin panel'}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/>
                      <path d="m12 5 7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          ) : (
            // ✅ Show configuration instructions when not configured
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-white mb-2">To fix this issue:</h3>
                <ol className="text-xs text-white/60 space-y-2 list-decimal list-inside">
                  <li>Open your <code className="text-primary">.env</code> file</li>
                  <li>Set <code className="text-primary">NEXTAUTH_SECRET</code> to a secure value</li>
                  <li>Set <code className="text-primary">DATABASE_URL</code> to your database connection</li>
                  <li>Restart the development server</li>
                </ol>
              </div>
              <p className="text-center text-xs text-white/25 mt-4">
                Contact your system administrator for configuration assistance.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
