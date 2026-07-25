'use client';
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label: string;
  size?: 'sm' | 'md';
  active?: boolean;
}

export function IconButton({ icon: Icon, label, size = 'md', active, className, ...props }: IconButtonProps) {
  const sz = size === 'sm' ? 'h-7 w-7' : 'h-9 w-9';
  const iconSz = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  return (
    <button
      aria-label={label}
      title={label}
      className={cn(
        'relative flex items-center justify-center rounded-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        sz,
        active
          ? 'bg-primary/15 text-primary'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        'disabled:opacity-50 disabled:pointer-events-none',
        className
      )}
      {...props}
    >
      <Icon className={iconSz} />
    </button>
  );
}
export default IconButton;
