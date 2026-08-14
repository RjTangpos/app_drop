'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Screenshots', href: '#screenshots' },
  { label: 'Install', href: '#install' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on scroll
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener('scroll', close, { passive: true });
    return () => window.removeEventListener('scroll', close);
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/90 backdrop-blur-xl border-b border-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <AppLogo size={36} />
            <span className="font-bold text-lg tracking-tight text-foreground hidden sm:block">
              AppDrop
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 px-5 py-2 bg-card/70 backdrop-blur-sm border border-border rounded-full shadow-sm">
            {navLinks?.map((link) => (
              <a
                key={link?.label}
                href={link?.href}
                className="px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full hover:bg-muted"
              >
                {link?.label}
              </a>
            ))}
            <Link
              href="/versions"
              className="px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full hover:bg-muted"
            >
              Versions
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin-login"
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/>
              </svg>
              Admin
            </Link>
            <a
              href="#download"
              className="btn-download px-5 py-2 text-primary-foreground text-sm font-semibold rounded-full flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
              </svg>
              Download
            </a>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block h-0.5 w-5 bg-foreground rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-5 bg-foreground rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-5 bg-foreground rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
          {navLinks?.map((link) => (
            <a
              key={link?.label}
              href={link?.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold text-foreground hover:text-primary transition-colors"
            >
              {link?.label}
            </a>
          ))}
          <Link
            href="/versions"
            onClick={() => setMenuOpen(false)}
            className="text-2xl font-semibold text-foreground hover:text-primary transition-colors"
          >
            Versions
          </Link>
          <Link
            href="/admin-login"
            onClick={() => setMenuOpen(false)}
            className="text-base text-muted-foreground hover:text-foreground transition-colors"
          >
            Admin Login
          </Link>
          <a
            href="#download"
            onClick={() => setMenuOpen(false)}
            className="btn-download px-8 py-3 text-primary-foreground font-semibold rounded-full"
          >
            Download App
          </a>
        </div>
      )}
    </>
  );
}
