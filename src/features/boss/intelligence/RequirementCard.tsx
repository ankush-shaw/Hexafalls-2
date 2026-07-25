'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Building2, Link2 } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { RequirementItem } from '../../../types/boss.types';
import { cn } from '../../../utils/cn';

interface RequirementCardProps {
  requirements?: RequirementItem[];
  className?: string;
}

const priorityColors = {
  critical: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
  high: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  medium: 'border-sky-500/40 bg-sky-500/10 text-sky-400',
  low: 'border-slate-500/40 bg-slate-500/10 text-slate-400',
};

export function RequirementCard({ requirements = [], className }: RequirementCardProps) {
  if (requirements.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-4', className)}
    >
      <SectionHeader
        icon={Layers}
        title="Requirement Discovery Engine"
        description="Identifying cross-department data, API access, and operational prerequisites"
        badge={`${requirements.length} Requirements`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {requirements.map((req, idx) => (
          <motion.div
            key={req.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.07 }}
            className="p-3.5 rounded-xl border border-border/50 bg-card/60 space-y-2"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="text-xs font-bold text-foreground truncate">{req.title}</span>
              </div>
              <span className={cn('px-2 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider border shrink-0', priorityColors[req.priority])}>
                {req.priority}
              </span>
            </div>

            <p className="text-[11px] text-muted-foreground leading-snug">{req.reason}</p>

            <div className="flex items-center justify-between text-[10px] pt-1 border-t border-border/30">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Link2 className="h-3 w-3" /> {req.dependencies.join(', ')}
              </span>
              <span className="font-mono text-emerald-400 font-bold">{req.confidence}% Conf.</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default RequirementCard;
