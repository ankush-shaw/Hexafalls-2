'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useBossStore } from '../../../store/bossStore';
import { cn } from '../../../utils/cn';

interface DecisionCenterCardProps {
  className?: string;
}

const readinessBadges = {
  ready: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  waiting: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  needs_information: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
  blocked: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  review_required: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
};

export function DecisionCenterCard({ className }: DecisionCenterCardProps) {
  const { currentSession } = useBossStore();
  const decision = currentSession?.decision;

  if (!decision) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-6 rounded-3xl border border-primary/30 bg-gradient-to-r from-card via-card to-primary/10 shadow-2xl backdrop-blur-xl space-y-4', className)}
    >
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-foreground">Boss Decision Center</h2>
              <span className={cn('px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border', readinessBadges[decision.readiness])}>
                {decision.readiness.replace('_', ' ')}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Final validation and strategy approval before Supervisor delegation</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-bold text-emerald-400">
          <CheckCircle2 className="h-4 w-4" /> Planning Complete
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl border border-border/50 bg-card/60 text-center space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Decision Confidence</span>
          <p className="text-xl font-extrabold font-mono text-emerald-400">{decision.decisionConfidence}%</p>
        </div>

        <div className="p-3.5 rounded-2xl border border-border/50 bg-card/60 text-center space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Est. Success Rate</span>
          <p className="text-xl font-extrabold font-mono text-primary">{decision.estimatedSuccessRate}%</p>
        </div>

        <div className="p-3.5 rounded-2xl border border-border/50 bg-card/60 text-center space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Overall Risk</span>
          <p className="text-xl font-extrabold font-mono text-emerald-400 uppercase">{decision.riskBreakdown.overall}</p>
        </div>

        <div className="p-3.5 rounded-2xl border border-border/50 bg-card/60 text-center space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Est. Duration</span>
          <p className="text-xl font-extrabold font-mono text-amber-400">{decision.performanceEstimation.estimatedDuration}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default DecisionCenterCard;
