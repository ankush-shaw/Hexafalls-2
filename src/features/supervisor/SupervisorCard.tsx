'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Play, Pause, RefreshCw, ChevronRight, Activity } from 'lucide-react';
import { useSupervisorStore } from '../../store/supervisorStore';
import { cn } from '../../utils/cn';

interface SupervisorCardProps {
  className?: string;
}

export function SupervisorCard({ className }: SupervisorCardProps) {
  const {
    currentSession,
    pauseOrchestration,
    resumeOrchestration,
    resetOrchestration,
    stepForward,
  } = useSupervisorStore();


  if (!currentSession) return null;

  const isPaused = currentSession.isPaused;
  const progress = currentSession.overallProgress;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn('p-6 rounded-3xl border border-sky-500/40 bg-gradient-to-br from-card via-card to-sky-500/10 shadow-2xl backdrop-blur-xl space-y-6', className)}
    >
      {/* Avatar & Title Row */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        {/* Animated Avatar Aura */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-sky-500/20 blur-xl animate-pulse" />
          <div className="relative p-4 rounded-3xl bg-gradient-to-br from-sky-500/20 to-sky-600/30 border border-sky-500/40 text-sky-400 shadow-xl">
            <Users className="h-10 w-10" />
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl font-black text-foreground tracking-tight">Supervisor Agent COO</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-sky-500/15 border border-sky-500/30 text-sky-400">
              Operations Control
            </span>
          </div>

          <p className="text-xs text-muted-foreground max-w-lg leading-relaxed">
            Responsible for workflow task decomposition, worker thread allocation, live execution monitoring, and automated error retries.
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-2 pt-1 text-xs font-semibold text-sky-400">
            <Activity className="h-4 w-4 animate-spin" />
            <span>{currentSession.currentAction}</span>
          </div>
        </div>

        {/* Step Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={stepForward}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 text-sky-950 font-extrabold text-xs hover:bg-sky-400 transition-all shadow-md cursor-pointer"
          >
            <span>Advance Stage</span>
            <ChevronRight className="h-4 w-4" />
          </button>

          {isPaused ? (
            <button
              onClick={resumeOrchestration}
              className="p-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors cursor-pointer"
              title="Resume Orchestration"
            >
              <Play className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={pauseOrchestration}
              className="p-2 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors cursor-pointer"
              title="Pause Orchestration"
            >
              <Pause className="h-4 w-4" />
            </button>
          )}

          <button
            onClick={resetOrchestration}
            className="p-2 rounded-xl border border-border/60 bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            title="Reset Session"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5 pt-2 border-t border-border/40">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-muted-foreground">Orchestration Progress</span>
          <span className="font-bold text-sky-400">{progress}%</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-muted/60 overflow-hidden p-0.5 border border-border/30">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-500 via-sky-400 to-emerald-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default SupervisorCard;
