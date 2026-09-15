'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import AppLogo from '../components/ui/AppLogo';
import DownloadButton from './ui/DownloadButton';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Screenshots', href: '#screenshots' },
  { label: 'Sources', href: '#sources' },
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

  useEffect(() => {
    if (!menuOpen) return;
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener('scroll', closeMenu, { passive: true });
    return () => window.removeEventListener('scroll', closeMenu);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/90 backdrop-blur-xl border-b border-border shadow-sm'
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="NEOReader home"
          >
            <AppLogo size={36} />
            <span className="font-bold text-lg tracking-tight text-foreground hidden sm:block">
              NEOReader
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1 px-5 py-2 bg-card/70 backdrop-blur-sm border border-border rounded-full shadow-sm"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full hover:bg-muted"
              >
                {link.label}
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
              aria-label="Admin login"
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
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" x2="3" y1="12" y2="12" />
              </svg>
              Admin
            </Link>

            <DownloadButton className="btn-download px-5 py-2 text-primary-foreground text-sm font-semibold rounded-full flex items-center gap-2" />

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              onClick={toggleMenu}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={`block h-0.5 w-5 bg-foreground rounded transition-all duration-300 ${
                  menuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-foreground rounded transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-foreground rounded transition-all duration-300 ${
                  menuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className="text-2xl font-semibold text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/versions"
            onClick={closeMenu}
            className="text-2xl font-semibold text-foreground hover:text-primary transition-colors"
          >
            Versions
          </Link>
          <Link
            href="/admin-login"
            onClick={closeMenu}
            className="text-base text-muted-foreground hover:text-foreground transition-colors"
          >
            Admin Login
          </Link>

          <DownloadButton
            className="btn-download px-8 py-3 text-primary-foreground font-semibold rounded-full flex items-center gap-2"
            onError={(err) => console.error(err)}
          />
        </div>
      )}
    </>
  );
}
