import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'NEOReader privacy policy — we collect minimal data, never sell your information, and give you full control over your reading data.',
};

const LAST_UPDATED = 'September 15, 2026';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-10 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 blob-primary opacity-30 pointer-events-none" />
        <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-full text-xs font-semibold text-primary uppercase tracking-widest mb-6">
            Legal
          </div>
          <h1 className="text-display font-bold text-foreground mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-20">
        <article className="max-w-3xl mx-auto prose-custom">
          {/* TL;DR box */}
          <div className="bg-secondary/60 border border-border rounded-2xl p-6 mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              TL;DR — The short version
            </p>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                We collect almost nothing. No account, no email, no password.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                We do not sell, rent, or share your data with anyone.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                Your reading history, library, and downloads stay on your device.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                No ads, no trackers, no third-party analytics in the app.
              </li>
            </ul>
          </div>

          {/* Sections */}
          <PolicySection title="1. Who we are">
            <p>
              NEOReader (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a free,
              open-source Android application for reading manga, manhwa, and manhua. We
              operate the website at <code>neoreader.app</code> (the &quot;Site&quot;)
              and the NEOReader Android app (the &quot;App&quot;). This Privacy Policy
              explains how we handle information when you use the App or the Site.
            </p>
          </PolicySection>

          <PolicySection title="2. Information we do NOT collect">
            <p>
              NEOReader is built privacy-first. We deliberately do <strong>not</strong>{' '}
              collect any of the following:
            </p>
            <ul>
              <li>Your name, email address, or phone number</li>
              <li>Your location (GPS, IP-based, or otherwise)</li>
              <li>Your contacts, photos, or files outside NEOReader&apos;s sandbox</li>
              <li>Your reading history, library, or downloaded chapters</li>
              <li>Device identifiers (IMEI, MAC address, Advertising ID)</li>
              <li>Analytics events, crash reports tied to your identity, or usage telemetry</li>
            </ul>
          </PolicySection>

          <PolicySection title="3. Information stored on your device">
            <p>
              NEOReader stores the following data <strong>locally on your device</strong>{' '}
              so the App works. This data never leaves your phone unless you explicitly
              export it:
            </p>
            <ul>
              <li>Your library (list of saved manga titles and their sources)</li>
              <li>Reading progress per chapter</li>
              <li>Downloaded chapters and cached images</li>
              <li>App preferences (theme, reader mode, language)</li>
            </ul>
            <p className="mt-3">
              You can clear this data at any time from <strong>Settings → Data &amp; Storage
              → Clear all data</strong> or by uninstalling the App.
            </p>
          </PolicySection>

          <PolicySection title="4. Network requests">
            <p>
              When you browse or read manga, NEOReader makes direct HTTP requests from
              your device to the third-party content sources you choose (e.g. MangaDex,
              Asura Scans). These sources may see your IP address as part of normal web
              traffic — this is the same as visiting them in a browser. We do not proxy,
              log, or store these requests.
            </p>
            <p className="mt-3">
              NEOReader itself does <strong>not</strong> contact any NEOReader-operated
              server for reading activity, library contents, or download history.
            </p>
          </PolicySection>

          <PolicySection title="5. Website analytics">
            <p>
              The download Site (this website) may use privacy-respecting, cookieless
              analytics to count page visits and download button clicks in aggregate.
              These analytics do not identify individual users, and no personal data is
              stored.
            </p>
          </PolicySection>

          <PolicySection title="6. Children's privacy">
            <p>
              NEOReader is not directed at children under 13. We do not knowingly
              collect any information from children. If you believe a child has used the
              App in a way that concerns you, contact us — though as noted above, we
              collect no personal data to delete.
            </p>
          </PolicySection>

          <PolicySection title="7. Third-party sources">
            <p>
              NEOReader aggregates publicly available manga content from third-party
              sources. We do not host, own, or claim ownership of any manga, manhwa, or
              manhua content. Your interactions with those sources are governed by their
              own privacy policies and terms.
            </p>
          </PolicySection>

          <PolicySection title="8. Data retention &amp; deletion">
            <p>
              Because we don&apos;t collect personal data, there is nothing for us to
              retain or delete on our servers. All App data is stored locally on your
              device and can be removed by clearing App data or uninstalling.
            </p>
          </PolicySection>

          <PolicySection title="9. Security">
            <p>
              We use HTTPS for all Site traffic and Android&apos;s standard sandboxing for
              App data. Because your data stays on your device, its security largely
              depends on your device&apos;s own protections (screen lock, encryption, etc.).
            </p>
          </PolicySection>

          <PolicySection title="10. Changes to this policy">
            <p>
              We may update this Privacy Policy from time to time. Material changes will
              be reflected in the &quot;Last updated&quot; date above and, for significant
              changes, announced in the{' '}
              <Link href="/changelog" className="text-primary hover:underline">
                changelog
              </Link>
              . Continued use of the App after changes means you accept the updated
              policy.
            </p>
          </PolicySection>

          <PolicySection title="11. Contact">
            <p>
              Questions about this Privacy Policy? Reach out on our{' '}
              <a
                href="#"
                className="text-primary hover:underline"
                rel="noopener noreferrer"
              >
                Discord server
              </a>{' '}
              or open an issue on{' '}
              <a
                href="#"
                className="text-primary hover:underline"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              .
            </p>
          </PolicySection>

          {/* Footer nav */}
          <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4 text-sm">
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service →
            </Link>
            <Link href="/changelog" className="text-primary hover:underline">
              Changelog →
            </Link>
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Back to home
            </Link>
          </div>
        </article>
      </section>

      <Footer />
    </main>
  );
}

/* ─── Reusable section block ─────────────────────────── */
function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-foreground tracking-tight mb-3">
        {title}
      </h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-3 [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:list-disc [&_li]:marker:text-primary/60 [&_code]:text-xs [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-foreground [&_strong]:text-foreground [&_strong]:font-semibold">
        {children}
      </div>
    </section>
  );
}
