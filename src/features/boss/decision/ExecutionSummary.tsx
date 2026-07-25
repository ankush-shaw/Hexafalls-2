'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { SectionHeader } from '../intelligence/SectionHeader';
import { useBossStore } from '../../../store/bossStore';
import { cn } from '../../../utils/cn';

interface ExecutionSummaryProps {
  className?: string;
}

export function ExecutionSummary({ className }: ExecutionSummaryProps) {
  const { currentSession } = useBossStore();

  if (!currentSession) return null;

  const decision = currentSession.decision;
  const perf = decision.performanceEstimation;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-6 rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 shadow-2xl space-y-4 backdrop-blur-xl', className)}
    >
      <SectionHeader
        icon={FileText}
        title="Boss CEO Executive Blueprint Summary"
        description="Consolidated overview of objectives, departments, estimated duration, and resource budget"
        badge="Plan Ready"
        badgeColor="bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {/* User Objective */}
        <div className="p-4 rounded-2xl border border-border/50 bg-card/60 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">User Objective</span>
          <p className="text-xs font-bold text-foreground line-clamp-2 leading-relaxed">{currentSession.userPrompt}</p>
        </div>

        {/* Strategy Name */}
        <div className="p-4 rounded-2xl border border-border/50 bg-card/60 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Strategy Architecture</span>
          <p className="text-xs font-bold text-primary truncate">{currentSession.strategy.strategyName}</p>
          <p className="text-[11px] text-muted-foreground truncate">{currentSession.strategy.planningStyle}</p>
        </div>

        {/* Resources & Duration */}
        <div className="p-4 rounded-2xl border border-border/50 bg-card/60 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Estimated Resources & Tokens</span>
          <p className="text-xs font-mono font-bold text-foreground">{perf.estimatedTokens.toLocaleString()} LLM Tokens · {perf.estimatedApiCalls} API Calls</p>
          <p className="text-[11px] font-mono text-muted-foreground">Est. Cost: {perf.estimatedCost}</p>
        </div>

        {/* Target Departments */}
        <div className="p-4 rounded-2xl border border-border/50 bg-card/60 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Target Departments</span>
          <div className="flex flex-wrap gap-1 pt-0.5">
            {currentSession.context.departmentsNeeded.map((dept) => (
              <span key={dept} className="px-2 py-0.5 rounded text-[9px] font-semibold bg-primary/10 text-primary border border-primary/20">
                {dept}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ExecutionSummary;
