'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, Plus } from 'lucide-react';
import { cn } from '../../utils/cn';
import { fadeIn } from '../../animations/fade';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export function EmptyState({
  title, description, icon: Icon, actionLabel, onAction,
  secondaryActionLabel, onSecondaryAction, className,
}: EmptyStateProps) {
  return (
    <motion.div
      variants={fadeIn('up')}
      initial="hidden"
      animate="visible"
      className={cn(
        'flex flex-col items-center justify-center text-center py-16 px-8 space-y-5',
        className
      )}
    >
      {Icon && (
        <div className="p-5 bg-muted/40 text-muted-foreground rounded-2xl border border-border/50">
          <Icon className="h-8 w-8" strokeWidth={1.5} />
        </div>
      )}
      <div className="space-y-2 max-w-xs">
        <h3 className="font-bold text-base tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
      {(actionLabel || secondaryActionLabel) && (
        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
          {actionLabel && onAction && (
            <button
              onClick={onAction}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              {actionLabel}
            </button>
          )}
          {secondaryActionLabel && onSecondaryAction && (
            <button
              onClick={onSecondaryAction}
              className="flex items-center gap-2 px-4 py-2 border border-border text-sm font-semibold rounded-lg hover:bg-muted transition-colors cursor-pointer"
            >
              {secondaryActionLabel}
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}
export default EmptyState;
