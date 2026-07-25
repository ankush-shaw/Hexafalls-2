'use client';

import React from 'react';

interface LoadingLayoutProps {
  cardsCount?: number;
}

export function LoadingLayout({ cardsCount = 3 }: LoadingLayoutProps) {
  return (
    <div className="space-y-6 max-w-(screen-2xl) mx-auto animate-pulse">
      {/* Title section skeleton */}
      <div className="flex items-center justify-between pb-5 border-b border-border">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted rounded-md" />
          <div className="h-4 w-72 bg-muted rounded-md" />
        </div>
        <div className="h-10 w-24 bg-muted rounded-md" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: cardsCount }).map((_, index) => (
          <div key={index} className="h-64 bg-card/50 border border-border/50 rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-6 w-32 bg-muted rounded-md" />
              <div className="h-6 w-12 bg-muted rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted rounded-md" />
              <div className="h-4 w-5/6 bg-muted rounded-md" />
              <div className="h-4 w-4/6 bg-muted rounded-md" />
            </div>
            <div className="pt-4 border-t border-border/35 flex justify-between items-center">
              <div className="h-4 w-20 bg-muted rounded-md" />
              <div className="h-6 w-16 bg-muted rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoadingLayout;
