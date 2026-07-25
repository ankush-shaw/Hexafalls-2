'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Activity, Brain, Compass, ShieldCheck } from 'lucide-react';
import { useBossStore } from '../../../store/bossStore';
import { cn } from '../../../utils/cn';


interface MultiProgressPanelProps {
  className?: string;
}

export function MultiProgressPanel({ className }: MultiProgressPanelProps) {
  const { currentSession } = useBossStore();

  const progressItems = [
    {
      label: 'Overall Progress',
      value: currentSession?.overallProgress || 0,
      color: 'from-amber-500 via-primary to-emerald-400',
      icon: Activity,
    },
    {
      label: 'Context Understanding',
      value: currentSession?.understandingProgress || 0,
      color: 'from-sky-500 to-indigo-500',
      icon: Compass,
    },
    {
      label: 'Deep Reasoning',
      value: currentSession?.thinkingProgress || 0,
      color: 'from-amber-500 to-primary',
      icon: Brain,
    },
    {
      label: 'Execution Strategy',
      value: currentSession?.planningProgress || 0,
      color: 'from-violet-500 to-primary',
      icon: Layers,
    },
    {
      label: 'Plan Validation',
      value: currentSession?.validationProgress || 0,
      color: 'from-emerald-500 to-teal-400',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className={cn('p-4 rounded-2xl border border-border/60 bg-card space-y-4', className)}>
      <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Planning Sub-System Progress</span>
        <span className="text-[10px] text-primary font-mono font-semibold">Multi-Bar Engine</span>
      </div>

      <div className="space-y-3">
        {progressItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5 font-medium text-foreground/80">
                  <Icon className="h-3.5 w-3.5 text-primary" /> {item.label}
                </span>
                <span className="font-mono font-bold text-foreground text-[10px]">{item.value}%</span>
              </div>

              <div className="h-1.5 w-full rounded-full bg-muted/60 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                  initial={{ width: '0%' }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MultiProgressPanel;
