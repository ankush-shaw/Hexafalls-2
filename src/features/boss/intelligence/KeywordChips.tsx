'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Hash } from 'lucide-react';
import { KeywordItem } from '../../../types/boss.types';
import { cn } from '../../../utils/cn';

interface KeywordChipsProps {
  keywords?: KeywordItem[];
  className?: string;
}

export function KeywordChips({ keywords = [], className }: KeywordChipsProps) {
  if (keywords.length === 0) return null;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
        <Hash className="h-3.5 w-3.5 text-primary" /> Key Concept Keywords
      </div>

      <div className="flex flex-wrap gap-1.5">
        {keywords.map((kw, i) => (
          <motion.span
            key={kw.keyword}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-primary/20 bg-primary/8 text-xs font-medium text-primary hover:bg-primary/15 transition-colors cursor-default"
          >
            <span>#{kw.keyword}</span>
            <span className="text-[9px] font-mono opacity-60">{kw.confidence}%</span>
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default KeywordChips;
