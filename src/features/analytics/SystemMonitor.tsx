'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, Wifi, Activity, Server } from 'lucide-react';
import { SectionHeader } from '../boss/intelligence/SectionHeader';
import { useAnalyticsStore } from '../../store/analyticsStore';

export function SystemMonitor() {
  const { resources, tickTelemetry } = useAnalyticsStore();

  useEffect(() => {
    const interval = setInterval(() => {
      tickTelemetry();
    }, 2000);
    return () => clearInterval(interval);
  }, [tickTelemetry]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-3xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-xl space-y-5"
    >
      <SectionHeader
        icon={Server}
        title="Hardware Resource & Infrastructure Telemetry"
        description="Real-time CPU, RAM, Network Bandwidth, and Socket Connection gauges"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-2xl border border-border/40 bg-muted/20 space-y-2">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="flex items-center gap-1 font-bold">
              <Cpu className="h-4 w-4 text-sky-400" /> CPU Usage
            </span>
            <span className="font-mono font-bold text-sky-400">{resources.cpuUsage}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-sky-400 rounded-full" style={{ width: `${resources.cpuUsage}%` }} />
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-border/40 bg-muted/20 space-y-2">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="flex items-center gap-1 font-bold">
              <HardDrive className="h-4 w-4 text-emerald-400" /> Memory RAM
            </span>
            <span className="font-mono font-bold text-emerald-400">{resources.memoryUsage}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${resources.memoryPercent}%` }} />
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-border/40 bg-muted/20 space-y-2">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="flex items-center gap-1 font-bold">
              <Wifi className="h-4 w-4 text-amber-400" /> Network Throughput
            </span>
            <span className="font-mono font-bold text-amber-400">{resources.bandwidth}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-amber-400 rounded-full" style={{ width: '45%' }} />
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-border/40 bg-muted/20 space-y-2">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="flex items-center gap-1 font-bold">
              <Activity className="h-4 w-4 text-violet-400" /> API Latency
            </span>
            <span className="font-mono font-bold text-violet-400">{resources.apiResponseTimeMs}ms</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-violet-400 rounded-full" style={{ width: '20%' }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SystemMonitor;
