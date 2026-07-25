'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu } from 'lucide-react';
import { useBossStore } from '../../../store/bossStore';
import { cn } from '../../../utils/cn';


interface IntelligenceScoresProps {
  className?: string;
}

export function IntelligenceScores({ className }: IntelligenceScoresProps) {
  const { currentSession } = useBossStore();

  const ctx = currentSession?.context || {
    complexityScore: 88,
    confidenceScore: 96,
    planningAccuracy: 98.4,
    riskLevel: 'low' as const,
    estimatedDuration: '3m 45s',
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Accuracy & Confidence Circular Meters Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Planning Accuracy Gauge */}
        <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col items-center justify-center text-center space-y-2">
          <div className="relative flex items-center justify-center">
            <svg className="h-16 w-16 -rotate-90">
              <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="5" className="text-muted/40" fill="none" />
              <motion.circle
                cx="32"
                cy="32"
                r="26"
                stroke="currentColor"
                strokeWidth="5"
                className="text-emerald-400"
                fill="none"
                strokeDasharray="163"
                initial={{ strokeDashoffset: 163 }}
                animate={{ strokeDashoffset: 163 - (163 * ctx.planningAccuracy) / 100 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <span className="absolute text-xs font-bold font-mono text-emerald-400">{ctx.planningAccuracy}%</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Planning Accuracy</span>
        </div>

        {/* Confidence Score Gauge */}
        <div className="p-4 rounded-2xl border border-primary/30 bg-primary/5 flex flex-col items-center justify-center text-center space-y-2">
          <div className="relative flex items-center justify-center">
            <svg className="h-16 w-16 -rotate-90">
              <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="5" className="text-muted/40" fill="none" />
              <motion.circle
                cx="32"
                cy="32"
                r="26"
                stroke="currentColor"
                strokeWidth="5"
                className="text-primary"
                fill="none"
                strokeDasharray="163"
                initial={{ strokeDashoffset: 163 }}
                animate={{ strokeDashoffset: 163 - (163 * ctx.confidenceScore) / 100 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <span className="absolute text-xs font-bold font-mono text-primary">{ctx.confidenceScore}%</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Confidence Score</span>
        </div>
      </div>

      {/* Complexity & Risk Metric Cards */}
      <div className="p-4 rounded-2xl border border-border/60 bg-card space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <Cpu className="h-3.5 w-3.5 text-amber-400" /> Workload Complexity
          </span>
          <span className="text-amber-400 font-mono font-bold text-xs">{ctx.complexityScore} / 100</span>
        </div>

        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full bg-amber-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${ctx.complexityScore}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>

      {/* Risk Assessment Card */}
      <div className="p-4 rounded-2xl border border-border/60 bg-card flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">Risk Assessment</p>
            <p className="text-[10px] text-muted-foreground">Safety policies verified</p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          {ctx.riskLevel} Risk
        </span>
      </div>
    </div>
  );
}

export default IntelligenceScores;
