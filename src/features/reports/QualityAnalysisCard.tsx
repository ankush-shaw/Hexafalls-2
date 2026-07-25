'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, AlertTriangle } from 'lucide-react';
import { SectionHeader } from '../boss/intelligence/SectionHeader';
import { useReviewStore } from '../../store/reviewStore';

export function QualityAnalysisCard() {
  const { quality } = useReviewStore();

  const metrics = [
    { label: 'Accuracy', score: quality.accuracy },
    { label: 'Completeness', score: quality.completeness },
    { label: 'Reliability', score: quality.reliability },
    { label: 'Consistency', score: quality.consistency },
    { label: 'Performance', score: quality.performance },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-4"
    >
      <SectionHeader
        icon={Award}
        title="Quality & Accuracy Telemetry"
        description="Multi-point analytical quality score"
        badge={`${quality.overallQuality}/100 Score`}
      />

      <div className="space-y-2 text-xs">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-1">
            <div className="flex justify-between font-mono text-[11px]">
              <span className="text-muted-foreground">{m.label}</span>
              <span className="font-bold text-foreground">{m.score}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${m.score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function ConfidenceGaugeCard() {
  const { activeReport } = useReviewStore();
  const confidence = activeReport?.finalConfidence || 97.5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-3"
    >
      <SectionHeader
        icon={ShieldCheck}
        title="Overall CEO Confidence Index"
        description="Aggregated Boss, Supervisor & Worker confidence"
      />

      <div className="flex flex-col items-center justify-center p-4 rounded-2xl border border-violet-500/30 bg-violet-500/10 space-y-1">
        <span className="text-3xl font-black font-mono text-violet-400">{confidence}%</span>
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Final System Confidence</span>
      </div>
    </motion.div>
  );
}

export function RiskAnalysisCard() {
  const { risk } = useReviewStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-3"
    >
      <SectionHeader
        icon={AlertTriangle}
        title="Risk Analysis Matrix"
        description="Assessing business and technical risk profiles"
      />

      <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
        <div className="p-2.5 rounded-xl border border-border/40 bg-muted/20">
          <span className="text-[9px] text-muted-foreground uppercase font-sans">Business Risk</span>
          <p className="font-bold text-emerald-400">{risk.businessRisk}</p>
        </div>
        <div className="p-2.5 rounded-xl border border-border/40 bg-muted/20">
          <span className="text-[9px] text-muted-foreground uppercase font-sans">Technical Risk</span>
          <p className="font-bold text-emerald-400">{risk.technicalRisk}</p>
        </div>
        <div className="p-2.5 rounded-xl border border-border/40 bg-muted/20">
          <span className="text-[9px] text-muted-foreground uppercase font-sans">Execution Risk</span>
          <p className="font-bold text-emerald-400">{risk.executionRisk}</p>
        </div>
        <div className="p-2.5 rounded-xl border border-border/40 bg-muted/20">
          <span className="text-[9px] text-muted-foreground uppercase font-sans">Remaining Risk</span>
          <p className="font-bold text-emerald-400">{risk.remainingRisk}</p>
        </div>
      </div>
    </motion.div>
  );
}
