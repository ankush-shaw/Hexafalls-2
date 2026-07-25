'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, ArrowUpRight, Star } from 'lucide-react';
import { PromptTemplate } from '../../types/chat.types';
import { cn } from '../../utils/cn';

interface QuickPromptCardProps {
  template: PromptTemplate;
  icon: LucideIcon;
  onSelect: (prompt: string) => void;
  onToggleFavorite?: (id: string) => void;
  className?: string;
}

export function QuickPromptCard({
  template,
  icon: Icon,
  onSelect,
  onToggleFavorite,
  className,
}: QuickPromptCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(template.prompt)}
      className={cn(
        'group relative flex flex-col justify-between p-4 rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:bg-muted/40 transition-all cursor-pointer text-left shadow-sm',
        className
      )}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-primary/10 text-primary w-fit">
            <Icon className="h-4 w-4" />
          </div>

          <div className="flex items-center gap-1">
            {onToggleFavorite && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(template.id);
                }}
                className="p-1 text-muted-foreground/40 hover:text-amber-400 transition-colors cursor-pointer"
              >
                <Star className={cn('h-3.5 w-3.5', template.isFavorite && 'text-amber-400 fill-amber-400')} />
              </button>
            )}
            <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{template.title}</h4>
          <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5 leading-snug">{template.description}</p>
        </div>
      </div>

      {template.shortcut && (
        <span className="self-end mt-2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/30">
          {template.shortcut}
        </span>
      )}
    </motion.div>
  );
}

export default QuickPromptCard;
