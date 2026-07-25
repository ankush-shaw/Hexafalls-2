'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { cardHover } from '../../animations/card';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  shortcut?: string;
  onClick?: () => void;
  color?: 'primary' | 'amber' | 'sky' | 'emerald' | 'rose' | 'violet';
  className?: string;
}

const colorConfig = {
  primary: { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20', hover: 'hover:border-primary/40' },
  amber:   { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', hover: 'hover:border-amber-500/40' },
  sky:     { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/20', hover: 'hover:border-sky-500/40' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', hover: 'hover:border-emerald-500/40' },
  rose:    { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20', hover: 'hover:border-rose-500/40' },
  violet:  { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20', hover: 'hover:border-violet-500/40' },
};

export function QuickActionCard({ title, description, icon: Icon, shortcut, onClick, color = 'primary', className }: QuickActionCardProps) {
  const c = colorConfig[color];
  return (
    <motion.button
      variants={cardHover}
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'group relative flex flex-col gap-3 p-4 rounded-xl border bg-card text-left cursor-pointer w-full transition-colors',
        c.border, c.hover,
        className
      )}
    >
      <div className={cn('p-2.5 rounded-lg w-fit', c.bg)}>
        <Icon className={cn('h-5 w-5', c.text)} />
      </div>
      <div className="space-y-0.5">
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
      {shortcut && (
        <kbd className="absolute top-3 right-3 hidden group-hover:flex items-center gap-0.5 text-[9px] font-mono px-1.5 py-0.5 bg-muted border border-border rounded text-muted-foreground">
          {shortcut}
        </kbd>
      )}
    </motion.button>
  );
}
export default QuickActionCard;
