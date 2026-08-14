import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import FeaturesSection from '@/app/components/FeaturesSection';
import ScreenshotsSection from '@/app/components/ScreenshotsSection';
import InstallSection from '@/app/components/InstallSection';
import DownloadCTASection from '@/app/components/DownloadCTASection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ScreenshotsSection />
      <InstallSection />
      <DownloadCTASection />
      <Footer />
    </main>
  );
}
