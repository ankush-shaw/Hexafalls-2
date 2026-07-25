'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { IntentAnalysisData } from '../../../types/boss.types';
import { cn } from '../../../utils/cn';

interface IntentCardProps {
  intent?: IntentAnalysisData;
  className?: string;
}

export function IntentCard({ intent, className }: IntentCardProps) {
  if (!intent) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-4', className)}
    >
      <SectionHeader
        icon={Compass}
        title="Intent Analysis Engine"
        description="Extracting business domain, core objectives, and strategic problem classification"
        badge={`${intent.confidence}% Confidence`}
        badgeColor="bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
      />

      <div className="space-y-3 text-xs">
        {/* Primary Intent Box */}
        <div className="p-3.5 rounded-xl border border-primary/20 bg-primary/5 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Primary Intent</span>
          <p className="text-sm font-bold text-foreground leading-snug">{intent.primaryIntent}</p>
          <p className="text-xs text-muted-foreground mt-1">{intent.primaryGoal}</p>
        </div>

        {/* Grid Meta Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <div className="p-2.5 rounded-xl border border-border/40 bg-muted/20">
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Domain</span>
            <p className="text-xs font-bold text-foreground mt-0.5">{intent.businessDomain}</p>
          </div>
          <div className="p-2.5 rounded-xl border border-border/40 bg-muted/20">
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Task Category</span>
            <p className="text-xs font-bold text-foreground mt-0.5 truncate">{intent.taskCategory}</p>
          </div>
          <div className="p-2.5 rounded-xl border border-border/40 bg-muted/20">
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Problem Type</span>
            <p className="text-xs font-bold text-foreground mt-0.5 truncate">{intent.problemType}</p>
          </div>
        </div>

        {/* Secondary Goals list */}
        {intent.secondaryGoals.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Sub-Intent Breakdown</span>
            <div className="space-y-1">
              {intent.secondaryGoals.map((sg, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] text-foreground/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span className="truncate">{sg}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default IntentCard;
