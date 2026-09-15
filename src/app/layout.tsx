import React from 'react';
import type { Metadata, Viewport } from 'next';
import { DM_Sans, JetBrains_Mono } from 'next/font/google';
import '../styles/tailwind.css';
import ErrorBoundary from '../components/ErrorBoundary';
import { Providers } from './providers';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1A1AFF',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'NEOReader — Manga & Manhwa Reader for Android',
    template: '%s | NEOReader',
  },
  description:
    'NEOReader is a fast, ad-free Manga and Manhwa reader for Android. Download the latest APK directly — no app store required. Support for thousands of sources, offline reading, and beautiful UI.',
  keywords: [
    'NEOReader',
    'manga reader',
    'manhwa reader',
    'manhua reader',
    'android manga app',
    'apk download',
    'offline manga reader',
  ],
  authors: [{ name: 'NEOReader Team' }],
  creator: 'NEOReader',
  publisher: 'NEOReader',
  applicationName: 'NEOReader',
  category: 'Entertainment',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'NEOReader',
    title: 'NEOReader — Manga & Manhwa Reader for Android',
    description:
      'Fast, ad-free Manga & Manhwa reader. Download the latest APK directly.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NEOReader — Manga & Manhwa Reader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEOReader — Manga & Manhwa Reader',
    description: 'Fast, ad-free Manga & Manhwa reader for Android.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className={dmSans.className}>
        <Providers>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Providers>

        <script
          type="module"
          async
          src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fappdrop9361back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.20"
        />
        <script
          type="module"
          defer
          src="https://static.rocket.new/rocket-shot.js?v=0.0.2"
        />
      </body>
    </html>
  );
}
