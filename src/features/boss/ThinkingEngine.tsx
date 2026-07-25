'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, CheckCircle2, Clock, Terminal, Activity } from 'lucide-react';

import { useBossStore } from '../../store/bossStore';
import { BossPlanningStage } from '../../types/boss.types';
import { cn } from '../../utils/cn';

const STAGES: { stage: BossPlanningStage; label: string }[] = [
  { stage: 'receiving', label: '1. Receive' },
  { stage: 'reading', label: '2. Read' },
  { stage: 'understanding', label: '3. Understand' },
  { stage: 'thinking', label: '4. Analyze' },
  { stage: 'planning', label: '5. Strategy' },
  { stage: 'workflow_building', label: '6. Workflow' },
  { stage: 'validating', label: '7. Validate' },
  { stage: 'completed', label: '8. Approved' },
];

export function ThinkingEngine() {
  const { currentSession } = useBossStore();
  const activeStage = currentSession?.stage || 'idle';
  const steps = currentSession?.reasoningStream || [];

  const getStageIndex = (s: BossPlanningStage) => STAGES.findIndex((st) => st.stage === s);
  const activeIndex = getStageIndex(activeStage);

  return (
    <div className="space-y-5 p-6 rounded-3xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Boss Reasoning & Thinking Engine</h3>
            <p className="text-[11px] text-muted-foreground">Streaming real-time execution decomposition & logic steps</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-primary/20 bg-primary/10 text-[10px] font-bold uppercase tracking-wider text-primary">
          <Activity className="h-3 w-3 animate-pulse" /> Live Stream
        </div>
      </div>

      {/* Stage Pipeline Progress Steps */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 py-2">
        {STAGES.map((st, idx) => {
          const isDone = activeIndex > idx;
          const isCurrent = activeIndex === idx;

          return (
            <div
              key={st.stage}
              className={cn(
                'flex flex-col items-center p-2 rounded-xl border text-center transition-all',
                isDone
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                  : isCurrent
                  ? 'border-primary bg-primary/15 text-primary shadow-md scale-105'
                  : 'border-border/40 bg-muted/20 text-muted-foreground/50'
              )}
            >
              {isDone ? (
                <CheckCircle2 className="h-3.5 w-3.5 mb-1 text-emerald-400" />
              ) : isCurrent ? (
                <span className="h-3.5 w-3.5 rounded-full border-2 border-primary border-t-transparent animate-spin mb-1" />
              ) : (
                <span className="h-3.5 w-3.5 rounded-full border border-border mb-1" />
              )}
              <span className="text-[9px] font-bold tracking-tight truncate w-full">{st.label}</span>
            </div>
          );
        })}
      </div>

      {/* SVG Animated Node & Stream Visualization */}
      <div className="relative h-28 w-full rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-violet-600/10 overflow-hidden flex items-center justify-center p-4">
        {/* Animated Particles SVG canvas */}
        <svg className="absolute inset-0 h-full w-full opacity-40">
          <line x1="10%" y1="50%" x2="30%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-primary animate-pulse" />
          <line x1="30%" y1="50%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-violet-500 animate-pulse" />
          <line x1="50%" y1="50%" x2="70%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-amber-500 animate-pulse" />
          <line x1="70%" y1="50%" x2="90%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-emerald-500 animate-pulse" />

          <circle cx="10%" cy="50%" r="5" className="fill-primary" />
          <circle cx="30%" cy="50%" r="7" className="fill-violet-500" />
          <circle cx="50%" cy="50%" r="9" className="fill-amber-500" />
          <circle cx="70%" cy="50%" r="7" className="fill-emerald-500" />
          <circle cx="90%" cy="50%" r="5" className="fill-emerald-400" />
        </svg>

        <div className="relative z-10 text-center space-y-1">
          <p className="text-xs font-mono text-primary font-bold tracking-wider uppercase">
            {activeStage === 'idle' ? 'Awaiting Instruction' : `Active Reasoning Phase: ${activeStage}`}
          </p>
          <p className="text-[11px] text-muted-foreground max-w-md mx-auto">
            {activeStage === 'completed'
              ? 'Strategy validation complete. Blueprint generated for Supervisor Agent.'
              : 'Synthesizing knowledge graph and estimating task complexities...'}
          </p>
        </div>
      </div>

      {/* Streaming Reasoning Step Log */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground px-1">
          <span className="flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-primary" /> Reasoning Log Stream
          </span>
          <span>{steps.length} Steps</span>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {steps.length === 0 ? (
            <div className="py-6 text-center text-xs text-muted-foreground italic border border-dashed border-border/40 rounded-xl">
              No reasoning steps active. Click &quot;Start CEO Planning Simulation&quot; above to watch Boss Agent think.
            </div>
          ) : (
            steps.map((step) => {
              const isComp = step.status === 'completed';
              const isInProg = step.status === 'in_progress';

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    'flex items-start gap-3 p-3 rounded-xl border text-xs transition-colors',
                    isComp
                      ? 'border-border/40 bg-card/60'
                      : isInProg
                      ? 'border-primary/50 bg-primary/10 shadow-sm'
                      : 'border-border/20 bg-muted/10 opacity-50'
                  )}
                >
                  <div className="mt-0.5 shrink-0">
                    {isComp ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : isInProg ? (
                      <span className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin block" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground/40" />
                    )}
                  </div>

                  <div className="flex-1 space-y-0.5 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={cn('font-semibold truncate', isInProg ? 'text-primary' : 'text-foreground')}>
                        {step.title}
                      </p>
                      <span className="text-[10px] font-mono text-muted-foreground/60 shrink-0">{step.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{step.detail}</p>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default ThinkingEngine;
