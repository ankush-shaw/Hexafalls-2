'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, CheckCircle2, ShieldCheck, Clock, Gauge, Award } from 'lucide-react';
import { useReviewStore } from '../../store/reviewStore';

export function ReviewDashboard() {
  const { departments } = useReviewStore();

  const completedDepts = departments.filter((d) => d.status === 'completed').length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 space-y-1 shadow-md"
      >
        <div className="flex items-center justify-between text-emerald-400">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Depts Audited</span>
          <Building2 className="h-4 w-4" />
        </div>
        <p className="text-xl font-black font-mono text-emerald-400">{completedDepts} / {departments.length}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="p-3.5 rounded-2xl border border-sky-500/30 bg-sky-500/10 space-y-1 shadow-md"
      >
        <div className="flex items-center justify-between text-sky-400">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Success Rate</span>
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <p className="text-xl font-black font-mono text-sky-400">100%</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-3.5 rounded-2xl border border-amber-500/30 bg-amber-500/10 space-y-1 shadow-md"
      >
        <div className="flex items-center justify-between text-amber-400">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Exec Duration</span>
          <Clock className="h-4 w-4" />
        </div>
        <p className="text-xl font-black font-mono text-amber-400">02:45</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="p-3.5 rounded-2xl border border-violet-500/30 bg-violet-500/10 space-y-1 shadow-md"
      >
        <div className="flex items-center justify-between text-violet-400">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Final Confidence</span>
          <ShieldCheck className="h-4 w-4" />
        </div>
        <p className="text-xl font-black font-mono text-violet-400">97.5%</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-3.5 rounded-2xl border border-border/50 bg-card/60 space-y-1 shadow-md"
      >
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="text-[10px] font-bold uppercase tracking-wider">Total Retries</span>
          <Gauge className="h-4 w-4 text-primary" />
        </div>
        <p className="text-xl font-black font-mono text-foreground">0</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="p-3.5 rounded-2xl border border-border/50 bg-card/60 space-y-1 shadow-md"
      >
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="text-[10px] font-bold uppercase tracking-wider">Quality Score</span>
          <Award className="h-4 w-4 text-emerald-400" />
        </div>
        <p className="text-xl font-black font-mono text-emerald-400">97/100</p>
      </motion.div>
    </div>
  );
}

export default ReviewDashboard;
