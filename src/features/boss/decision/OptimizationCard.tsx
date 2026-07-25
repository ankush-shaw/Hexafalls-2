'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Check, ArrowRight } from 'lucide-react';
import { SectionHeader } from '../intelligence/SectionHeader';
import { OptimizationDetails } from '../../../types/boss.types';
import { cn } from '../../../utils/cn';

interface OptimizationCardProps {
  optimization?: OptimizationDetails;
  onRunOptimization?: () => void;
  className?: string;
}

export function OptimizationCard({ optimization, onRunOptimization, className }: OptimizationCardProps) {
  if (!optimization) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-6 rounded-3xl border border-primary/30 bg-card/80 backdrop-blur-xl shadow-xl space-y-4', className)}
    >
      <div className="flex items-center justify-between border-b border-border/40 pb-3">
        <SectionHeader
          icon={Zap}
          title="Workflow Optimization Engine"
          description="Boss CEO algorithmic workflow graph tuning & latency reduction"
          badge={`-${optimization.timeReductionPercent}% Time Saved`}
          badgeColor="bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
          className="border-0 p-0 m-0"
        />

        {onRunOptimization && (
          <button
            onClick={onRunOptimization}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-primary/30 bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-colors cursor-pointer shrink-0"
          >
            <Zap className="h-3.5 w-3.5" /> Optimize Graph
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* Before vs After Card */}
        <div className="p-4 rounded-2xl border border-border/50 bg-card/60 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Execution Latency Tuning</span>
          <div className="flex items-center gap-3 pt-1 font-mono">
            <div>
              <span className="text-[10px] text-muted-foreground">Before:</span>
              <p className="text-sm font-bold text-rose-400 line-through">{optimization.beforeDuration}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div>
              <span className="text-[10px] text-emerald-400 font-bold">Optimized:</span>
              <p className="text-base font-extrabold text-emerald-400">{optimization.afterDuration}</p>
            </div>
          </div>
        </div>

        {/* Changes summary */}
        <div className="p-4 rounded-2xl border border-border/50 bg-card/60 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Applied Optimizations</span>
          <div className="space-y-1 text-[11px]">
            {optimization.changes.map((chg, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-foreground/90">
                <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{chg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default OptimizationCard;
