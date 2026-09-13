'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';

interface Version {
  id: string;
  version: string;
  code: number;
  status: 'live' | 'draft' | 'archived';
  size: string;
  platform: string;
  downloads: number;
  publishedAt: string | null;
  releaseNotes: string | null;
  filePath: string;
  fileName: string;
}

const STATUS_CONFIG = {
  live: { label: 'Live', className: 'badge-live' },
  draft: { label: 'Draft', className: 'badge-draft' },
  archived: { label: 'Archived', className: 'badge-archived' },
};

export default function VersionsTable() {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // ✅ Fetch versions from API
  useEffect(() => {
    fetchVersions();
  }, []);

  const fetchVersions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/upload');
      if (!response.ok) {
        throw new Error('Failed to fetch versions');
      }
      const data = await response.json();
      setVersions(data.versions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load versions');
      console.error('Error fetching versions:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = useCallback((id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  }, []);

  const handleCopyLink = useCallback((version: string) => {
    const url = `${window.location.origin}/api/download/${version}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      });
    }
  }, []);

  const handlePublish = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/upload/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'live' }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to publish');
      }
      
      await fetchVersions();
    } catch (err) {
      console.error('Error publishing version:', err);
    }
  }, []);

  const handleArchive = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/upload/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'archived' }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to archive');
      }
      
      await fetchVersions();
    } catch (err) {
      console.error('Error archiving version:', err);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchVersions}
          className="mt-4 text-primary hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (versions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No versions uploaded yet.</p>
        <p className="text-sm text-muted-foreground mt-1">Upload your first APK to get started.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground tracking-tight mb-1">Version History</h2>
        <p className="text-sm text-muted-foreground">All published and draft versions of AppDrop.</p>
      </div>

      <div className="space-y-3" role="list" aria-label="Version history list">
        {versions.map((ver) => {
          const status = STATUS_CONFIG[ver.status];
          const isExpanded = expandedId === ver.id;

          return (
            <div
              key={ver.id}
              className="bg-card border border-border rounded-2xl overflow-hidden card-lift"
              role="listitem"
            >
              <div
                className="flex flex-wrap items-center gap-4 p-5 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleExpand(ver.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggleExpand(ver.id)}
                aria-expanded={isExpanded}
                aria-label={`${ver.version} - ${status.label}. Click to ${isExpanded ? 'collapse' : 'expand'} release notes`}
              >
                <div className="flex items-center gap-3 min-w-[120px]">
                  <span className="font-mono text-sm font-bold text-foreground">{ver.version}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.className}`}>
                    {status.label}
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-1 flex-1 text-xs text-muted-foreground">
                  <span>{ver.size}</span>
                  <span>{ver.platform}</span>
                  <span>{ver.publishedAt ? new Date(ver.publishedAt).toLocaleDateString() : 'Not published'}</span>
                  {ver.downloads > 0 && (
                    <span className="text-foreground font-medium">{ver.downloads.toLocaleString()} downloads</span>
                  )}
                </div>

                <div className={`text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </div>
              </div>

              {isExpanded && (
                <div className="px-5 pb-5 border-t border-border pt-4" role="region" aria-label={`${ver.version} details`}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Release Notes</p>
                  <p className="text-sm text-foreground leading-relaxed mb-4">
                    {ver.releaseNotes || 'No release notes provided.'}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {ver.status === 'live' && (
                      <button
                        onClick={() => handleCopyLink(ver.id)}
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
