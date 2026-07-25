'use client';

import React from 'react';
import { cn } from '../../utils/cn';

interface TokenCounterProps {
  content: string;
  maxChars?: number;
  className?: string;
}

export function TokenCounter({ content, maxChars = 32000, className }: TokenCounterProps) {
  const charCount = content.length;
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  // Standard heuristic: ~4 characters per token in English
  const estimatedTokens = Math.ceil(charCount / 4);

  const isNearLimit = charCount > maxChars * 0.85;
  const isOverLimit = charCount > maxChars;

  return (
    <div
      className={cn(
        'flex items-center gap-3 text-[10px] font-mono select-none transition-colors',
        isOverLimit
          ? 'text-rose-400 font-bold'
          : isNearLimit
          ? 'text-amber-400'
          : 'text-muted-foreground/60',
        className
      )}
    >
      <span>{wordCount} words</span>
      <span>•</span>
      <span>
        {charCount.toLocaleString()} / {maxChars.toLocaleString()} chars
      </span>
      <span>•</span>
      <span className="font-semibold px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/40">
        ≈ {estimatedTokens.toLocaleString()} tokens
      </span>
    </div>
  );
}

export default TokenCounter;
