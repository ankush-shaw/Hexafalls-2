'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Activity, CheckCircle2 } from 'lucide-react';
import { useReviewStore } from '../../store/reviewStore';
import { cn } from '../../utils/cn';

const streamSteps = [
  'Preparing Executive Report Payload...',
  'Collecting Departmental Deliverables & Audit CSVs...',
  'Analyzing Quantitative Financial & Pricing Outputs...',
  'Summarizing Cross-Departmental Execution Blueprint...',
  'Generating High-Impact Strategic AI Recommendations...',
  'Verifying Data Integrity & Formatting Markdown & JSON...',
  'Finalizing Executive Report PDF Package...',
];

export function GeminiReportStream() {
  const { isGeneratingReport, reportStreamStep } = useReviewStore();

  if (!isGeneratingReport) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 rounded-3xl border border-primary/40 bg-card/90 backdrop-blur-xl shadow-2xl space-y-4 max-w-xl mx-auto my-6"
    >
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-primary/20 text-primary animate-pulse">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-sm font-extrabold text-foreground">Gemini AI Executive Report Generator</h3>
          <p className="text-xs text-muted-foreground">Streaming real-time multi-agent report synthesis...</p>
        </div>
      </div>

      <div className="space-y-2 text-xs font-mono">
        {streamSteps.map((stepText, idx) => {
          const isCurrent = idx + 1 === reportStreamStep;
          const isPassed = idx + 1 < reportStreamStep;

          return (
            <div
              key={idx}
              className={cn(
                'p-2.5 rounded-xl border transition-all flex items-center justify-between',
                isCurrent
                  ? 'border-primary/50 bg-primary/10 text-primary font-bold shadow-xs'
                  : isPassed
                  ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400 font-medium'
                  : 'border-border/30 bg-muted/10 text-muted-foreground/50'
              )}
            >
              <div className="flex items-center gap-2">
                {isPassed ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                ) : isCurrent ? (
                  <Activity className="h-3.5 w-3.5 animate-pulse text-primary" />
                ) : (
                  <span className="h-3.5 w-3.5 rounded-full border border-muted-foreground/30 flex items-center justify-center text-[8px]">
                    {idx + 1}
                  </span>
                )}
                <span>{stepText}</span>
              </div>
              <span className="text-[10px]">{isPassed ? '✓ Done' : isCurrent ? 'Streaming...' : 'Pending'}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default GeminiReportStream;
