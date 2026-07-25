'use client';
import React from 'react';
import { cn } from '../../utils/cn';

interface SkeletonProps { className?: string }

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-md bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]',
        className
      )}
    />
  );
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div className={cn('rounded-xl border border-border bg-card p-5 space-y-4', className)}>
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
      <Skeleton className="h-9 w-20" />
      <Skeleton className="h-1.5 w-full rounded-full" />
      <div className="flex justify-between pt-1">
        <Skeleton className="h-3.5 w-16" />
        <Skeleton className="h-3.5 w-12" />
      </div>
    </div>
  );
}

export function SkeletonNavItem({ className }: SkeletonProps) {
  return (
    <div className={cn('flex items-center gap-3 px-3 py-2', className)}>
      <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
      <Skeleton className="h-4 flex-1 max-w-28" />
    </div>
  );
}

export function SkeletonList({ rows = 3, className }: SkeletonProps & { rows?: number }) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border/50">
          <Skeleton className="h-9 w-9 rounded-full shrink-0" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonPage({ className }: SkeletonProps) {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
        <div>
          <SkeletonList rows={4} />
        </div>
      </div>
    </div>
  );
}
