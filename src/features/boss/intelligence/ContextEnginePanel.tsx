'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, CheckCircle2, HelpCircle, AlertCircle, FileQuestion } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { ContextEngineData } from '../../../types/boss.types';
import { cn } from '../../../utils/cn';

interface ContextEnginePanelProps {
  contextData?: ContextEngineData;
  className?: string;
}

export function ContextEnginePanel({ contextData, className }: ContextEnginePanelProps) {
  if (!contextData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-4', className)}
    >
      <SectionHeader
        icon={Layers}
        title="AI Context Engine"
        description="Evaluating known information, working assumptions, and data gaps"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* Known Information */}
        <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-emerald-400">
            <CheckCircle2 className="h-4 w-4" /> Known Information ({contextData.knownInfo.length})
          </div>
          <ul className="space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
            {contextData.knownInfo.map((k, i) => (
              <li key={i}>{k}</li>
            ))}
          </ul>
        </div>

        {/* Working Assumptions */}
        <div className="p-3.5 rounded-xl border border-primary/30 bg-primary/5 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-primary">
            <HelpCircle className="h-4 w-4" /> Working Assumptions ({contextData.assumptions.length})
          </div>
          <ul className="space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
            {contextData.assumptions.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>

        {/* Unknown Variables */}
        <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-amber-400">
            <AlertCircle className="h-4 w-4" /> Unknown Variables ({contextData.unknownInfo.length})
          </div>
          <ul className="space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
            {contextData.unknownInfo.map((u, i) => (
              <li key={i}>{u}</li>
            ))}
          </ul>
        </div>

        {/* Missing Data */}
        <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/5 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-rose-400">
            <FileQuestion className="h-4 w-4" /> Missing Data Inputs ({contextData.missingData.length})
          </div>
          <ul className="space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
            {contextData.missingData.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default ContextEnginePanel;
