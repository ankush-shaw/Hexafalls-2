'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface ConfidenceMeterProps {
  score: number; // 0 - 100
  label?: string;
  className?: string;
}

export function ConfidenceMeter({ score, label = 'Reasoning Confidence', className }: ConfidenceMeterProps) {
  return (
    <div className={cn('flex items-center gap-3 p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/8 text-xs font-semibold text-emerald-400', className)}>
      <ShieldCheck className="h-5 w-5 shrink-0" />
      <div className="flex-1 space-y-1">
        <div className="flex justify-between text-[11px]">
          <span>{label}</span>
          <span className="font-mono font-bold">{score}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-emerald-950 overflow-hidden">
          <motion.div
            className="h-full bg-emerald-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>
    </div>
  );
}

export default ConfidenceMeter;
