import React from 'react';

const stats = [
  {
    label: 'Total Downloads',
    value: '24,381',
    change: '+12% this week',
    positive: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
      </svg>
    ),
  },
  {
    label: 'Current Version',
    value: 'v3.2.1',
    change: 'Published Aug 12',
    positive: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    label: 'APK File Size',
    value: '18.4 MB',
    change: '-2.1 MB from v3.2.0',
    positive: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
  },
  {
    label: 'Total Versions',
    value: '12',
    change: '3 archived',
    positive: null,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>
      </svg>
    ),
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats?.map((stat, i) => (
        <div
          key={stat?.label}
          className="bg-card border border-border rounded-2xl p-5 card-lift"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-primary">
              {stat?.icon}
            </div>
            {stat?.positive !== null && (
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                stat?.positive
                  ? 'bg-green-50 text-green-600' :'bg-muted text-muted-foreground'
              }`}>
                {stat?.positive ? '↑' : '→'}
              </span>
            )}
          </div>
          <p className="text-2xl font-bold text-foreground tracking-tight mb-1">{stat?.value}</p>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">{stat?.label}</p>
          <p className="text-xs text-muted-foreground">{stat?.change}</p>
        </div>
      ))}
    </div>
  );
}
