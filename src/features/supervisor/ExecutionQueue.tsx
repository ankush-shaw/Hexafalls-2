'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ListOrdered, Clock, Play, CheckCircle2, ShieldAlert, RefreshCw } from 'lucide-react';
import { SectionHeader } from '../boss/intelligence/SectionHeader';
import { SupervisorTask } from '../../types/supervisor.types';
import { cn } from '../../utils/cn';

interface ExecutionQueueProps {
  tasks?: SupervisorTask[];
  onRetryTask?: (taskId: string) => void;
  className?: string;
}

export function ExecutionQueue({ tasks = [], onRetryTask, className }: ExecutionQueueProps) {
  const waiting = tasks.filter((t) => t.status === 'waiting');
  const running = tasks.filter((t) => t.status === 'running');
  const completed = tasks.filter((t) => t.status === 'completed');
  const issueTasks = tasks.filter((t) => t.status === 'blocked' || t.status === 'retry' || t.status === 'failed');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-6 rounded-3xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-xl space-y-4', className)}
    >
      <SectionHeader
        icon={ListOrdered}
        title="Live Execution Queue Monitor"
        description="4-column operational queue tracking active, waiting, completed, and retrying tasks"
        badge={`${tasks.length} Queue Items`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* Waiting Column */}
        <div className="p-3.5 rounded-2xl border border-amber-500/30 bg-amber-500/5 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-amber-400 border-b border-amber-500/20 pb-2">
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Waiting ({waiting.length})</span>
          </div>
          <div className="space-y-2">
            {waiting.map((t) => (
              <div key={t.id} className="p-2.5 rounded-xl bg-card/80 border border-amber-500/20 space-y-1">
                <span className="font-bold text-foreground text-xs block truncate">{t.title}</span>
                <span className="text-[10px] text-muted-foreground font-mono">{t.department}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Running Column */}
        <div className="p-3.5 rounded-2xl border border-sky-500/30 bg-sky-500/5 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-sky-400 border-b border-sky-500/20 pb-2">
            <span className="flex items-center gap-1.5"><Play className="h-3.5 w-3.5 animate-pulse" /> Running ({running.length})</span>
          </div>
          <div className="space-y-2">
            {running.map((t) => (
              <div key={t.id} className="p-2.5 rounded-xl bg-card/80 border border-sky-500/20 space-y-1">
                <span className="font-bold text-foreground text-xs block truncate">{t.title}</span>
                <div className="flex justify-between text-[10px] font-mono text-sky-400">
                  <span>{t.assignedWorkerName}</span>
                  <span>{t.progressPercent}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Column */}
        <div className="p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-emerald-400 border-b border-emerald-500/20 pb-2">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> Completed ({completed.length})</span>
          </div>
          <div className="space-y-2">
            {completed.map((t) => (
              <div key={t.id} className="p-2.5 rounded-xl bg-card/80 border border-emerald-500/20 space-y-1">
                <span className="font-bold text-foreground text-xs block truncate">{t.title}</span>
                <span className="text-[10px] text-emerald-400 font-mono">100% Done</span>
              </div>
            ))}
          </div>
        </div>

        {/* Retries / Issues Column */}
        <div className="p-3.5 rounded-2xl border border-rose-500/30 bg-rose-500/5 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-rose-400 border-b border-rose-500/20 pb-2">
            <span className="flex items-center gap-1.5"><ShieldAlert className="h-3.5 w-3.5" /> Retry / Blocked ({issueTasks.length})</span>
          </div>
          <div className="space-y-2">
            {issueTasks.map((t) => (
              <div key={t.id} className="p-2.5 rounded-xl bg-card/80 border border-rose-500/20 space-y-1.5">
                <span className="font-bold text-foreground text-xs block truncate">{t.title}</span>
                {t.errorReason && <p className="text-[10px] text-rose-400 leading-snug">{t.errorReason}</p>}
                {onRetryTask && (
                  <button
                    onClick={() => onRetryTask(t.id)}
                    className="w-full flex items-center justify-center gap-1 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold hover:bg-rose-500/20 cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3" /> Trigger Retry #{t.retryCount + 1}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ExecutionQueue;
