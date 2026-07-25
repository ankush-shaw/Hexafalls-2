'use client';

import React from 'react';
import { Users, Play, Sparkles } from 'lucide-react';

import { useSupervisorStore } from '../../store/supervisorStore';

export function SupervisorEmptyState() {
  const { loadDemoSupervisorSession } = useSupervisorStore();

  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-3xl border border-dashed border-sky-500/30 bg-card/40 backdrop-blur-xl text-center space-y-6 max-w-3xl mx-auto my-8">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-sky-500/20 blur-2xl animate-pulse" />
        <div className="relative p-6 rounded-3xl bg-gradient-to-br from-sky-500/20 to-sky-600/30 border border-sky-500/40 text-sky-400">
          <Users className="h-12 w-12" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="h-3.5 w-3.5" /> Supervisor AI Operations Control
        </div>
        <h2 className="text-2xl font-black tracking-tight text-foreground">
          Ready to Orchestrate Worker Execution
        </h2>
        <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
          The Supervisor AI (COO) transforms Boss CEO approved workflows into executable tasks, dynamically provisions Worker Agents, and monitors execution queues.
        </p>
      </div>

      <button
        onClick={loadDemoSupervisorSession}
        className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-sky-950 font-extrabold text-sm hover:opacity-90 transition-all shadow-xl shadow-sky-500/25 cursor-pointer scale-105"
      >
        <Play className="h-4 w-4 fill-current" /> Launch Supervisor Orchestration Demo
      </button>
    </div>
  );
}

export default SupervisorEmptyState;
