'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Gauge } from 'lucide-react';
import { SectionHeader } from '../boss/intelligence/SectionHeader';
import { useWorkflowStore } from '../../store/workflowStore';
import { cn } from '../../utils/cn';

interface WorkflowMetricsCardProps {
  className?: string;
}

export function WorkflowMetricsCard({ className }: WorkflowMetricsCardProps) {
  const { nodes } = useWorkflowStore();

  const runningCount = nodes.filter((n) => n.data.status === 'running').length;
  const completedCount = nodes.filter((n) => n.data.status === 'completed').length;
  const waitingCount = nodes.filter((n) => n.data.status === 'waiting').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-4', className)}
    >
      <SectionHeader
        icon={Gauge}
        title="Live Workflow Graph Metrics"
        description="Consolidated node count and execution telemetry"
      />

      <div className="grid grid-cols-2 gap-3 text-center text-xs">
        <div className="p-3 rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-400 space-y-1 font-bold">
          <span className="text-[10px] text-muted-foreground uppercase font-sans">Active Running</span>
          <p className="text-xl font-mono">{runningCount}</p>
        </div>

        <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 space-y-1 font-bold">
          <span className="text-[10px] text-muted-foreground uppercase font-sans">Completed Nodes</span>
          <p className="text-xl font-mono">{completedCount}</p>
        </div>

        <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 space-y-1 font-bold">
          <span className="text-[10px] text-muted-foreground uppercase font-sans">Waiting Nodes</span>
          <p className="text-xl font-mono">{waitingCount}</p>
        </div>

        <div className="p-3 rounded-xl border border-border/40 bg-muted/20 space-y-1 font-bold">
          <span className="text-[10px] text-muted-foreground uppercase font-sans">Total Graph Nodes</span>
          <p className="text-xl font-mono text-foreground">{nodes.length}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default WorkflowMetricsCard;
