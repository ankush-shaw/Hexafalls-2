'use client';

import React from 'react';
import { LucideIcon, Plus } from 'lucide-react';
import { cn } from '../../utils/cn';

interface EmptyStateLayoutProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyStateLayout({
  title,
  description,
  icon: Icon,
  actionText,
  onAction,
  className,
}: EmptyStateLayoutProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center p-8 border border-dashed border-border rounded-xl bg-card/20 min-h-[350px] space-y-5",
      className
    )}>
      {/* Icon Area */}
      {Icon && (
        <div className="p-4 bg-muted/50 text-muted-foreground rounded-full border border-border">
          <Icon className="h-8 w-8" />
        </div>
      )}

      {/* Message */}
      <div className="max-w-md space-y-1.5">
        <h3 className="text-lg font-bold tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      {/* CTA Button */}
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors cursor-pointer text-sm shadow-md"
        >
          <Plus className="h-4 w-4" />
          {actionText}
        </button>
      )}
    </div>
  );
}

export default EmptyStateLayout;
