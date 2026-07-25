'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FileText, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useBossStore } from '../../store/bossStore';
import { copyToClipboard } from '../../utils/clipboard.utils';
import { cn } from '../../utils/cn';

interface RequestSummaryCardProps {
  className?: string;
}

export function RequestSummaryCard({ className }: RequestSummaryCardProps) {
  const { currentSession } = useBossStore();
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!currentSession) return null;

  const handleCopy = async () => {
    const success = await copyToClipboard(currentSession.userPrompt);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className={cn('p-5 rounded-2xl border border-border/60 bg-card/60 space-y-3', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
          <FileText className="h-4 w-4 text-primary" /> Target Request Prompt
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            title="Copy prompt"
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            title={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'text-xs text-foreground/90 leading-relaxed font-sans prose prose-invert max-w-none transition-all',
          !expanded && 'line-clamp-3'
        )}
      >
        <ReactMarkdown>{currentSession.userPrompt}</ReactMarkdown>
      </div>
    </div>
  );
}

export default RequestSummaryCard;
