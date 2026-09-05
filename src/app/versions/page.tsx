'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface Version {
  id: string;
  version: string;
  code: number;
  status: 'live' | 'archived';
  size: string;
  platform: string;
  downloads: number;
  publishedAt: string;
  releaseNotes: string[];
  isLatest?: boolean;
}

const versions: Version[] = [
  {
    id: '1',
    version: 'v3.2.1',
    code: 32,
    status: 'live',
    size: '18.4 MB',
    platform: 'Android 8.0+',
    downloads: 8241,
    publishedAt: 'Aug 12, 2026',
    isLatest: true,
    releaseNotes: [
      'Fixed crash on Android 14 devices',
      'Improved battery usage by 15%',
      'Updated UI components for better accessibility',
      'Performance improvements across all screens',
    ],
  },
  {
    id: '2',
    version: 'v3.2.0',
    code: 31,
    status: 'archived',
    size: '20.5 MB',
    platform: 'Android 8.0+',
    downloads: 12400,
    publishedAt: 'Jul 28, 2026',
    releaseNotes: [
      'Major UI refresh with new design system',
      'Dark mode improvements and new color palette',
      'New analytics dashboard for power users',
      'Faster app startup time (40% improvement)',
    ],
  },
  {
    id: '3',
    version: 'v3.1.4',
    code: 30,
    status: 'archived',
    size: '19.8 MB',
    platform: 'Android 8.0+',
    downloads: 3200,
    publishedAt: 'Jul 10, 2026',
    releaseNotes: [
      'Critical security patch for data encryption',
      'Performance improvements for low-end devices',
      'Fixed notification delivery issues',
    ],
  },
];

export default function VersionsPage() {
  const [expandedId, setExpandedId] = useState<string | null>('1');

  const latestVersion = versions.find((v) => v.isLatest);
  const olderVersions = versions.filter((v) => !v.isLatest);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* Page Hero */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 blob-primary opacity-40 pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-64 h-64 blob-accent opacity-30 pointer-events-none" />
        <div className="absolute inset-0 grid-lines opacity-50 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-full text-xs font-semibold text-primary uppercase tracking-widest mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
            All Releases
          </div>

          <h1 className="text-display font-bold text-foreground mb-4 tracking-tight">
            App <span className="text-gradient">Versions</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Download any version of AppDrop. We recommend always using the latest release for the best experience and security.
          </p>
        </div>
      </section>

      {/* Latest Version — Featured */}
      {latestVersion && (
        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Latest Release</p>

            <div className="relative bg-surface-dark rounded-3xl overflow-hidden border border-white/10 p-8">
              {/* Glow */}
              <div className="absolute inset-0 hero-glow-dark pointer-events-none" />
              <div className="absolute top-0 right-0 w-64 h-64 blob-accent opacity-20 pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-6">
                {/* Version info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="font-mono text-3xl font-bold text-white">{latestVersion.version}</span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                      Latest
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-6 text-sm text-white/60">
                    <span className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>
                      </svg>
                      {latestVersion.platform}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
                      </svg>
                      {latestVersion.size}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
                      </svg>
                      {latestVersion.publishedAt}
                    </span>
                    <span className="flex items-center gap-1.5 text-white/80 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                      {latestVersion.downloads.toLocaleString()} downloads
                    </span>
                  </div>

                  {/* Release notes */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">What&apos;s New</p>
                    <ul className="space-y-2">
                      {latestVersion.releaseNotes.map((note, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                          <svg className="mt-0.5 flex-shrink-0 text-accent" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Download CTA */}
                <div className="sm:w-56 flex-shrink-0">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                    <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
                      </svg>
                    </div>
                    <p className="text-white font-semibold text-sm mb-1">{latestVersion.version}</p>
                    <p className="text-white/50 text-xs mb-4">{latestVersion.size} · APK</p>
                    <button className="w-full btn-download py-3 rounded-xl text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
                      </svg>
                      Download APK
                    </button>
                    <p className="text-white/30 text-xs mt-3">Free · No account needed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Older Versions */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Previous Releases</p>

          <div className="space-y-3">
            {olderVersions.map((ver) => {
              const isExpanded = expandedId === ver.id;

              return (
                <div
                  key={ver.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden card-lift"
                >
                  {/* Row */}
                  <div
                    className="flex flex-wrap items-center gap-4 p-5 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : ver.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setExpandedId(isExpanded ? null : ver.id)}
                    aria-expanded={isExpanded}
                  >
                    {/* Version + status */}
                    <div className="flex items-center gap-3 min-w-[120px]">
                      <span className="font-mono text-sm font-bold text-foreground">{ver.version}</span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full badge-archived">
                        Archived
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-x-6 gap-y-1 flex-1 text-xs text-muted-foreground">
                      <span>{ver.size}</span>
                      <span>{ver.platform}</span>
                      <span>{ver.publishedAt}</span>
                      <span className="text-foreground font-medium">{ver.downloads.toLocaleString()} downloads</span>
                    </div>

                    {/* Chevron */}
                    <div className={`text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </div>
                  </div>

                  {/* Expanded */}
                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-border pt-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Release Notes</p>
                      <ul className="space-y-2 mb-5">
                        {ver.releaseNotes.map((note, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                            <svg className="mt-0.5 flex-shrink-0 text-primary" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            {note}
                          </li>
                        ))}
                      </ul>

                      <button className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 bg-secondary border border-border rounded-xl text-foreground hover:bg-muted transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
                        </svg>
                        Download {ver.version} ({ver.size})
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Install help strip */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground mb-1">Need help installing?</p>
              <p className="text-xs text-muted-foreground">Enable &quot;Install from unknown sources&quot; in your Android settings before installing the APK file.</p>
            </div>
            <Link
              href="/#install"
              className="flex-shrink-0 text-xs font-semibold px-4 py-2.5 bg-card border border-border rounded-xl text-foreground hover:bg-muted transition-colors"
            >
              View Guide →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
