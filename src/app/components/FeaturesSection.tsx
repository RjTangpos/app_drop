'use client';

import React, { useEffect, useRef, useMemo } from 'react';

const features = [
  {
    id: 'sources',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    label: '200+ Sources',
    title: 'Every manga site, one reader',
    description:
      'MangaDex, MangaKakalot, Manhwa18, Asura Scans, and 200+ more. NEOReader pulls them all into a single, unified library.',
    accent: true,
    colSpan: 'md:col-span-2',
    minHeight: 'min-h-[200px]',
  },
  {
    id: 'offline',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </svg>
    ),
    label: 'Offline Reading',
    title: 'Download once, read forever',
    description: 'Queue chapters, read on the subway, on a plane, anywhere.',
    colSpan: 'md:col-span-1',
    minHeight: 'min-h-[200px]',
  },
  {
    id: 'adfree',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    label: 'Zero Ads',
    title: 'No ads. Ever.',
    description:
      'No banners, no interstitials, no popups. Just you and the manga.',
    colSpan: 'md:col-span-1',
    minHeight: 'min-h-[200px]',
  },
  {
    id: 'tracking',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 4h16v16H4z" />
        <path d="M4 9h16" />
        <path d="M9 4v16" />
        <path d="m13 13 2 2 4-4" />
      </svg>
    ),
    label: 'Library Tracking',
    title: 'Track every chapter',
    description:
      'Auto-sync your progress across all sources. Never lose your place again.',
    colSpan: 'md:col-span-1',
    minHeight: 'min-h-[200px]',
  },
  {
    id: 'categories',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
    label: 'Categories & Tags',
    title: 'Find your next obsession',
    description:
      'Browse by genre — Isekai, Romance, Action, Horror, and more. Filter, sort, discover.',
    colSpan: 'md:col-span-1',
    minHeight: 'min-h-[200px]',
  },
  {
    id: 'opensource',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    label: 'Always Updated',
    title: 'Weekly releases, no bloat',
    description:
      'We ship updates every week — new sources, bug fixes, and community-requested features. Install on your own schedule.',
    colSpan: 'md:col-span-2 lg:col-span-3',
    minHeight: 'min-h-[160px]',
    wide: true,
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
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
        <div className="reveal-hidden mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <p
                className="text-xs font-bold uppercase tracking-widest text-primary mb-3"
                id="features-title"
              >
                Why NEOReader
              </p>
              <h2 className="text-display font-bold text-foreground tracking-tight">
                Built by readers,
                <br />
                <span className="text-muted-foreground font-normal">
                  for readers.
                </span>
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Every feature was shaped by the community. Fast, focused, and free —
              because reading manga shouldn&apos;t cost a subscription.
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border shadow-sm"
          role="list"
          aria-label="NEOReader features"
        >
          {memoizedFeatures.map((feature, index) => (
            <article
              key={feature.id}
              className={`
                reveal-hidden group relative bg-card hover:bg-muted transition-all duration-300
                flex flex-col justify-between p-7 card-lift
                ${feature.colSpan}
                ${feature.minHeight}
              `}
              style={{ transitionDelay: `${index * 60}ms` }}
              role="listitem"
              aria-labelledby={`feature-${feature.id}-title`}
            >
              <div>
                <div
                  className={`
                    w-11 h-11 rounded-xl border flex items-center justify-center mb-5 shadow-sm
                    transition-all duration-300 group-hover:scale-110 group-hover:rotate-3
                    ${
                      feature.accent
                        ? 'bg-primary border-primary/20 text-primary-foreground'
                        : 'bg-card border-border text-foreground'
                    }
                  `}
                  aria-hidden="true"
                >
                  {feature.icon}
                </div>

                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  {feature.label}
                </p>
                <h3
                  id={`feature-${feature.id}-title`}
                  className="text-lg font-semibold text-foreground tracking-tight mb-2"
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {!feature.wide && (
                <div
                  className="absolute bottom-6 right-6 w-8 h-8 rounded-full border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-primary group-hover:text-primary bg-card"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              )}

              {feature.wide && (
                <div
                  className="absolute right-8 bottom-6 top-6 w-24 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
                    <path
                      d="M50 50 L50 0 A50 50 0 0 1 100 50 Z"
                      fill="currentColor"
                    />
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
