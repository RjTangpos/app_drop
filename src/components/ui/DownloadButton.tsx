'use client';

import React, { useState, useEffect } from 'react';

interface DownloadButtonProps {
  className?: string;
  children?: React.ReactNode;
  onError?: (error: string) => void;
  variant?: 'primary' | 'secondary';
}

interface LatestVersion {
  id: string;
  version: string;
  size: string;
  downloads: number;
}

export default function DownloadButton({
  className = '',
  children,
  onError,
  variant = 'primary',
}: DownloadButtonProps) {
  const [latest, setLatest] = useState<LatestVersion | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  // ✅ Fetch latest version on mount
  useEffect(() => {
    fetch('/api/latest')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLatest(data.version);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch latest version:', err);
        onError?.('Could not load latest version');
      })
      .finally(() => setLoading(false));
  }, [onError]);

  // ✅ Trigger download
  const handleDownload = () => {
    if (!latest) {
      onError?.('No version available');
      return;
    }

    setDownloading(true);

    // Option 1: Direct navigation (lets browser handle download)
    const link = document.createElement('a');
    link.href = `/api/download/${latest.id}`;
    link.download = ''; // Let server set the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Reset after a moment
    setTimeout(() => setDownloading(false), 2000);
  };

  if (loading) {
    return (
      <button
        disabled
        className={`${className} opacity-70 cursor-wait`}
      >
        <svg
          className="animate-spin inline-block"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <span className="ml-2">Loading...</span>
      </button>
    );
  }

  if (!latest) {
    return (
      <button
        disabled
        className={`${className} opacity-70 cursor-not-allowed`}
      >
        No version available
      </button>
    );
  }

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className={className}
      aria-label={`Download AppDrop ${latest.version} APK`}
    >
      {children || (
        <>
          {downloading ? (
            <>
              <svg
                className="animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Downloading...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
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
              Download {latest.version}
            </>
          )}
        </>
      )}
    </button>
  );
}
