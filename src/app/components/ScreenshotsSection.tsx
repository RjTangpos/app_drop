'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import AppImage from '../../components/ui/AppImage';

const screenshots = [
  {
    id: 1,
    title: 'Your Library',
    desc: 'All your manga in one place',
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1c6a33078-1772546703585.png',
    alt: 'NEOReader library screen showing manga cover thumbnails in a grid layout',
  },
  {
    id: 2,
    title: 'Reader View',
    desc: 'Distraction-free reading',
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1f26fb66b-1772378524499.png',
    alt: 'NEOReader manga reading screen with vertical scroll and page navigation',
  },
  {
    id: 3,
    title: 'Browse Sources',
    desc: '200+ sources to explore',
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1f92f18c9-1764923549113.png',
    alt: 'NEOReader source browser showing available manga websites and catalogs',
  },
  {
    id: 4,
    title: 'Categories',
    desc: 'Find your next read by genre',
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1f19987e9-1776773021812.png',
    alt: 'NEOReader category browser showing Action, Romance, Isekai, and other genres',
  },
  {
    id: 5,
    title: 'Downloads',
    desc: 'Read offline, anywhere',
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_10a79fe81-1784189783165.png',
    alt: 'NEOReader download queue showing chapters being saved for offline reading',
  },
];

export default function ScreenshotsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const memoizedScreenshots = useMemo(() => screenshots, []);

  useEffect(() => {
    const section = sectionRef?.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.screenshot-reveal');
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add('revealed');
              }, i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
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
      id="screenshots"
      ref={sectionRef}
      className="py-20 bg-muted/30 relative overflow-hidden"
      aria-labelledby="screenshots-title"
    >
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            In the Wild
          </p>
          <h2
            id="screenshots-title"
            className="text-display font-bold text-foreground tracking-tight mb-4"
          >
            See NEOReader before you install
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto leading-relaxed">
            Every screen is crafted for readers. Clean, fast, and dark-theme first.
          </p>
        </div>

        <div
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin"
          role="list"
          aria-label="NEOReader app screenshots"
        >
          {memoizedScreenshots.map((shot, index) => (
            <div
              key={shot.id}
              className="screenshot-reveal reveal-hidden flex-shrink-0 snap-center"
              style={{ transitionDelay: `${index * 80}ms` }}
              role="listitem"
            >
              <div className="screenshot-card group relative w-48 sm:w-56 rounded-3xl overflow-hidden border border-border shadow-sm bg-card cursor-pointer">
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: '9/16', height: '320px' }}
                >
                  <AppImage
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="224px"
                  />

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                    aria-hidden="true"
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-semibold text-sm">{shot.title}</p>
                    <p className="text-white/70 text-xs">{shot.desc}</p>
                  </div>

                  <div
                    className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
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
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
          Scroll to see more
        </div>
      </div>
    </section>
  );
}
