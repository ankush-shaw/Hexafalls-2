'use client';

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Bot, Sparkles, Clock } from 'lucide-react';
import { useBossStore } from '../../store/bossStore';
import { useSocket } from '../../providers/SocketProvider';
import { StatusDot } from '../../components/shared/StatusDot';
import { formatDuration } from '../../utils/date.utils';


export function BossHeader() {
  const { currentSession, isPlanningActive } = useBossStore();
  const { isConnected } = useSocket();
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => setTimeStr(format(new Date(), 'HH:mm:ss'));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const stageLabels: Record<string, string> = {
    idle: 'Idle',
    receiving: 'Receiving Request',
    reading: 'Reading Prompt',
    understanding: 'Understanding Context',
    thinking: 'Analyzing Intent & Domain',
    planning: 'Creating Strategy',
    workflow_building: 'Building Workflows',
    validating: 'Validating Plan',
    completed: 'Plan Approved',
  };

  const currentStageLabel = currentSession ? stageLabels[currentSession.stage] || 'Planning' : 'Ready';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-primary/20 bg-gradient-to-r from-card via-card to-primary/5 shadow-lg backdrop-blur-md">
      {/* Left Title & Identity */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-amber-500 via-primary to-violet-600 flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Bot className="h-6 w-6" />
          </div>
          <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-card animate-pulse" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-extrabold tracking-tight text-foreground">Boss Agent</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-amber-500/15 border border-amber-500/30 text-amber-400">
              CEO AI
            </span>
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
            <span>Executive Planning & Intent Architecture</span>
            {currentSession && (
              <>
                <span className="text-border">•</span>
                <span className="font-mono text-[10px] text-primary">{currentSession.executionId}</span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Right Controls & Live Status */}
      <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
        {/* Phase Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-primary/30 bg-primary/10 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '3s' }} />
          <span>{isPlanningActive ? `Planning: ${currentStageLabel}` : 'Ready for Request'}</span>
        </div>

        {/* Live Timer */}
        {currentSession && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/60 bg-muted/30 font-mono text-xs text-foreground">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{formatDuration(currentSession.elapsedSeconds)}</span>
          </div>
        )}

        {/* Connection Status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/50 bg-card text-xs font-medium">
          <StatusDot color={isConnected ? 'green' : 'amber'} pulse={isConnected} />
          <span className="text-muted-foreground">{isConnected ? 'Socket Synced' : 'Connecting'}</span>
        </div>

        {/* Current Time */}
        <div className="hidden lg:block text-xs font-mono text-muted-foreground/80 pl-2 border-l border-border/40">
          {timeStr}
        </div>
      </div>
    </div>
  );
}

export default BossHeader;
