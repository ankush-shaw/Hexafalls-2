'use client';

import React, { useState, useEffect } from 'react';
import { Bot, Cpu, Activity, Clock, ShieldCheck } from 'lucide-react';
import { useWorkerStore } from '../../store/workerStore';

export function WorkerHeader() {
  const { workers } = useWorkerStore();
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

  const activeCount = workers.filter((w) => w.status === 'running').length;
  const completedCount = workers.filter((w) => w.status === 'completed').length;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:px-6 rounded-3xl border border-primary/30 bg-card/80 backdrop-blur-xl shadow-xl">
      {/* Title & Badge */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
          <Bot className="h-6 w-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-extrabold text-foreground tracking-tight">Dynamic Worker Agent Ecosystem</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              Active Workers
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Specialized AI employees executing tasks assigned by Supervisor AI</p>
        </div>
      </div>

      {/* Stats & Live Indicators */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/50 bg-card/60 font-mono">
          <Cpu className="h-3.5 w-3.5 text-primary" />
          <span>Total Pool: <strong className="text-foreground">{workers.length}</strong></span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-400 font-mono font-bold">
          <Activity className="h-3.5 w-3.5 animate-pulse" />
          <span>Running: {activeCount}</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono font-bold">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Completed: {completedCount}</span>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/40 bg-muted/20 font-mono text-muted-foreground">
          <Clock className="h-3.5 w-3.5 text-amber-400" />
          <span>{timeStr}</span>
        </div>
      </div>
    </div>
  );
}

export default WorkerHeader;
