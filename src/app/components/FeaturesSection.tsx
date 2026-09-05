'use client';

import React, { useEffect, useRef, useMemo } from 'react';

/**
 * BENTO GRID AUDIT:
 * Array has 6 cards: [SpeedCard, OfflineCard, SecurityCard, UICard, SyncCard, OpenCard]
 *
 * Desktop (grid-cols-3):
 * Row 1: [col-1: SpeedCard cs-2 rs-1] [col-3: OfflineCard cs-1]
 * Row 2: [col-1+2: SecurityCard cs-2] [col-3: UICard cs-1]  ← Wait, SpeedCard spans col-1+2 in row1
 * Actually re-plan:
 * Row 1: [col-1+2: SpeedCard cs-2] [col-3: OfflineCard cs-1]
 * Row 2: [col-1: SecurityCard cs-1] [col-2: UICard cs-1] [col-3: SyncCard cs-1]
 * Row 3: [col-1+2+3: OpenCard cs-3]
 * Placed 6/6 cards ✓
 *
 * Mobile (grid-cols-1): All stacked ✓
 * Tablet (grid-cols-2): SpeedCard cs-2, OfflineCard cs-1, SecurityCard cs-1, UICard cs-1, SyncCard cs-1, OpenCard cs-2 ✓
 */

const features = [
  {
    id: 'speed',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    label: 'Lightning Fast',
    title: 'Loads in under 1 second',
    description: 'Optimized for low-end devices. AppDrop uses less than 12MB of RAM and launches in 800ms on any Android 8+ device.',
    accent: true,
    colSpan: 'md:col-span-2',
    minHeight: 'min-h-[200px]',
  },
  {
    id: 'offline',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 6l23 12M1 18L12 12M1 6l11 6 11-6"/>
      </svg>
    ),
    label: 'Works Offline',
    title: 'No internet needed',
    description: 'Core features work completely offline. Sync when you\'re back online.',
    colSpan: 'md:col-span-1',
    minHeight: 'min-h-[200px]',
  },
  {
    id: 'security',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    label: 'Secure by Default',
    title: 'End-to-end encrypted',
    description: 'Your data is encrypted at rest and in transit. Zero telemetry, zero ads.',
    colSpan: 'md:col-span-1',
    minHeight: 'min-h-[200px]',
  },
  {
    id: 'ui',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    label: 'Beautiful UI',
    title: 'Designed for humans',
    description: 'Material You adaptive theming follows your wallpaper and system color.',
    colSpan: 'md:col-span-1',
    minHeight: 'min-h-[200px]',
  },
  {
    id: 'sync',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
      </svg>
    ),
    label: 'Auto Sync',
    title: 'Real-time updates',
    description: 'Stay in sync across all your devices automatically.',
    colSpan: 'md:col-span-1',
    minHeight: 'min-h-[200px]',
  },
  {
    id: 'open',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    label: 'Always Updated',
    title: 'Frequent releases, zero bloat',
    description: 'We ship updates every 2 weeks. Bug fixes land within 48 hours of report. No forced updates — install on your schedule.',
    colSpan: 'md:col-span-2 lg:col-span-3',
    minHeight: 'min-h-[160px]',
    wide: true,
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Memoize features to prevent unnecessary re-renders
  const memoizedFeatures = useMemo(() => features, []);

  useEffect(() => {
    const section = sectionRef?.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    observerRef.current = observer;
    const elements = section.querySelectorAll('.reveal-hidden');
    elements.forEach((el) => observer.observe(el));

    // Cleanup: Disconnect observer on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-20 bg-background relative overflow-hidden"
      aria-labelledby="features-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="reveal-hidden mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3" id="features-title">
                Why AppDrop
              </p>
              <h2 className="text-display font-bold text-foreground tracking-tight">
                Built different,<br />
                <span className="text-muted-foreground font-normal">from the ground up.</span>
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Every decision was made to make your experience faster, safer, and more enjoyable on any Android device.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border shadow-sm"
          role="list"
          aria-label="Features list"
        >
          {memoizedFeatures?.map((feature, index) => (
            <article
              key={feature?.id}
              className={`
                reveal-hidden group relative bg-card hover:bg-muted transition-all duration-300
                flex flex-col justify-between p-7 card-lift
                ${feature?.colSpan}
                ${feature?.minHeight}
              `}
              style={{ transitionDelay: `${index * 60}ms` }}
              role="listitem"
              aria-labelledby={`feature-${feature?.id}-title`}
            >
              {/* Icon with decorative role */}
              <div>
                <div
                  className={`
                    w-11 h-11 rounded-xl border flex items-center justify-center mb-5 shadow-sm
                    transition-all duration-300 group-hover:scale-110 group-hover:rotate-3
                    ${feature?.accent
                      ? 'bg-primary border-primary/20 text-primary-foreground'
                      : 'bg-card border-border text-foreground'
                    }
                  `}
                  aria-hidden="true"
                >
                  {feature?.icon}
                </div>

                {/* Label with screen reader support */}
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  {feature?.label}
                </p>

                <h3 id={`feature-${feature?.id}-title`} className="text-lg font-semibold text-foreground tracking-tight mb-2">
                  {feature?.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature?.description}
                </p>
              </div>

              {/* Hover arrow - decorative */}
              {!feature?.wide && (
                <div
                  className="absolute bottom-6 right-6 w-8 h-8 rounded-full border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-primary group-hover:text-primary bg-card"
                  aria-hidden="true"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                  </svg>
                </div>
              )}

              {/* Accent decoration for wide card - purely decorative */}
              {feature?.wide && (
                <div
                  className="absolute right-8 bottom-6 top-6 w-24 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
                    <path d="M50 50 L50 0 A50 50 0 0 1 100 50 Z" fill="currentColor" />
                  </svg>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
