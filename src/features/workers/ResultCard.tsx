'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { WorkerResult } from '../../types/worker.types';
import { cn } from '../../utils/cn';

interface ResultCardProps {
  result?: WorkerResult;
  className?: string;
}

export function ResultCard({ result, className }: ResultCardProps) {
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn('p-5 rounded-2xl border border-emerald-500/40 bg-emerald-500/8 space-y-3 backdrop-blur-xl', className)}
    >
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2.5">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <h4 className="text-xs font-extrabold text-foreground">Task Result Returned to Supervisor AI</h4>
        </div>
        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
          {result.confidenceScore}% Conf.
        </span>
      </div>

      <p className="text-xs font-semibold text-foreground/90 leading-relaxed">{result.outputSummary}</p>

      {result.keyOutputs.length > 0 && (
        <div className="space-y-1 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Deliverable Outputs</span>
          <div className="flex flex-wrap gap-1.5">
            {result.keyOutputs.map((out, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg bg-card border border-emerald-500/30 text-emerald-400 text-[11px] font-medium">
                ✓ {out}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-1 border-t border-emerald-500/20">
        <span>Exec Time: {result.executionTime}</span>
        <span>Completed: {result.completedAt}</span>
      </div>
    </motion.div>
  );
}

export default ResultCard;
