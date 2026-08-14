'use client';

import React, { useRef, useEffect } from 'react';

const appMeta = {
  version: 'v3.2.1',
  size: '18.4 MB',
  platform: 'Android 8.0+',
  updated: 'Aug 12, 2026',
  sha256: 'a3f9...d72c',
};

export default function DownloadCTASection() {
  const sectionRef = useRef<HTMLElement>(null);

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
      {/* Background */}
      <div className="absolute inset-0 grid-lines-dark pointer-events-none" />
      <div className="absolute inset-0 hero-glow-dark pointer-events-none" />
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 blob-accent opacity-50 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 blob-primary opacity-60 pointer-events-none" />
      {/* Shimmer sweep */}
      <div className="absolute inset-0 shimmer-overlay animate-shimmer pointer-events-none opacity-30" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="cta-reveal reveal-hidden inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
            Latest Stable Release
          </span>
        </div>

        {/* Headline */}
        <h2 className="cta-reveal reveal-hidden text-display font-bold text-gradient-light mb-6 tracking-tight">
          Ready to download?
        </h2>
        <p className="cta-reveal reveal-hidden text-base text-white/60 max-w-lg mx-auto mb-12 leading-relaxed">
          Free forever. No subscription, no account, no hidden fees.
          AppDrop is yours the moment it hits your device.
        </p>

        {/* App metadata trust signals */}
        <div className="cta-reveal reveal-hidden grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto">
          {[
            { label: 'Version', value: appMeta?.version },
            { label: 'File Size', value: appMeta?.size },
            { label: 'Platform', value: appMeta?.platform },
            { label: 'Updated', value: appMeta?.updated },
          ]?.map((item) => (
            <div key={item?.label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1">{item?.label}</p>
              <p className="text-sm font-bold text-white">{item?.value}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="cta-reveal reveal-hidden flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <a
            href="#"
            className="btn-download px-10 py-5 text-primary-foreground text-base font-bold rounded-2xl flex items-center gap-3 group"
            aria-label="Download AppDrop APK"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-0.5 transition-transform">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
            </svg>
            Download Free APK
          </a>
          <a
            href="#install"
            className="px-8 py-5 bg-white/5 border border-white/15 text-white text-sm font-semibold rounded-2xl flex items-center gap-2 hover:bg-white/10 transition-all duration-300"
          >
            Installation Guide
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* SHA256 checksum */}
        <div className="cta-reveal reveal-hidden flex items-center justify-center gap-2 text-xs text-white/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span>SHA-256:</span>
          <code className="font-mono text-white/40">{appMeta?.sha256}</code>
        </div>
      </div>
    </section>
  );
}
