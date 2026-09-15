'use client';

import React, { useEffect, useRef } from 'react';

const steps = [
  {
    number: '01',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
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
    title: 'Download the APK',
    description:
      'Tap the Download button on this page. The NEOReader APK saves directly to your Downloads folder.',
    note: 'Works on Android 8.0+',
  },
  {
    number: '02',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Allow Installation',
    description:
      'Open Settings → Security → enable "Install from Unknown Sources" for your browser. Takes 10 seconds.',
    note: 'One-time setup only',
  },
  {
    number: '03',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Install & Start Reading',
    description:
      'Tap the downloaded file and hit Install. Launch NEOReader, browse 200+ sources, and start reading.',
    note: 'Ready in 30 seconds',
  },
];

export default function InstallSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const section = sectionRef?.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.install-reveal');
            cards.forEach((card, i) => {
              setTimeout(() => card.classList.add('revealed'), i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    observerRef.current = observer;
    observer.observe(section);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  return (
    <section
      id="install"
      className="py-20 bg-background relative overflow-hidden"
      ref={sectionRef}
      aria-labelledby="install-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Get Started
          </p>
          <h2
            id="install-title"
            className="text-display font-bold text-foreground tracking-tight mb-4"
          >
            Install NEOReader in 3 steps
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto leading-relaxed">
            No Play Store. No account. No waiting. Direct APK install on any Android
            device.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          role="list"
          aria-label="Installation steps"
        >
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="install-reveal reveal-hidden group relative bg-card border border-border rounded-3xl p-7 card-lift hover:border-primary/30 transition-all duration-400"
              style={{ transitionDelay: `${index * 120}ms` }}
              role="listitem"
              aria-labelledby={`step-${index}-title`}
            >
              <span
                className="absolute top-6 right-6 text-5xl font-black text-border/60 group-hover:text-primary/10 transition-colors duration-300 select-none leading-none"
                aria-hidden="true"
              >
                {step.number}
              </span>

              <div
                className="w-12 h-12 rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                aria-hidden="true"
              >
                {step.icon}
              </div>

              <h3
                id={`step-${index}-title`}
                className="text-lg font-semibold text-foreground tracking-tight mb-2"
              >
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {step.description}
              </p>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
                <span className="text-xs font-medium text-muted-foreground">
                  {step.note}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-border"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
