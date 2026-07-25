'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Users, Cpu } from 'lucide-react';
import { SectionHeader } from '../boss/intelligence/SectionHeader';
import { useAnalyticsStore } from '../../store/analyticsStore';

export function AgentAnalytics() {
  const { agentAnalytics } = useAnalyticsStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-3xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-xl space-y-5"
    >
      <SectionHeader
        icon={Bot}
        title="Multi-Agent Tier Telemetry & Performance Analytics"
        description="Comparative metrics across Boss CEO, Supervisor COO, and Dynamic Worker Agents"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Boss Agent CEO Metrics */}
        <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 space-y-3">
          <div className="flex items-center gap-2 text-amber-400">
            <Bot className="h-5 w-5" />
            <h3 className="font-extrabold text-foreground">Boss Agent CEO</h3>
          </div>
          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="flex justify-between border-b border-border/30 pb-1">
              <span className="text-muted-foreground">Planning Speed:</span>
              <strong className="text-amber-400">{agentAnalytics.bossPlanningDuration}</strong>
            </div>
            <div className="flex justify-between border-b border-border/30 pb-1">
              <span className="text-muted-foreground">Decision Accuracy:</span>
              <strong className="text-foreground">{agentAnalytics.bossDecisionAccuracy}%</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Approval Rate:</span>
              <strong className="text-emerald-400">{agentAnalytics.bossApprovalRate}%</strong>
            </div>
          </div>
        </div>

        {/* Supervisor AI COO Metrics */}
        <div className="p-5 rounded-2xl border border-sky-500/30 bg-sky-500/5 space-y-3">
          <div className="flex items-center gap-2 text-sky-400">
            <Users className="h-5 w-5" />
            <h3 className="font-extrabold text-foreground">Supervisor AI COO</h3>
          </div>
          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="flex justify-between border-b border-border/30 pb-1">
              <span className="text-muted-foreground">Queue Size:</span>
              <strong className="text-sky-400">{agentAnalytics.supervisorQueueSize} tasks</strong>
            </div>
            <div className="flex justify-between border-b border-border/30 pb-1">
              <span className="text-muted-foreground">Task Speed:</span>
              <strong className="text-foreground">{agentAnalytics.supervisorTaskSpeed}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Retry Count:</span>
              <strong className="text-emerald-400">{agentAnalytics.supervisorRetryCount}</strong>
            </div>
          </div>
        </div>

        {/* Worker Agents Metrics */}
        <div className="p-5 rounded-2xl border border-primary/30 bg-primary/5 space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <Cpu className="h-5 w-5" />
            <h3 className="font-extrabold text-foreground">Worker Agents Pool</h3>
          </div>
          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="flex justify-between border-b border-border/30 pb-1">
              <span className="text-muted-foreground">Utilization:</span>
              <strong className="text-primary">{agentAnalytics.workerUtilization}%</strong>
            </div>
            <div className="flex justify-between border-b border-border/30 pb-1">
              <span className="text-muted-foreground">Completed Tasks:</span>
              <strong className="text-emerald-400">{agentAnalytics.workerTotalCompleted}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Failed Tasks:</span>
              <strong className="text-rose-400">{agentAnalytics.workerTotalFailed}</strong>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AgentAnalytics;
