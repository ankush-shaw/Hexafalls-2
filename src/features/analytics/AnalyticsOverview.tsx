'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAnalyticsStore } from '../../store/analyticsStore';


export function AnalyticsOverview() {
  const { overview } = useAnalyticsStore();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-xs">
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3.5 rounded-2xl border border-primary/30 bg-primary/10 space-y-1 shadow-md"
      >
        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Total Workflows</span>
        <p className="text-xl font-black font-mono text-primary">{overview.totalWorkflows}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 space-y-1 shadow-md"
      >
        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Completed Today</span>
        <p className="text-xl font-black font-mono text-emerald-400">{overview.completedToday}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-3.5 rounded-2xl border border-sky-500/30 bg-sky-500/10 space-y-1 shadow-md"
      >
        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Active Workflows</span>
        <p className="text-xl font-black font-mono text-sky-400">{overview.activeWorkflows}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="p-3.5 rounded-2xl border border-violet-500/30 bg-violet-500/10 space-y-1 shadow-md"
      >
        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Success Rate</span>
        <p className="text-xl font-black font-mono text-violet-400">{overview.avgSuccessRate}%</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-3.5 rounded-2xl border border-amber-500/30 bg-amber-500/10 space-y-1 shadow-md"
      >
        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Avg Confidence</span>
        <p className="text-xl font-black font-mono text-amber-400">{overview.avgConfidence}%</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="p-3.5 rounded-2xl border border-border/50 bg-card/60 space-y-1 shadow-md"
      >
        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Running Agents</span>
        <p className="text-xl font-black font-mono text-foreground">{overview.runningAgents}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-3.5 rounded-2xl border border-border/50 bg-card/60 space-y-1 shadow-md"
      >
        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Avg Duration</span>
        <p className="text-xl font-black font-mono text-foreground">{overview.avgCompletionTime}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="p-3.5 rounded-2xl border border-border/50 bg-card/60 space-y-1 shadow-md"
      >
        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">System Load</span>
        <p className="text-xl font-black font-mono text-sky-400">{overview.systemLoad}%</p>
      </motion.div>
    </div>
  );
}

export default AnalyticsOverview;
