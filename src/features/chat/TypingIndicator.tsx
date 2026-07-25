'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { cn } from '../../utils/cn';

interface TypingIndicatorProps {
  agentName?: string;
  className?: string;
}

export function TypingIndicator({ agentName = 'Boss Agent', className }: TypingIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      className={cn('flex items-center gap-3 p-3 rounded-xl border border-primary/20 bg-primary/5 max-w-xs', className)}
    >
      <div className="h-7 w-7 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-foreground/80">{agentName} is thinking</span>
        <div className="flex gap-1 items-center">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default TypingIndicator;
