'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
import { SectionHeader } from '../intelligence/SectionHeader';
import { cn } from '../../../utils/cn';

interface ConfidenceGaugeProps {
  confidenceBreakdown?: {
    overall: number;
    planning: number;
    workflow: number;
    department: number;
    execution: number;
  };
  className?: string;
}

export function ConfidenceGauge({ confidenceBreakdown, className }: ConfidenceGaugeProps) {
  const cb = confidenceBreakdown || {
    overall: 98,
    planning: 99,
    workflow: 97,
    department: 96,
    execution: 98,
  };

  const items = [
    { label: 'Overall Confidence', val: cb.overall, color: 'bg-emerald-400' },
    { label: 'Planning Reasoning', val: cb.planning, color: 'bg-primary' },
    { label: 'DAG Workflow Graph', val: cb.workflow, color: 'bg-sky-400' },
    { label: 'Department Discovery', val: cb.department, color: 'bg-violet-400' },
    { label: 'Execution Readiness', val: cb.execution, color: 'bg-teal-400' },
  ];

  return (
    <div className={cn('p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-3.5', className)}>
      <SectionHeader
        icon={ShieldCheck}
        title="Confidence Dashboard"
        description="Sub-system AI confidence ratings across decision phases"
      />

      <div className="space-y-2.5 text-xs">
        {items.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-muted-foreground font-medium">{item.label}</span>
              <span className="font-mono font-bold text-foreground">{item.val}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${item.color}`}
                initial={{ width: '0%' }}
                animate={{ width: `${item.val}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface RiskGaugeProps {
  riskBreakdown?: {
    overall: 'low' | 'medium' | 'high';
    technical: 'low' | 'medium' | 'high';
    business: 'low' | 'medium' | 'high';
    dependency: 'low' | 'medium' | 'high';
    recommendation: string;
  };
  className?: string;
}

const riskBadges = {
  low: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  medium: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  high: 'border-rose-500/30 bg-rose-500/10 text-rose-400',
};

export function RiskGauge({ riskBreakdown, className }: RiskGaugeProps) {
  const rb = riskBreakdown || {
    overall: 'low' as const,
    technical: 'low' as const,
    business: 'low' as const,
    dependency: 'low' as const,
    recommendation: 'Plan is fully validated for Supervisor handoff.',
  };

  return (
    <div className={cn('p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-3.5', className)}>
      <SectionHeader
        icon={ShieldAlert}
        title="Risk & Safety Dashboard"
        description="Multi-factor risk evaluation across technical, business, and dependency layers"
      />

      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2.5 rounded-xl border border-border/40 bg-muted/20 space-y-1">
          <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Technical</span>
          <div>
            <span className={cn('inline-block px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider border', riskBadges[rb.technical])}>
              {rb.technical}
            </span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl border border-border/40 bg-muted/20 space-y-1">
          <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Business</span>
          <div>
            <span className={cn('inline-block px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider border', riskBadges[rb.business])}>
              {rb.business}
            </span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl border border-border/40 bg-muted/20 space-y-1">
          <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Dependency</span>
          <div>
            <span className={cn('inline-block px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider border', riskBadges[rb.dependency])}>
              {rb.dependency}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
