'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

interface ChangelogVersion {
  id: string;
  version: string;
  code: number;
  status: 'live' | 'archived';
  size: string;
  platform: string;
  downloads: number;
  publishedAt: string;
  releaseNotes: string | null;
  isLatest?: boolean;
}

// ✅ Fallback mock data (used when DB has no versions)
const FALLBACK_VERSIONS: ChangelogVersion[] = [
  {
    id: 'mock-1',
    version: 'v1.0.0',
    code: 1,
    status: 'live',
    size: '18.4 MB',
    platform: 'Android 8.0+',
    downloads: 0,
    publishedAt: new Date().toISOString(),
    isLatest: true,
    releaseNotes: `Welcome to the first stable release of NEOReader!

• Support for 200+ manga, manhwa, and manhua sources
• Unified library with cross-source progress tracking
• Offline reading with chapter downloads
• Dark theme by default, with multiple reader modes
• Categories, genres, and advanced search
• Zero ads, zero telemetry, zero tracking`,
  },
];

const STATUS_CONFIG = {
  live: { label: 'Latest', className: 'badge-live' },
  archived: { label: 'Archived', className: 'badge-archived' },
};

export default function ChangelogPage() {
  const [versions, setVersions] = useState<ChangelogVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    fetch('/api/versions-public')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.versions) && data.versions.length > 0) {
          const sorted = [...data.versions].sort(
            (a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
          );
          setVersions(
            sorted.map((v, i) => ({
              ...v,
              isLatest: i === 0 && v.status === 'live',
            }))
          );
          // Auto-expand latest
          if (sorted[0]) setExpandedId(sorted[0].id);
        } else {
          setVersions(FALLBACK_VERSIONS);
          setUsingFallback(true);
          setExpandedId(FALLBACK_VERSIONS[0].id);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch versions:', err);
        setVersions(FALLBACK_VERSIONS);
        setUsingFallback(true);
        setExpandedId(FALLBACK_VERSIONS[0].id);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 blob-primary opacity-40 pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-64 h-64 blob-accent opacity-30 pointer-events-none" />
        <div className="absolute inset-0 grid-lines opacity-50 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-full text-xs font-semibold text-primary uppercase tracking-widest mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
            Release History
          </div>

          <h1 className="text-display font-bold text-foreground mb-4 tracking-tight">
            Changelog
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Every release, every fix, every new source. NEOReader is built in the open —
            here's exactly what changed and when.
          </p>

          {usingFallback && (
            <p className="mt-4 text-xs text-muted-foreground/70 italic">
              Showing initial release. Live version data will appear once published.
            </p>
          )}
        </div>
      </section>

      {/* Versions timeline */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
            </div>
          ) : (
            <div className="relative">
              {/* Vertical timeline line */}
              <div
                className="absolute left-4 sm:left-6 top-2 bottom-2 w-px bg-border"
                aria-hidden="true"
              />

              <div className="space-y-6">
                {versions.map((ver, idx) => {
                  const status = STATUS_CONFIG[ver.status] || STATUS_CONFIG.archived;
                  const isExpanded = expandedId === ver.id;
                  const isLatest = ver.isLatest;

                  return (
                    <div
                      key={ver.id}
                      className="relative pl-12 sm:pl-16"
                    >
                      {/* Timeline dot */}
                      <div
                        className={`absolute left-2 sm:left-4 top-6 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center ${
                          isLatest
                            ? 'bg-primary border-primary/40 shadow-lg shadow-primary/30'
                            : 'bg-card border-border'
                        }`}
                        aria-hidden="true"
                      >
                        {isLatest && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        )}
                      </div>

                      {/* Card */}
                      <div
                        className={`bg-card border rounded-2xl overflow-hidden transition-all duration-300 ${
                          isLatest
                            ? 'border-primary/30 shadow-lg shadow-primary/5'
                            : 'border-border hover:border-border/80'
                        }`}
                      >
                        {/* Header row */}
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : ver.id)}
                          className="w-full flex flex-wrap items-center gap-3 p-5 cursor-pointer hover:bg-muted/30 transition-colors text-left"
                          aria-expanded={isExpanded}
                          aria-controls={`notes-${ver.id}`}
                        >
                          <span className="font-mono text-lg font-bold text-foreground">
                            {ver.version}
                          </span>

                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.className}`}
                          >
                            {isLatest ? 'Latest' : status.label}
                          </span>

                          {ver.publishedAt && (
                            <span className="text-xs text-muted-foreground">
                              {new Date(ver.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          )}

                          <div className="flex-1" />

                          <span className="text-xs text-muted-foreground font-mono">
                            {ver.size}
                          </span>

                          <svg
                            className={`text-muted-foreground transition-transform duration-300 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>

                        {/* Expanded notes */}
                        {isExpanded && (
                          <div
                            id={`notes-${ver.id}`}
                            className="px-5 pb-5 border-t border-border pt-4"
                          >
                            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                              What&apos;s new
                            </p>

                            {ver.releaseNotes ? (
                              <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                                {ver.releaseNotes}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground italic">
                                No release notes for this version.
                              </p>
                            )}

                            {/* Actions */}
                            <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-border">
                              {isLatest ? (
                                <Link
                                  href="/#download"
                                  className="text-xs font-semibold px-4 py-2 btn-download text-primary-foreground rounded-xl flex items-center gap-1.5"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" x2="12" y1="15" y2="3" />
                                  </svg>
                                  Download this version
                                </Link>
                              ) : (
                                <Link
                                  href="/versions"
                                  className="text-xs font-semibold px-4 py-2 bg-secondary border border-border rounded-xl text-foreground hover:bg-muted transition-colors"
                                >
                                  View in versions →
                                </Link>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
