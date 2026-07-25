'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { SectionHeader } from '../boss/intelligence/SectionHeader';
import { useWorkflowStore } from '../../store/workflowStore';
import { cn } from '../../utils/cn';

interface SystemHealthCardProps {
  className?: string;
}

const statusBadges: Record<string, string> = {
  green: 'bg-emerald-400',
  yellow: 'bg-amber-400 animate-pulse',
  red: 'bg-rose-500 animate-ping',
};

export function SystemHealthCard({ className }: SystemHealthCardProps) {
  const { systemHealth, isSocketConnected, socketLatencyMs } = useWorkflowStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-3', className)}
    >
      <SectionHeader
        icon={Activity}
        title="Live System Health & Latency Monitor"
        description="Real-time operational status across Boss, Supervisor, DB, Socket, and Gemini AI"
        badge={isSocketConnected ? `${socketLatencyMs}ms Socket` : 'Disconnected'}
        badgeColor="bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
      />

      <div className="space-y-2 text-xs">
        {systemHealth.map((item) => (
          <div key={item.id} className="p-2.5 rounded-xl border border-border/40 bg-muted/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={cn('h-2 w-2 rounded-full', statusBadges[item.status])} />
              <span className="font-bold text-foreground truncate">{item.name}</span>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">{item.latencyMs}ms</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default SystemHealthCard;
