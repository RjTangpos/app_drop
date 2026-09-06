type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface Logger {
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
}

const isDev = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// ✅ Production error tracking
const trackError = (error: Error, context?: Record<string, any>) => {
  if (isProduction && typeof window !== 'undefined') {
    // Send to error tracking service
    // Example: Sentry.captureException(error, { extra: context });
    console.error('Production error:', error, context);
  }
};

export const logger: Logger = {
  debug: (...args: any[]) => {
    if (isDev) {
      console.debug('[DEBUG]', ...args);
    }
  },
  info: (...args: any[]) => {
    if (isDev) {
      console.info('[INFO]', ...args);
    }
  },
  warn: (...args: any[]) => {
    if (isDev) {
      console.warn('[WARN]', ...args);
    }
  },
  error: (...args: any[]) => {
    const error = args[0] instanceof Error ? args[0] : new Error(String(args[0]));
    const context = args.length > 1 ? args[1] : undefined;
    
    trackError(error, context);
    console.error('[ERROR]', ...args);
  },
};

// ✅ Error boundary logger
export const logErrorBoundary = (error: Error, errorInfo: React.ErrorInfo, componentName?: string) => {
  logger.error(`Error in ${componentName || 'component'}:`, {
    error: error.message,
    stack: error.stack,
    componentStack: errorInfo.componentStack,
  });
};
