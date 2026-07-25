'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Cpu } from 'lucide-react';
import { SectionHeader } from '../boss/intelligence/SectionHeader';
import { SupervisorWorker } from '../../types/supervisor.types';
import { cn } from '../../utils/cn';

interface WorkerAssignmentProps {
  workers?: SupervisorWorker[];
  className?: string;
}

const statusColors: Record<string, string> = {
  busy: 'border-sky-500/40 bg-sky-500/10 text-sky-400',
  ready: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  idle: 'border-slate-500/40 bg-slate-500/10 text-slate-400',
  initializing: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  error: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
};

export function WorkerAssignment({ workers = [], className }: WorkerAssignmentProps) {
  if (workers.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-6 rounded-3xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-xl space-y-4', className)}
    >
      <SectionHeader
        icon={Cpu}
        title="Dynamic Worker Pool Allocation"
        description="Active Worker Agent nodes spawned and managed by Supervisor COO"
        badge={`${workers.length} Worker Threads`}
        badgeColor="bg-sky-500/10 text-sky-400 border-sky-500/30"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {workers.map((worker, idx) => (
          <motion.div
            key={worker.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.06 }}
            className="p-4 rounded-2xl border border-border/50 bg-card/60 space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">{worker.name}</h4>
                  <p className="text-[10px] text-muted-foreground">{worker.type}</p>
                </div>
              </div>

              <span className={cn('px-2 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider border', statusColors[worker.status])}>
                {worker.status}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground block truncate">Step: <strong className="text-foreground">{worker.currentStep}</strong></span>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-sky-400 rounded-full" style={{ width: `${worker.progress}%` }} />
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-1 border-t border-border/30">
              <span>Utilization</span>
              <span className="font-bold text-foreground">{worker.utilizationPercent}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default WorkerAssignment;
