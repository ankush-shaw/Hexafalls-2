'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Grid, Flame } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { GoalItem } from '../../../types/boss.types';
import { cn } from '../../../utils/cn';

interface PriorityMatrixProps {
  goals?: GoalItem[];
  className?: string;
}

export function PriorityMatrix({ goals = [], className }: PriorityMatrixProps) {
  // Quadrants: High Impact + High Urgency (Q1), High Impact + Low Urgency (Q2), Low Impact + High Urgency (Q3), Low Impact + Low Urgency (Q4)
  const q1 = goals.filter((g) => g.impact === 'high' && g.urgency === 'high');
  const q2 = goals.filter((g) => g.impact === 'high' && g.urgency !== 'high');
  const q3 = goals.filter((g) => g.impact !== 'high' && g.urgency === 'high');
  const q4 = goals.filter((g) => g.impact !== 'high' && g.urgency !== 'high');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-4', className)}
    >
      <SectionHeader
        icon={Grid}
        title="Priority Matrix (Impact vs Urgency)"
        description="2x2 decision grid plotting extracted goals by strategic value and time sensitivity"
      />

      <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-muted/20 border border-border/40 text-xs">
        {/* Quadrant 1: High Impact / High Urgency */}
        <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/5 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-rose-400">
            <span className="flex items-center gap-1"><Flame className="h-3 w-3" /> Q1: Critical Do First</span>
            <span>{q1.length} Tasks</span>
          </div>
          <div className="space-y-1">
            {q1.map((g) => (
              <div key={g.id} className="p-1.5 rounded bg-card/80 border border-rose-500/20 text-[11px] font-semibold text-foreground truncate">
                {g.title}
              </div>
            ))}
          </div>
        </div>

        {/* Quadrant 2: High Impact / Low Urgency */}
        <div className="p-3 rounded-xl border border-primary/30 bg-primary/5 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-primary">
            <span>Q2: Strategic Plan</span>
            <span>{q2.length} Tasks</span>
          </div>
          <div className="space-y-1">
            {q2.map((g) => (
              <div key={g.id} className="p-1.5 rounded bg-card/80 border border-primary/20 text-[11px] font-semibold text-foreground truncate">
                {g.title}
              </div>
            ))}
          </div>
        </div>

        {/* Quadrant 3: Low Impact / High Urgency */}
        <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-amber-400">
            <span>Q3: Delegate Fast</span>
            <span>{q3.length} Tasks</span>
          </div>
          <div className="space-y-1">
            {q3.map((g) => (
              <div key={g.id} className="p-1.5 rounded bg-card/80 border border-amber-500/20 text-[11px] font-semibold text-foreground truncate">
                {g.title}
              </div>
            ))}
          </div>
        </div>

        {/* Quadrant 4: Low Impact / Low Urgency */}
        <div className="p-3 rounded-xl border border-slate-500/30 bg-slate-500/5 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span>Q4: Optional Backlog</span>
            <span>{q4.length} Tasks</span>
          </div>
          <div className="space-y-1">
            {q4.map((g) => (
              <div key={g.id} className="p-1.5 rounded bg-card/80 border border-slate-500/20 text-[11px] font-semibold text-foreground truncate">
                {g.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PriorityMatrix;
