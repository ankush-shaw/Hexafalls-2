'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Users, Clock, Zap } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { ExecutionStrategy } from '../../../types/boss.types';
import { cn } from '../../../utils/cn';

interface StrategyCardProps {
  strategy?: ExecutionStrategy;
  className?: string;
}

export function StrategyCard({ strategy, className }: StrategyCardProps) {
  if (!strategy) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-6 rounded-3xl border border-primary/40 bg-gradient-to-r from-card via-card to-primary/10 shadow-2xl backdrop-blur-xl space-y-4', className)}
    >
      <SectionHeader
        icon={Compass}
        title="Execution Strategy Plan (CEO Recommendation)"
        description="Finalized strategic execution blueprint before Supervisor Agent workflow generation"
        badge={`${strategy.executionConfidence}% Execution Conf.`}
        badgeColor="bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
      />

      <div className="space-y-3 text-xs">
        <div className="p-4 rounded-2xl border border-primary/20 bg-primary/5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Strategy Name</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20">
              {strategy.planningStyle}
            </span>
          </div>
          <h3 className="text-base font-extrabold text-foreground">{strategy.strategyName}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed pt-1">{strategy.summary}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl border border-border/50 bg-card/60 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Estimated Workers</span>
              <p className="text-sm font-bold text-foreground font-mono">{strategy.estimatedWorkers} Threads</p>
            </div>
          </div>

          <div className="p-3 rounded-xl border border-border/50 bg-card/60 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Est. Execution Time</span>
              <p className="text-sm font-bold text-foreground font-mono">{strategy.estimatedDuration}</p>
            </div>
          </div>

          <div className="p-3 rounded-xl border border-border/50 bg-card/60 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Resource Estimate</span>
              <p className="text-xs font-semibold text-foreground truncate">{strategy.resourceEstimate}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default StrategyCard;
