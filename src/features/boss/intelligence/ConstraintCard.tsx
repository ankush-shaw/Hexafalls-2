'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, AlertTriangle, Clock, DollarSign, ExternalLink } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { ConstraintItem } from '../../../types/boss.types';
import { cn } from '../../../utils/cn';

interface ConstraintCardProps {
  constraints?: ConstraintItem[];
  className?: string;
}

const categoryIcons: Record<string, React.ElementType> = {
  budget: DollarSign,
  time: Clock,
  missing_info: AlertTriangle,
  external_dep: ExternalLink,
  blocked_res: ShieldAlert,
};

const severityBadges = {
  high: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
  medium: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  low: 'border-slate-500/40 bg-slate-500/10 text-slate-400',
};

export function ConstraintCard({ constraints = [], className }: ConstraintCardProps) {
  if (constraints.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-4', className)}
    >
      <SectionHeader
        icon={ShieldAlert}
        title="Constraint Detection Engine"
        description="Pinpointing budget limits, timeline bounds, external throttles, and missing inputs"
        badge={`${constraints.length} Constraints`}
        badgeColor="bg-amber-500/10 text-amber-400 border-amber-500/30"
      />

      <div className="space-y-2.5">
        {constraints.map((item, idx) => {
          const Icon = categoryIcons[item.category] || ShieldAlert;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="flex items-start gap-3 p-3.5 rounded-xl border border-border/40 bg-card/60"
            >
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                <Icon className="h-4 w-4" />
              </div>

              <div className="flex-1 space-y-0.5 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">{item.title}</span>
                  <span className={cn('px-2 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider border shrink-0', severityBadges[item.severity])}>
                    {item.severity} Risk
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default ConstraintCard;
