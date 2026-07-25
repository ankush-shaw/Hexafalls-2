'use client';
import React from 'react';
import { cn } from '../../utils/cn';

type StatusColor = 'green' | 'amber' | 'red' | 'blue' | 'gray';

interface StatusDotProps {
  color?: StatusColor;
  pulse?: boolean;
  size?: 'sm' | 'md';
  label?: string;
  className?: string;
}

const colorMap: Record<StatusColor, string> = {
  green: 'bg-emerald-500',
  amber: 'bg-amber-500',
  red:   'bg-rose-500',
  blue:  'bg-sky-500',
  gray:  'bg-slate-500',
};

export function StatusDot({ color = 'green', pulse = false, size = 'sm', label, className }: StatusDotProps) {
  const sizeClass = size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2';
  return (
    <span className={cn('flex items-center gap-1.5', className)} title={label} aria-label={label}>
      <span className={cn('rounded-full shrink-0', sizeClass, colorMap[color], pulse && 'animate-[status-pulse_2s_ease-in-out_infinite]')} />
      {label && <span className="text-[10px] text-muted-foreground font-medium">{label}</span>}
    </span>
  );
}
export default StatusDot;
