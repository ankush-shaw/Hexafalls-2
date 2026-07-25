'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Activity } from 'lucide-react';
import { SupervisorActivity } from '../../types/supervisor.types';
import { cn } from '../../utils/cn';

interface ExecutionTimelineProps {
  activities?: SupervisorActivity[];
  className?: string;
}

export function ExecutionTimeline({ activities = [], className }: ExecutionTimelineProps) {
  if (activities.length === 0) return null;

  return (
    <div className={cn('p-4 rounded-2xl border border-border/70 bg-black/80 font-mono text-xs text-slate-300 space-y-2 shadow-2xl', className)}>
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
        <span className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-sky-400" /> SUPERVISOR_EXECUTION_FEED.log
        </span>
        <span className="flex items-center gap-1 text-[10px] text-sky-400">
          <Activity className="h-3 w-3 animate-pulse" /> STREAMING
        </span>
      </div>

      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
        {activities.map((act) => (
          <motion.div
            key={act.id}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-2 leading-relaxed"
          >
            <span className="text-sky-400 font-bold shrink-0">&gt;</span>
            <span className="text-slate-400 shrink-0">[{act.timestamp}]</span>
            <span className="text-slate-200">
              <strong className="text-sky-300">{act.title}:</strong> {act.detail}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ExecutionTimeline;
