'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { ReasoningStep } from '../../../types/boss.types';
import { cn } from '../../../utils/cn';

interface PlanningTimelineProps {
  steps?: ReasoningStep[];
  className?: string;
}

export function PlanningTimeline({ steps = [], className }: PlanningTimelineProps) {
  if (steps.length === 0) return null;

  return (
    <div className={cn('space-y-3 p-4 rounded-2xl border border-border/60 bg-card/60', className)}>
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Terminal className="h-3.5 w-3.5 text-primary" /> Chronological Planning Timeline
        </span>
        <span className="text-primary font-mono text-[10px]">{steps.filter((s) => s.status === 'completed').length} / {steps.length} Done</span>
      </div>

      <div className="relative pl-4 border-l border-border/50 space-y-4">
        {steps.map((step, i) => {
          const isDone = step.status === 'completed';
          const isInProg = step.status === 'in_progress';

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative text-xs space-y-1"
            >
              {/* Timeline Dot */}
              <div
                className={cn(
                  'absolute -left-[21px] top-0.5 h-3.5 w-3.5 rounded-full border-2 bg-background flex items-center justify-center',
                  isDone
                    ? 'border-emerald-400 bg-emerald-400'
                    : isInProg
                    ? 'border-primary bg-primary animate-ping'
                    : 'border-border'
                )}
              />

              <div className="flex items-center justify-between">
                <span className={cn('font-bold', isDone ? 'text-emerald-400' : isInProg ? 'text-primary font-extrabold' : 'text-muted-foreground')}>
                  {step.title}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground/60">{step.timestamp}</span>
              </div>

              <p className="text-[11px] text-muted-foreground leading-relaxed">{step.detail}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default PlanningTimeline;
