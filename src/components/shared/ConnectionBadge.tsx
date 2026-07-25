'use client';
import React from 'react';
import { cn } from '../../utils/cn';
import { StatusDot } from './StatusDot';

interface ConnectionBadgeProps {
  label: string;
  connected: boolean;
  className?: string;
}

export function ConnectionBadge({ label, connected, className }: ConnectionBadgeProps) {
  return (
    <div className={cn(
      'flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-widest',
      connected
        ? 'border-emerald-500/25 bg-emerald-500/8 text-emerald-400'
        : 'border-rose-500/25 bg-rose-500/8 text-rose-400',
      className
    )}>
      <StatusDot color={connected ? 'green' : 'red'} pulse={connected} />
      {label}
    </div>
  );
}
export default ConnectionBadge;
