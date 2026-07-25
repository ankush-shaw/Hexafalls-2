'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Activity } from 'lucide-react';
import { ReasoningStep } from '../../../types/boss.types';
import { cn } from '../../../utils/cn';

interface ReasoningStreamProps {
  steps?: ReasoningStep[];
  className?: string;
}

export function ReasoningStream({ steps = [], className }: ReasoningStreamProps) {
  return (
    <div className={cn('p-4 rounded-2xl border border-border/70 bg-black/80 font-mono text-xs text-slate-300 space-y-2 shadow-2xl', className)}>
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
        <span className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-emerald-400" /> BOSS_CEO_REASONING_STREAM.log
        </span>
        <span className="flex items-center gap-1 text-[10px] text-emerald-400">
          <Activity className="h-3 w-3 animate-pulse" /> STREAMING
        </span>
      </div>

      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
        {steps.map((s, idx) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-start gap-2 leading-relaxed"
          >
            <span className="text-emerald-500 font-bold shrink-0">&gt;</span>
            <span className="text-slate-400 shrink-0">[{s.timestamp}]</span>
            <span className={s.status === 'in_progress' ? 'text-amber-300 font-bold' : 'text-slate-200'}>
              {s.title}: {s.detail}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ReasoningStream;
