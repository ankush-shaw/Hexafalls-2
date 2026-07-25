'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ShieldAlert } from 'lucide-react';
import { SectionHeader } from '../boss/intelligence/SectionHeader';
import { SupervisorTask } from '../../types/supervisor.types';
import { cn } from '../../utils/cn';

interface RetryCardProps {
  tasks?: SupervisorTask[];
  onRetryTask?: (taskId: string) => void;
  className?: string;
}

export function RetryCard({ tasks = [], onRetryTask, className }: RetryCardProps) {
  const retryTasks = tasks.filter((t) => t.status === 'retry' || t.status === 'failed');

  if (retryTasks.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-5 rounded-2xl border border-rose-500/40 bg-rose-500/8 backdrop-blur-xl shadow-lg space-y-3', className)}
    >
      <SectionHeader
        icon={ShieldAlert}
        title="Supervisor Retry & Error Recovery Engine"
        description="Automated exponential backoff retries and worker task error recovery"
        badge={`${retryTasks.length} Retries Active`}
        badgeColor="bg-rose-500/10 text-rose-400 border-rose-500/30"
      />

      <div className="space-y-2 text-xs">
        {retryTasks.map((t) => (
          <div key={t.id} className="p-3.5 rounded-xl border border-rose-500/30 bg-card/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground">{t.title}</span>
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-mono text-[10px] font-bold border border-rose-500/30">
                Attempt #{t.retryCount}
              </span>
            </div>

            <p className="text-[11px] text-rose-400 font-medium leading-snug">{t.errorReason || 'Execution error encountered'}</p>

            {onRetryTask && (
              <button
                onClick={() => onRetryTask(t.id)}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 transition-colors cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Manual Retry Now
              </button>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default RetryCard;
