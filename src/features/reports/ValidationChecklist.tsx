'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../boss/intelligence/SectionHeader';
import { useReviewStore } from '../../store/reviewStore';

export function ValidationChecklist() {
  const { validationChecks } = useReviewStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-3xl border border-emerald-500/40 bg-emerald-500/8 backdrop-blur-xl shadow-xl space-y-4"
    >
      <SectionHeader
        icon={ShieldCheck}
        title="CEO 6-Point Self-Validation Assertions"
        description="Automated integrity verification engine reviewing departmental output payloads"
        badge="6 / 6 Passed"
        badgeColor="bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
      />

      <div className="space-y-2 text-xs">
        {validationChecks.map((check) => (
          <div key={check.id} className="p-3 rounded-2xl border border-emerald-500/30 bg-card/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-foreground">{check.title}</h4>
                <p className="text-[10px] text-muted-foreground">{check.description}</p>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-400 shrink-0">{check.score}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default ValidationChecklist;
