// src/app/admin-dashboard/components/AdminDashboardClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLogo from '../../../components/ui/AppLogo';
import Link from 'next/link';
import UploadSection from './UploadSection';
import VersionsTable from './VersionsTable';
import StatsCards from './StatsCards';

type ActiveTab = 'overview' | 'upload' | 'versions';

const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>
      </svg>
    ),
  },
  {
    id: 'upload',
    label: 'Upload APK',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>
      </svg>
    ),
  },
  {
    id: 'versions',
    label: 'Versions',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
  },
];

export default function AdminDashboardClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auth guard (mock)
  useEffect(() => {
    const auth = sessionStorage.getItem('appdrop_admin');
    if (!auth) {
      router.push('/admin-login');
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('appdrop_admin');
    router.push('/admin-login');
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border
          flex flex-col transition-transform duration-300 lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        role="navigation"
        aria-label="Admin sidebar navigation"
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-border">
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Return to homepage">
            <AppLogo size={36} />
            <div>
              <p className="font-bold text-sm text-foreground leading-tight">AppDrop</p>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1" role="tablist" aria-label="Admin sections">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                activeTab === item.id
                  ? 'nav-active' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              role="tab"
              aria-selected={activeTab === item.id}
              aria-controls={`panel-${item.id}`}
              id={`tab-${item.id}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-border">
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            aria-label="View public site"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-all mt-1"
            aria-label="Sign out of admin panel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar - FIXED: Added ARIA attributes */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={handleSidebarClose}
          onKeyDown={(e) => e.key === 'Escape' && handleSidebarClose()}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar navigation"
          aria-hidden={!sidebarOpen}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border px-4 sm:px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar navigation'}
              aria-expanded={sidebarOpen}
              aria-controls="admin-sidebar"
            >
              <span className="h-0.5 w-5 bg-foreground rounded" />
              <span className="h-0.5 w-5 bg-foreground rounded" />
              <span className="h-0.5 w-5 bg-foreground rounded" />
            </button>
            <div>
              <h1 className="text-base font-semibold text-foreground capitalize" id="page-title">
                {activeTab}
              </h1>
              <p className="text-xs text-muted-foreground">AppDrop Admin</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Current version badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full border border-border">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
              <span className="text-xs font-medium text-muted-foreground">v3.2.1 Live</span>
            </div>
            {/* Avatar */}
            <div 
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold"
              role="img"
              aria-label="Admin user avatar"
            >
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === 'overview' && (
            <div 
              className="animate-fade-up opacity-0 space-y-6" 
              style={{ animationFillMode: 'forwards' }}
              role="tabpanel"
              id="panel-overview"
              aria-labelledby="tab-overview"
            >
              <StatsCards />

              {/* Quick actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab('upload')}
                  className="btn-download p-5 rounded-2xl text-left flex items-center gap-4 group"
                  aria-label="Upload new APK version"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-primary-foreground font-semibold text-sm">Upload New APK</p>
                    <p className="text-primary-foreground/60 text-xs">Publish a new version</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('versions')}
                  className="bg-card border border-border p-5 rounded-2xl text-left flex items-center gap-4 group hover:bg-muted transition-all card-lift"
                  aria-label="Manage versions"
                >
                  <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-foreground font-semibold text-sm">Manage Versions</p>
                    <p className="text-muted-foreground text-xs">View all releases</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div 
              className="animate-fade-up opacity-0" 
              style={{ animationFillMode: 'forwards' }}
              role="tabpanel"
              id="panel-upload"
              aria-labelledby="tab-upload"
            >
              <UploadSection />
            </div>
          )}

          {activeTab === 'versions' && (
            <div 
              className="animate-fade-up opacity-0" 
              style={{ animationFillMode: 'forwards' }}
              role="tabpanel"
              id="panel-versions"
              aria-labelledby="tab-versions"
            >
              <VersionsTable />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
