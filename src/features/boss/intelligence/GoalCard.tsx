'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, Zap } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { GoalItem } from '../../../types/boss.types';
import { cn } from '../../../utils/cn';

interface GoalCardProps {
  goals?: GoalItem[];
  className?: string;
}

const typeBadges = {
  primary: 'border-primary/40 bg-primary/10 text-primary',
  secondary: 'border-sky-500/40 bg-sky-500/10 text-sky-400',
  optional: 'border-slate-500/40 bg-slate-500/10 text-slate-400',
};

export function GoalCard({ goals = [], className }: GoalCardProps) {
  if (goals.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-4', className)}
    >
      <SectionHeader
        icon={Target}
        title="Goal Extraction Engine"
        description="Decomposing user request into validated, measurable objectives and success metrics"
        badge={`${goals.length} Goals Extracted`}
      />

      <div className="space-y-3">
        {goals.map((g, idx) => (
          <motion.div
            key={g.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="p-4 rounded-xl border border-border/50 bg-card/60 hover:border-primary/30 transition-all space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={cn('px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border', typeBadges[g.type])}>
                  {g.type}
                </span>
                <h4 className="text-xs font-bold text-foreground">{g.title}</h4>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-mono shrink-0">
                <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-semibold uppercase">Impact: {g.impact}</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">{g.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px] border-t border-border/30">
              <div className="flex items-center gap-1.5 text-foreground/80">
                <Zap className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span className="truncate"><strong>Output:</strong> {g.expectedOutput}</span>
              </div>
              <div className="flex items-center gap-1.5 text-foreground/80">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span className="truncate"><strong>Criteria:</strong> {g.successCriteria}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default GoalCard;
