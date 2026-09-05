'use client';

import React, { useState, useCallback, useMemo } from 'react';

interface Version {
  id: string;
  version: string;
  code: number;
  status: 'live' | 'draft' | 'archived';
  size: string;
  platform: string;
  downloads: number;
  publishedAt: string;
  releaseNotes: string;
}

const mockVersions: Version[] = [
  {
    id: '1',
    version: 'v3.2.1',
    code: 32,
    status: 'live',
    size: '18.4 MB',
    platform: 'Android 8.0+',
    downloads: 8241,
    publishedAt: 'Aug 12, 2026',
    releaseNotes: 'Fixed crash on Android 14, improved battery usage by 15%, updated UI components.',
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
    releaseNotes: 'Major UI refresh, dark mode improvements, new analytics dashboard.',
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
    releaseNotes: 'Security patch, performance improvements.',
  },
  {
    id: '4',
    version: 'v3.3.0-beta',
    code: 33,
    status: 'draft',
    size: '19.1 MB',
    platform: 'Android 9.0+',
    downloads: 0,
    publishedAt: 'Draft',
    releaseNotes: 'New sync engine, experimental features.',
  },
];

// ✅ Status config as constant outside component
const STATUS_CONFIG = {
  live: { label: 'Live', className: 'badge-live' },
  draft: { label: 'Draft', className: 'badge-draft' },
  archived: { label: 'Archived', className: 'badge-archived' },
};

export default function VersionsTable() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // ✅ Memoize status config
  const memoizedStatusConfig = useMemo(() => STATUS_CONFIG, []);

  // ✅ Memoize versions
  const memoizedVersions = useMemo(() => mockVersions, []);

  // ✅ Memoized handlers
  const toggleExpand = useCallback((id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  }, []);

  const handleCopyLink = useCallback((version: string) => {
    // Copy download link logic
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`https://appdrop.io/download/${version}`).catch(() => {
        // Fallback - copy using prompt
        const textArea = document.createElement('textarea');
        textArea.value = `https://appdrop.io/download/${version}`;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Failed to copy:', err);
        }
        document.body.removeChild(textArea);
      });
    }
  }, []);

  const handlePublish = useCallback((id: string) => {
    // Publish logic
    console.log('Publishing version:', id);
    // In production, this would call an API
  }, []);

  const handleArchive = useCallback((id: string) => {
    // Archive logic
    console.log('Archiving version:', id);
    // In production, this would call an API
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground tracking-tight mb-1">Version History</h2>
        <p className="text-sm text-muted-foreground">All published and draft versions of AppDrop.</p>
      </div>

      <div className="space-y-3" role="list" aria-label="Version history list">
        {memoizedVersions.map((ver) => {
          const status = memoizedStatusConfig[ver.status];
          const isExpanded = expandedId === ver.id;

          return (
            <div
              key={ver.id}
              className="bg-card border border-border rounded-2xl overflow-hidden card-lift"
              role="listitem"
            >
              {/* Row */}
              <div
                className="flex flex-wrap items-center gap-4 p-5 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleExpand(ver.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggleExpand(ver.id)}
                aria-expanded={isExpanded}
                aria-label={`${ver.version} - ${status.label}. Click to ${isExpanded ? 'collapse' : 'expand'} release notes`}
              >
                {/* Version + status */}
                <div className="flex items-center gap-3 min-w-[120px]">
                  <span className="font-mono text-sm font-bold text-foreground">{ver.version}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.className}`}>
                    {status.label}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-x-6 gap-y-1 flex-1 text-xs text-muted-foreground">
                  <span>{ver.size}</span>
                  <span>{ver.platform}</span>
                  <span>{ver.publishedAt}</span>
                  {ver.downloads > 0 && (
                    <span className="text-foreground font-medium">{ver.downloads.toLocaleString()} downloads</span>
                  )}
                </div>

                {/* Chevron */}
                <div className={`text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </div>
              </div>

              {/* Expanded release notes */}
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-border pt-4" role="region" aria-label={`${ver.version} details`}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Release Notes</p>
                  <p className="text-sm text-foreground leading-relaxed mb-4">{ver.releaseNotes}</p>

                  <div className="flex flex-wrap gap-2">
                    {ver.status === 'live' && (
                      <button
                        onClick={() => handleCopyLink(ver.version)}
                        className="text-xs font-semibold px-4 py-2 bg-secondary border border-border rounded-xl text-foreground hover:bg-muted transition-colors"
                        aria-label={`Copy download link for ${ver.version}`}
                      >
                        Copy Download Link
                      </button>
                    )}
                    {ver.status === 'draft' && (
                      <button
                        onClick={() => handlePublish(ver.id)}
                        className="text-xs font-semibold px-4 py-2 btn-download text-primary-foreground rounded-xl"
                        aria-label={`Publish ${ver.version}`}
                      >
                        Publish Now
                      </button>
                    )}
                    {ver.status !== 'archived' && (
                      <button
                        onClick={() => handleArchive(ver.id)}
                        className="text-xs font-semibold px-4 py-2 bg-card border border-border rounded-xl text-muted-foreground hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors"
                        aria-label={`Archive ${ver.version}`}
                      >
                        Archive
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
