'use client';

import React, { useRef, useEffect, useMemo, useState } from 'react';
import DownloadButton from '../../components/ui/DownloadButton';

interface VersionMeta {
  version: string;
  size: string;
  platform: string;
  publishedAt: string;
  fileHash: string;
}

export default function DownloadCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [versionMeta, setVersionMeta] = useState<VersionMeta | null>(null);

  // ✅ Fetch real version metadata
  useEffect(() => {
    fetch('/api/latest')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVersionMeta({
            version: data.version.version,
            size: data.version.size,
            platform: data.version.platform,
            publishedAt: data.version.publishedAt
              ? new Date(data.version.publishedAt).toLocaleDateString()
              : 'N/A',
            fileHash: data.version.fileHash
              ? `${data.version.fileHash.slice(0, 8)}...${data.version.fileHash.slice(-4)}`
              : 'N/A',
          });
        }
      })
      .catch(console.error);
  }, []);

  const metaItems = useMemo(() => {
    if (!versionMeta) return [];
    return [
      { label: 'Version', value: versionMeta.version },
      { label: 'File Size', value: versionMeta.size },
      { label: 'Platform', value: versionMeta.platform },
      { label: 'Updated', value: versionMeta.publishedAt },
    ];
  }, [versionMeta]);

  useEffect(() => {
    const section = sectionRef?.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.cta-reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 100);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    observer?.observe(section);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="download"
      ref={sectionRef}
      className="py-20 bg-surface-dark relative overflow-hidden"
    >
      {/* ... backgrounds ... */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* ... badge, headline, description ... */}

        {/* Metadata */}
        <div className="cta-reveal reveal-hidden grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto">
          {metaItems.map((item) => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1">{item.label}</p>
              <p className="text-sm font-bold text-white">{item.value}</p>
            </div>
          ))}
        </div>

        {/* ✅ CTA Button - Now actually downloads */}
        <div className="cta-reveal reveal-hidden flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <DownloadButton
            className="btn-download px-10 py-5 text-primary-foreground text-base font-bold rounded-2xl flex items-center gap-3 group"
          />
          <a
            href="#install"
            className="px-8 py-5 bg-white/5 border border-white/15 text-white text-sm font-semibold rounded-2xl flex items-center gap-2 hover:bg-white/10 transition-all duration-300"
          >
            Installation Guide
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* SHA256 */}
        {versionMeta?.fileHash && (
          <div className="cta-reveal reveal-hidden flex items-center justify-center gap-2 text-xs text-white/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>SHA-256:</span>
            <code className="font-mono text-white/40">{versionMeta.fileHash}</code>
          </div>
        )}
      </div>
    </section>
  );
}
