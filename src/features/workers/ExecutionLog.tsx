'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Activity } from 'lucide-react';
import { WorkerExecutionLog } from '../../types/worker.types';
import { cn } from '../../utils/cn';

interface ExecutionLogProps {
  logs?: WorkerExecutionLog[];
  className?: string;
}

export function ExecutionLog({ logs = [], className }: ExecutionLogProps) {
  if (logs.length === 0) return null;

  return (
    <div className={cn('p-4 rounded-2xl border border-border/70 bg-black/80 font-mono text-xs text-slate-300 space-y-2 shadow-2xl', className)}>
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
        <span className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-primary" /> WORKER_PROCESS_STREAM.log
        </span>
        <span className="flex items-center gap-1 text-[10px] text-emerald-400">
          <Activity className="h-3 w-3 animate-pulse" /> LIVE STREAM
        </span>
      </div>

      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
        {logs.map((log) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-2 leading-relaxed"
          >
            <span className="text-primary font-bold shrink-0">&gt;</span>
            <span className="text-slate-400 shrink-0">[{log.timestamp}]</span>
            <span className={cn(log.level === 'error' ? 'text-rose-400 font-bold' : log.level === 'success' ? 'text-emerald-400' : 'text-slate-200')}>
              <strong className="text-sky-300">[{log.step}]:</strong> {log.message}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ExecutionLog;
