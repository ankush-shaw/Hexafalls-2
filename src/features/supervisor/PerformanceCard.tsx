'use client';

import React from 'react';
import { Activity, Gauge, Play, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';

import { SectionHeader } from '../boss/intelligence/SectionHeader';
import { SupervisorMetrics } from '../../types/supervisor.types';
import { cn } from '../../utils/cn';

interface PerformanceCardProps {
  metrics?: SupervisorMetrics;
  className?: string;
}

export function PerformanceCard({ metrics, className }: PerformanceCardProps) {
  const m = metrics || {
    runningTasks: 3,
    waitingTasks: 1,
    completedTasks: 1,
    failedTasks: 0,
    retryCount: 1,
    successRate: 94.5,
    workerUtilization: 78,
    queueSize: 6,
    avgDuration: '38s',
  };

  return (
    <div className={cn('p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-4', className)}>
      <SectionHeader
        icon={Gauge}
        title="Operations Performance Metrics"
        description="Real-time worker thread utilization and execution efficiency"
      />

      <div className="grid grid-cols-2 gap-3 text-center text-xs">
        <div className="p-3 rounded-xl border border-border/40 bg-muted/20 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Worker Utilization</span>
          <p className="text-xl font-extrabold font-mono text-sky-400">{m.workerUtilization}%</p>
        </div>

        <div className="p-3 rounded-xl border border-border/40 bg-muted/20 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Execution Success</span>
          <p className="text-xl font-extrabold font-mono text-emerald-400">{m.successRate}%</p>
        </div>

        <div className="p-3 rounded-xl border border-border/40 bg-muted/20 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Queue Size</span>
          <p className="text-xl font-extrabold font-mono text-foreground">{m.queueSize} Tasks</p>
        </div>

        <div className="p-3 rounded-xl border border-border/40 bg-muted/20 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Avg Task Duration</span>
          <p className="text-xl font-extrabold font-mono text-amber-400">{m.avgDuration}</p>
        </div>
      </div>
    </div>
  );
}

export function MetricsCard({ metrics, className }: PerformanceCardProps) {
  const m = metrics || {
    runningTasks: 3,
    waitingTasks: 1,
    completedTasks: 1,
    failedTasks: 0,
    retryCount: 1,
    successRate: 94.5,
    workerUtilization: 78,
    queueSize: 6,
    avgDuration: '38s',
  };

  return (
    <div className={cn('p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-3', className)}>
      <SectionHeader
        icon={Activity}
        title="Live Task Status Breakdown"
      />

      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between p-2.5 rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-400 font-bold">
          <span className="flex items-center gap-1.5"><Play className="h-3.5 w-3.5" /> Running Tasks</span>
          <span className="font-mono text-sm">{m.runningTasks}</span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 font-bold">
          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Waiting Tasks</span>
          <span className="font-mono text-sm">{m.waitingTasks}</span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> Completed Tasks</span>
          <span className="font-mono text-sm">{m.completedTasks}</span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 font-bold">
          <span className="flex items-center gap-1.5"><ShieldAlert className="h-3.5 w-3.5" /> Retries Triggered</span>
          <span className="font-mono text-sm">{m.retryCount}</span>
        </div>
      </div>
    </div>
  );
}
