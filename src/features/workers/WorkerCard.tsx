'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, ChevronRight } from 'lucide-react';
import { WorkerAgent } from '../../types/worker.types';
import { useWorkerStore } from '../../store/workerStore';
import { cn } from '../../utils/cn';

interface WorkerCardProps {
  worker: WorkerAgent;
  className?: string;
}

const statusBadges: Record<string, string> = {
  running: 'border-sky-500/40 bg-sky-500/10 text-sky-400',
  completed: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  waiting: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  retrying: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
  paused: 'border-slate-500/40 bg-slate-500/10 text-slate-400',
  cancelled: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
};

const healthColors: Record<string, string> = {
  healthy: 'bg-emerald-400',
  busy: 'bg-sky-400 animate-pulse',
  overloaded: 'bg-rose-400 animate-ping',
  idle: 'bg-slate-400',
  failed: 'bg-rose-500',
};

export function WorkerCard({ worker, className }: WorkerCardProps) {
  const { setSelectedWorkerId } = useWorkerStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => setSelectedWorkerId(worker.id)}
      className={cn(
        'group relative flex flex-col justify-between p-5 rounded-3xl border border-border/60 bg-card/80 backdrop-blur-xl shadow-xl hover:border-primary/50 transition-all cursor-pointer overflow-hidden',
        className
      )}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${worker.avatarColor} text-white shadow-md`}>
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-extrabold text-foreground group-hover:text-primary transition-colors">{worker.name}</h3>
              <span className={cn('h-2 w-2 rounded-full', healthColors[worker.health])} title={`Health: ${worker.health}`} />
            </div>
            <span className="text-[10px] text-muted-foreground font-semibold">{worker.department}</span>
          </div>
        </div>

        <span className={cn('px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border', statusBadges[worker.status])}>
          {worker.status}
        </span>
      </div>

      {/* Assigned Task Title */}
      <div className="my-3 space-y-1">
        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Assigned Task</span>
        <p className="text-xs font-bold text-foreground line-clamp-2 leading-snug">{worker.assignedTaskName}</p>
        <span className="text-[10px] text-sky-400 font-mono block truncate">Step: {worker.currentStep}</span>
      </div>

      {/* Circular Progress & CPU Gauge */}
      <div className="space-y-1.5 pt-2 border-t border-border/30">
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
          <span>Queue #{worker.queuePosition}</span>
          <span className="font-bold text-foreground">{worker.progress}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: `${worker.progress}%` }} />
        </div>
      </div>

      {/* Bottom Footer Stats */}
      <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-2.5 mt-1 border-t border-border/20">
        <span>CPU: <strong className="text-foreground">{worker.metrics.cpuUsage}%</strong></span>
        <span>Mem: <strong className="text-foreground">{worker.metrics.memoryUsage}</strong></span>
        <span className="flex items-center gap-0.5 text-primary font-bold">
          Inspect <ChevronRight className="h-3 w-3" />
        </span>
      </div>
    </motion.div>
  );
}

export default WorkerCard;
