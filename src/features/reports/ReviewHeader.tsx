'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Clock } from 'lucide-react';
import { useReviewStore } from '../../store/reviewStore';
import { cn } from '../../utils/cn';

const statusBadges: Record<string, string> = {
  reviewing: 'border-sky-500/40 bg-sky-500/10 text-sky-400',
  validated: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  approved: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  rejected: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
  needs_retry: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
};

export function ReviewHeader() {
  const { workflowId, executionId, reviewStatus } = useReviewStore();
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:px-6 rounded-3xl border border-amber-500/30 bg-card/80 backdrop-blur-xl shadow-xl">
      {/* Title & Badge */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-amber-950 shadow-md">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-extrabold text-foreground tracking-tight">Boss Agent CEO Review Center</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
              CEO Audit & Sign-off
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Reviewing departmental deliverables before Gemini Executive Report generation</p>
        </div>
      </div>

      {/* Identifiers & Status */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/50 bg-card/60 font-mono">
          <span>Workflow: <strong className="text-foreground">{workflowId}</strong></span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/50 bg-card/60 font-mono">
          <span>Exec ID: <strong className="text-sky-400">{executionId}</strong></span>
        </div>

        <span className={cn('px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider border font-mono', statusBadges[reviewStatus])}>
          Status: {reviewStatus.replace('_', ' ')}
        </span>

        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/40 bg-muted/20 font-mono text-muted-foreground">
          <Clock className="h-3.5 w-3.5 text-amber-400" />
          <span>{timeStr}</span>
        </div>
      </div>
    </div>
  );
}

export default ReviewHeader;
