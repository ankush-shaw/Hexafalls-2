'use client';

import React, { useState, useEffect } from 'react';
import { Users, Workflow, Activity, Clock } from 'lucide-react';
import { useSupervisorStore } from '../../store/supervisorStore';

export function SupervisorHeader() {
  const { currentSession } = useSupervisorStore();

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

  const formatElapsed = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const stage = currentSession?.stage || 'receiving_workflow';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:px-6 rounded-3xl border border-sky-500/30 bg-card/80 backdrop-blur-xl shadow-xl">
      {/* Title & COO Badge */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-xs">
          <Users className="h-6 w-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-extrabold text-foreground tracking-tight">Supervisor AI Operations Center</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20">
              COO AI Manager
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {currentSession ? `Execution ID: ${currentSession.executionId}` : 'Awaiting Boss approved workflow payload'}
          </p>
        </div>
      </div>

      {/* Meta Badges & Timing */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
        {/* Workflow ID */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/50 bg-card/60 font-mono text-muted-foreground">
          <Workflow className="h-3.5 w-3.5 text-sky-400" />
          <span className="font-bold text-foreground">{currentSession?.workflowId || 'WF-2026-9941'}</span>
        </div>

        {/* Stage Status */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sky-500/30 bg-sky-500/10 font-mono text-sky-400 font-bold uppercase">
          <Activity className="h-3.5 w-3.5 animate-pulse" />
          <span>{stage.replace('_', ' ')}</span>
        </div>

        {/* Elapsed Timer */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/50 bg-card/60 font-mono text-foreground">
          <Clock className="h-3.5 w-3.5 text-amber-400" />
          <span className="font-bold">{formatElapsed(currentSession?.elapsedSeconds || 0)}</span>
        </div>

        {/* Live Socket Indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold text-[11px]">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Socket Synced</span>
        </div>

        {/* Live Clock */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/40 bg-muted/20 font-mono text-muted-foreground">
          {timeStr}
        </div>
      </div>
    </div>
  );
}

export default SupervisorHeader;
