'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RefreshCw, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { BossAvatar } from './BossAvatar';
import { useBossStore } from '../../store/bossStore';
import { cn } from '../../utils/cn';

interface BossAgentCardProps {
  className?: string;
}

export function BossAgentCard({ className }: BossAgentCardProps) {
  const { currentSession, isPlanningActive, stepForward, pausePlanning, resumePlanning, resetPlanning, loadDemoSession } = useBossStore();


  const stage = currentSession?.stage || 'idle';
  const emotion = currentSession?.emotion || 'idle';
  const progress = currentSession?.overallProgress || 0;
  const isPaused = currentSession?.isPaused || false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'relative flex flex-col items-center p-6 rounded-3xl border border-primary/30 bg-gradient-to-b from-card via-card/90 to-primary/5 shadow-2xl overflow-hidden backdrop-blur-xl text-center space-y-5',
        className
      )}
    >
      {/* Background Subtle Mesh Glow */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-primary to-emerald-400" />
      <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      {/* Header Tag */}
      <div className="flex items-center justify-between w-full text-xs font-semibold">
        <span className="flex items-center gap-1.5 text-primary uppercase tracking-widest text-[10px]">
          <ShieldCheck className="h-4 w-4" /> Supreme Orchestrator
        </span>
        {currentSession && (
          <span className="px-2.5 py-0.5 rounded-full border border-border/60 bg-muted/40 text-[10px] font-mono text-muted-foreground">
            Step {currentSession.currentStepIndex} / {currentSession.totalSteps}
          </span>
        )}
      </div>

      {/* Hero Animated Boss Avatar */}
      <BossAvatar stage={stage} emotion={emotion} />

      {/* Description & Action Title */}
      <div className="space-y-1 max-w-lg">
        <h2 className="text-xl font-extrabold tracking-tight text-foreground">
          {stage === 'idle' ? 'Boss Agent CEO' : currentSession?.currentAction}
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {stage === 'idle'
            ? 'The Boss Agent understands objectives, evaluates complexity, and constructs structured execution plans before assigning supervisor tasks.'
            : `Currently running reasoning phase: ${stage.replace('_', ' ').toUpperCase()}`}
        </p>
      </div>

      {/* Overall Planning Progress Bar */}
      {currentSession && (
        <div className="w-full max-w-md space-y-1.5">
          <div className="flex justify-between text-[11px] font-semibold text-muted-foreground">
            <span>Planning Strategy Progress</span>
            <span className="text-primary font-mono font-bold">{progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted/60 overflow-hidden border border-border/40 p-0.5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-primary to-emerald-400"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      )}

      {/* Interactive Controls */}
      <div className="flex items-center justify-center gap-3 pt-2">
        {!isPlanningActive ? (
          <button
            onClick={loadDemoSession}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-violet-600 text-primary-foreground font-bold text-xs hover:opacity-90 transition-all shadow-lg shadow-primary/20 cursor-pointer"
          >
            <Zap className="h-4 w-4" /> Start CEO Planning Simulation
          </button>
        ) : (
          <>
            <button
              onClick={stepForward}
              disabled={stage === 'completed'}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 disabled:opacity-50 transition-all shadow-md cursor-pointer"
            >
              <span>Advance Stage</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {isPaused ? (
              <button
                onClick={resumePlanning}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-400 text-xs font-semibold hover:bg-amber-500/20 cursor-pointer"
              >
                <Play className="h-3.5 w-3.5" /> Resume
              </button>
            ) : (
              <button
                onClick={pausePlanning}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-muted/60 text-muted-foreground hover:text-foreground text-xs font-semibold hover:bg-muted cursor-pointer"
              >
                <Pause className="h-3.5 w-3.5" /> Pause
              </button>
            )}

            <button
              onClick={resetPlanning}
              className="p-2 rounded-xl border border-border text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
              title="Reset Planning Session"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default BossAgentCard;
