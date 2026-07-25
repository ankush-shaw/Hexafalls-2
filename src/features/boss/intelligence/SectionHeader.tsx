'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  badge?: string;
  badgeColor?: string;
  className?: string;
}

export function SectionHeader({
  icon: Icon,
  title,
  description,
  badge,
  badgeColor = 'bg-primary/10 text-primary border-primary/20',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between border-b border-border/40 pb-3 mb-3', className)}>
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-foreground">{title}</h3>
          {description && <p className="text-[11px] text-muted-foreground">{description}</p>}
        </div>
      </div>

      {badge && (
        <span className={cn('px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border', badgeColor)}>
          {badge}
        </span>
      )}
    </div>
  );
}

export default SectionHeader;
