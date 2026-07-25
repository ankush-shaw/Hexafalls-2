'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { cn } from '../../../utils/cn';

interface ComplexityMeterProps {
  score?: number; // 1 - 100
  level?: 'Simple' | 'Medium' | 'Complex' | 'Enterprise';
  className?: string;
}

const levelColors = {
  Simple: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  Medium: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
  Complex: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  Enterprise: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
};

export function ComplexityMeter({ score = 88, level = 'Enterprise', className }: ComplexityMeterProps) {
  return (
    <div className={cn('p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-4 text-center', className)}>
      <SectionHeader
        icon={Cpu}
        title="Complexity Analyzer"
        description="Estimating algorithmic workload & node coordination requirements"
      />

      <div className="flex flex-col items-center justify-center space-y-3 py-2">
        {/* Animated Circular Gauge */}
        <div className="relative flex items-center justify-center">
          <svg className="h-28 w-28 -rotate-90">
            <circle cx="56" cy="56" r="46" stroke="currentColor" strokeWidth="8" className="text-muted/30" fill="none" />
            <motion.circle
              cx="56"
              cy="56"
              r="46"
              stroke="currentColor"
              strokeWidth="8"
              className="text-amber-400"
              fill="none"
              strokeDasharray="289"
              initial={{ strokeDashoffset: 289 }}
              animate={{ strokeDashoffset: 289 - (289 * score) / 100 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-black font-mono tracking-tight text-foreground">{score}</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">/ 100</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className={cn('px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest border', levelColors[level])}>
            {level} Scale Workload
          </span>
          <p className="text-[11px] text-muted-foreground max-w-xs mx-auto pt-1 leading-snug">
            Requires cross-department delegation and multi-worker thread coordination.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ComplexityMeter;
