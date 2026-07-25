'use client';

import React from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '../../constants/routes';

interface ErrorLayoutProps {
  title?: string;
  message: string;
  statusCode?: number | string;
  onReset?: () => void;
}

export function ErrorLayout({ 
  title = 'System Interruption', 
  message, 
  statusCode = '500', 
  onReset 
}: ErrorLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-6 bg-card border border-border rounded-xl max-w-lg mx-auto shadow-2xl space-y-6">
      {/* Icon Graphic */}
      <div className="p-4 bg-destructive/10 text-destructive rounded-full border border-destructive/20 animate-pulse">
        <AlertCircle className="h-10 w-10" />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-destructive uppercase tracking-widest">
          Error {statusCode}
        </div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {message}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
        {onReset && (
          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors cursor-pointer text-sm"
          >
            <RotateCcw className="h-4 w-4" />
            Try Reconnecting
          </button>
        )}
        <Link href={ROUTES.DASHBOARD}>
          <div className="flex items-center justify-center gap-2 px-4 py-2 border border-border hover:bg-muted text-foreground font-semibold rounded-lg transition-colors cursor-pointer text-sm">
            <Home className="h-4 w-4" />
            Return to Dashboard
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ErrorLayout;
