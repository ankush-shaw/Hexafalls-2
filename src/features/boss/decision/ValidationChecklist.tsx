'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import { SectionHeader } from '../intelligence/SectionHeader';
import { ValidationItem } from '../../../types/boss.types';
import { cn } from '../../../utils/cn';

interface ValidationChecklistProps {
  checklist?: ValidationItem[];
  className?: string;
}

export function ValidationChecklist({ checklist = [], className }: ValidationChecklistProps) {
  if (checklist.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-6 rounded-3xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-xl space-y-4', className)}
    >
      <SectionHeader
        icon={ShieldCheck}
        title="Boss CEO Self-Validation Engine"
        description="Automated 7-point integrity check before strategy approval and supervisor handoff"
        badge={`${checklist.filter((c) => c.status === 'passed').length} / ${checklist.length} Passed`}
        badgeColor="bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {checklist.map((item, idx) => {
          const isPassed = item.status === 'passed';

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={cn(
                'flex items-start gap-3 p-3 rounded-xl border text-xs transition-colors',
                isPassed ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-amber-500/30 bg-amber-500/5'
              )}
            >
              <div className="mt-0.5 shrink-0">
                {isPassed ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-400 animate-pulse" />
                )}
              </div>

              <div className="space-y-0.5">
                <span className={cn('font-bold text-xs', isPassed ? 'text-foreground' : 'text-amber-400')}>
                  {item.label}
                </span>
                <p className="text-[11px] text-muted-foreground leading-snug">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default ValidationChecklist;
