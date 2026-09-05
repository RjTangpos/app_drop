'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '../../components/ui/AppImage';

const stats = [
  { label: 'Downloads', value: '24K+' },
  { label: 'Rating', value: '4.9★' },
  { label: 'Version', value: 'v3.2.1' }
];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  // Subtle parallax on mouse move
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const mx = (clientX / innerWidth - 0.5) * 2;
      const my = (clientY / innerHeight - 0.5) * 2;

      const phoneCard = hero.querySelector<HTMLElement>('.phone-card');
      const blobPrimary = hero.querySelector<HTMLElement>('.blob-primary-el');
      const blobAccent = hero.querySelector<HTMLElement>('.blob-accent-el');

      if (phoneCard) {
        phoneCard.style.transform = `translate(${mx * 12}px, ${my * 8}px)`;
      }
      if (blobPrimary) {
        blobPrimary.style.transform = `translate(${mx * -20}px, ${my * -15}px)`;
      }
      if (blobAccent) {
        blobAccent.style.transform = `translate(${mx * 25}px, ${my * 20}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Cleanup: Remove event listener on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-background"
      aria-label="Hero section - AppDrop mobile app"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-lines opacity-60 pointer-events-none" />
      <div className="absolute inset-0 hero-glow pointer-events-none" />

      {/* Blob layers */}
      <div
        className="blob-primary-el absolute top-1/4 left-1/4 w-[500px] h-[500px] blob-primary pointer-events-none"
        style={{ transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
        aria-hidden="true"
      />
      
      <div
        className="blob-accent-el absolute bottom-1/4 right-1/3 w-[400px] h-[400px] blob-accent pointer-events-none"
        style={{ transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
        aria-hidden="true"
      />

      {/* Vertical grid lines (Template 2 pattern) */}
      <div className="absolute inset-0 flex justify-between pointer-events-none px-4 sm:px-6" aria-hidden="true">
        <div className="h-full w-px bg-border opacity-40" />
        <div className="h-full w-px bg-border opacity-40 hidden md:block" />
        <div className="h-full w-px bg-border opacity-40 hidden lg:block" />
        <div className="h-full w-px bg-border opacity-40" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: Content */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Badge */}
            <div className="animate-fade-up opacity-0 mb-8" style={{ animationFillMode: 'forwards' }}>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-card border border-border rounded-full shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Latest Release — v3.2.1
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-up opacity-0 delay-100 text-hero font-bold text-foreground mb-6" style={{ animationFillMode: 'forwards' }}>
              The app that
              <span className="block text-gradient">
                fits in your pocket.
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className="animate-fade-up opacity-0 delay-200 text-base sm:text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed border-l-2 border-primary/30 pl-5 hover:border-primary transition-colors duration-500"
              style={{ animationFillMode: 'forwards' }}
            >
              AppDrop gives you a powerful, lightweight mobile experience — download directly to your Android device in seconds. No app store required.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-up opacity-0 delay-300 flex flex-col sm:flex-row gap-3 mb-12" style={{ animationFillMode: 'forwards' }}>
              <a
                href="#download"
                className="btn-download px-8 py-4 text-primary-foreground text-sm font-bold rounded-2xl flex items-center justify-center gap-2.5 group"
                aria-label="Download AppDrop APK"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-0.5 transition-transform" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Download APK
              </a>
              <a
                href="#screenshots"
                className="px-8 py-4 bg-card border border-border text-foreground text-sm font-semibold rounded-2xl flex items-center justify-center gap-2 hover:bg-muted hover:-translate-y-0.5 transition-all duration-300 shadow-sm group"
                aria-label="View screenshots"
              >
                See Screenshots
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Stats */}
            <div className="animate-fade-up opacity-0 delay-400 flex flex-wrap gap-2 items-center" style={{ animationFillMode: 'forwards' }}>
              {stats.map((stat, i) => (
                <React.Fragment key={stat.label}>
                  <div className="flex flex-col group cursor-default hover:-translate-y-0.5 transition-transform duration-300">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-0.5 group-hover:text-primary transition-colors">
                      {stat.label}
                    </p>
                    <p className="text-sm font-bold text-foreground">{stat.value}</p>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="curve-separator opacity-40 mx-2" aria-hidden="true" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right: Phone Mockup Card */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div
              className="phone-card relative w-full max-w-sm mx-auto"
              style={{ transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              {/* Main phone card */}
              <div className="animate-fade-scale opacity-0 delay-300 relative rounded-[2.5rem] overflow-hidden phone-glow border border-border bg-card" style={{ animationFillMode: 'forwards', aspectRatio: '9/16', maxHeight: '600px' }}>
                {/* App screenshot */}
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1d69f2bd7-1772392847378.png"
                  alt="AppDrop mobile interface showing clean dashboard with dark background, blue accent colors, and modern card layouts"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                />

                {/* Gradient scrim — dark text area */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden="true" />

                {/* Location badge (floating) */}
                <div className="absolute top-6 right-6">
                  <div className="animate-float flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/15 shadow-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" aria-hidden="true" />
                    <span className="text-xs font-semibold text-white uppercase tracking-wide">Android APK</span>
                  </div>
                </div>

                {/* Bottom card: mini stats widget */}
                <div className="absolute bottom-6 left-4 right-4">
                  <div className="animate-float-delayed bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg" aria-hidden="true">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        </div>
                        <span className="text-xs text-white font-semibold">Download Stats</span>
                      </div>
                      <span className="text-xs text-accent font-mono">+12% this week</span>
                    </div>
                    {/* Mini bar chart */}
                    <div className="h-10 flex items-end gap-1 group" aria-hidden="true">
                      {[40, 55, 50, 75, 60, 80, 90].map((h, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-t-sm transition-all duration-700 ${i === 6 ? 'bg-accent' : 'bg-white/25'}`}
                          style={{
                            height: `${h}%`,
                            transitionDelay: `${i * 80}ms`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating review badge */}
              <div className="absolute -left-6 top-1/3 animate-float delay-500">
                <div className="bg-card border border-border rounded-2xl px-4 py-3 shadow-card-hover">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-400 text-sm" aria-hidden="true">★★★★★</span>
                  </div>
                  <p className="text-xs font-semibold text-foreground">Rated 4.9/5</p>
                  <p className="text-xs text-muted-foreground">2,400+ reviews</p>
                </div>
              </div>

              {/* Floating version badge */}
              <div className="absolute -right-4 bottom-1/3 animate-float delay-200">
                <div className="bg-primary/10 border border-primary/20 rounded-xl px-3 py-2 shadow-sm">
                  <p className="text-xs font-mono font-semibold text-primary">v3.2.1</p>
                  <p className="text-xs text-muted-foreground">Latest</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
