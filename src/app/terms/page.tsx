import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'NEOReader Terms of Service — the rules for using our free manga and manhwa reader app.',
};

const LAST_UPDATED = 'September 15, 2026';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-10 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 blob-accent opacity-30 pointer-events-none" />
        <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-full text-xs font-semibold text-primary uppercase tracking-widest mb-6">
            Legal
          </div>
          <h1 className="text-display font-bold text-foreground mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-20">
        <article className="max-w-3xl mx-auto">
          {/* TL;DR box */}
          <div className="bg-secondary/60 border border-border rounded-2xl p-6 mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              TL;DR — The short version
            </p>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                NEOReader is a <strong>reader</strong>, not a content host. We don&apos;t
                own or store any manga.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                The App is free, open-source, and provided &quot;as is&quot; without
                warranty.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                You are responsible for how you use it and what sources you access.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                Don&apos;t use NEOReader for anything illegal in your jurisdiction.
              </li>
            </ul>
          </div>

          <TermsSection title="1. Acceptance of terms">
            <p>
              By downloading, installing, or using NEOReader (the &quot;App&quot;) or this
              website (the &quot;Site&quot;), you agree to these Terms of Service
              (&quot;Terms&quot;). If you do not agree, do not use the App or Site.
            </p>
          </TermsSection>

          <TermsSection title="2. What NEOReader is">
            <p>
              NEOReader is a free, open-source Android application that aggregates and
              displays manga, manhwa, and manhua from publicly accessible third-party
              sources. NEOReader:
            </p>
            <ul>
              <li>
                <strong>Does not host, store, or own</strong> any manga, manhwa, or
                manhua content
              </li>
              <li>
                <strong>Does not upload</strong> any content to third-party sources
              </li>
              <li>
                Acts purely as a <strong>client / reader</strong> that connects to sources
                you choose
              </li>
            </ul>
          </TermsSection>

          <TermsSection title="3. License to use">
            <p>
              NEOReader is distributed under an open-source license. The App is provided
              to you free of charge for personal, non-commercial use. You may:
            </p>
            <ul>
              <li>Install and use NEOReader on any Android device you own</li>
              <li>Read the source code and contribute improvements</li>
              <li>Share the APK file with others</li>
            </ul>
            <p className="mt-3">You may not:</p>
            <ul>
              <li>Sell NEOReader or bundle it into a paid product</li>
              <li>Remove or obscure license/copyright notices</li>
              <li>Use NEOReader&apos;s name or branding to endorse derivative products</li>
            </ul>
          </TermsSection>

          <TermsSection title="4. Your responsibilities">
            <p>You agree that you are solely responsible for:</p>
            <ul>
              <li>
                How you use NEOReader and which third-party sources you connect to
              </li>
              <li>
                Ensuring your use complies with the laws of your country and the terms of
                the sources you access
              </li>
              <li>
                Any content you download for offline reading, including its storage and
                legal status
              </li>
              <li>
                Securing your device against unauthorized access to your library and
                downloads
              </li>
            </ul>
          </TermsSection>

          <TermsSection title="5. Third-party sources">
            <p>
              NEOReader connects to third-party manga sources. We do not control, endorse,
              or take responsibility for:
            </p>
            <ul>
              <li>Content available on those sources</li>
              <li>Their availability, accuracy, or legality</li>
              <li>Their privacy practices or terms of service</li>
              <li>Any disruption to their services</li>
            </ul>
            <p className="mt-3">
              Your use of each source is governed by that source&apos;s own terms. If you
              are a rights holder and believe a source is infringing, please contact that
              source directly — NEOReader is not the host.
            </p>
          </TermsSection>

          <TermsSection title="6. Copyright &amp; DMCA">
            <p>
              NEOReader does not host any copyrighted content. We display manga images by
              loading them directly from third-party servers on your device. Because we
              do not control those servers, we cannot remove content from them.
            </p>
            <p className="mt-3">
              If you believe a source is infringing your copyright, please direct DMCA
              notices to that source. We are happy to remove a source from NEOReader&apos;s
              default catalog if a court or the source itself confirms infringement.
            </p>
          </TermsSection>

          <TermsSection title="7. No warranty">
            <p>
              NEOReader is provided <strong>&quot;as is&quot;</strong> and{' '}
              <strong>&quot;as available&quot;</strong>, without warranties of any kind,
              express or implied, including merchantability, fitness for a particular
              purpose, or non-infringement. We do not guarantee:
            </p>
            <ul>
              <li>The App will be error-free, uninterrupted, or secure</li>
              <li>Any specific source will remain available or functional</li>
              <li>Any particular manga will be available</li>
            </ul>
          </TermsSection>

          <TermsSection title="8. Limitation of liability">
            <p>
              To the maximum extent permitted by law, NEOReader and its contributors are
              not liable for any indirect, incidental, special, consequential, or punitive
              damages arising from your use of the App or Site, including but not limited
              to lost data, device damage, legal fees, or third-party claims.
            </p>
          </TermsSection>

          <TermsSection title="9. Termination">
            <p>
              You may stop using NEOReader at any time by uninstalling the App. We may
              discontinue the App or Site at any time without notice. Sections that by
              their nature should survive termination (warranty disclaimers, liability
              limits, copyright) will survive.
            </p>
          </TermsSection>

          <TermsSection title="10. Changes to these terms">
            <p>
              We may update these Terms from time to time. Material changes will be
              reflected in the &quot;Last updated&quot; date above and, for significant
              changes, announced in the{' '}
              <Link href="/changelog" className="text-primary hover:underline">
                changelog
              </Link>
              . Continued use of NEOReader after changes means you accept the updated
              Terms.
            </p>
          </TermsSection>

          <TermsSection title="11. Governing law">
            <p>
              These Terms are governed by the laws of the jurisdiction in which the
              NEOReader maintainers reside, without regard to conflict-of-law principles.
              Any disputes will be resolved in the courts of that jurisdiction.
            </p>
          </TermsSection>

          <TermsSection title="12. Contact">
            <p>
              Questions about these Terms? Reach out on our{' '}
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
          </TermsSection>

          {/* Footer nav */}
          <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4 text-sm">
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy →
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
function TermsSection({
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
