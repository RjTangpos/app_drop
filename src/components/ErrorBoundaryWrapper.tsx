'use client';

import React from 'react';
import ErrorBoundary from './ErrorBoundary';

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  name?: string;
}

export default function ErrorBoundaryWrapper({ 
  children, 
  fallback, 
  name = 'Component' 
}: ErrorBoundaryWrapperProps) {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Send to your error tracking service (e.g., Sentry, LogRocket)
    console.error(`Error in ${name}:`, error, errorInfo);
    
    // Example: Send to analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'error', {
        error_message: error.message,
        component: name,
      });
    }
  };

  return (
    <ErrorBoundary fallback={fallback} onError={handleError}>
      {children}
    </ErrorBoundary>
  );
}
