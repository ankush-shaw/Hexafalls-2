'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { RiskItem } from '../../../types/boss.types';
import { cn } from '../../../utils/cn';

interface RiskCardProps {
  risk?: RiskItem;
  className?: string;
}

const levelConfig = {
  low: { color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10', icon: ShieldCheck, label: 'Low Risk — Safe Execution' },
  medium: { color: 'text-amber-400 border-amber-500/30 bg-amber-500/10', icon: AlertTriangle, label: 'Moderate Risk — Throttling Active' },
  high: { color: 'text-rose-400 border-rose-500/30 bg-rose-500/10', icon: ShieldAlert, label: 'High Risk — Review Required' },
};

export function RiskCard({ risk, className }: RiskCardProps) {
  if (!risk) return null;

  const cfg = levelConfig[risk.level] || levelConfig.low;
  const Icon = cfg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-3', className)}
    >
      <SectionHeader
        icon={ShieldCheck}
        title="Risk & Safety Engine"
        description="Verifying operational safety policies, resource limits, and error mitigation"
      />

      <div className={cn('p-4 rounded-xl border space-y-2', cfg.color)}>
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 shrink-0" />
          <h4 className="text-xs font-bold">{cfg.label}</h4>
        </div>

        <p className="text-xs text-foreground/90 leading-relaxed font-medium">{risk.reason}</p>

        <div className="flex items-start gap-2 pt-2 border-t border-border/30 text-[11px] text-foreground/80">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <span><strong>Recommendation:</strong> {risk.recommendation}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default RiskCard;
