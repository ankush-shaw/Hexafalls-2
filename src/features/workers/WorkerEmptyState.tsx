'use client';

import React from 'react';
import { Bot, Play, Sparkles } from 'lucide-react';

import { useWorkerStore } from '../../store/workerStore';

export function WorkerEmptyState() {
  const { loadDemoWorkerPool } = useWorkerStore();

  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-3xl border border-dashed border-primary/30 bg-card/40 backdrop-blur-xl text-center space-y-6 max-w-3xl mx-auto my-8">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse" />
        <div className="relative p-6 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/30 border border-primary/40 text-primary">
          <Bot className="h-12 w-12" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest">
          <Sparkles className="h-3.5 w-3.5" /> Worker Agent Ecosystem
        </div>
        <h2 className="text-2xl font-black tracking-tight text-foreground">
          Ready to Spawn Specialized Worker AI Employees
        </h2>
        <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
          Worker Agents are dynamically initialized by Supervisor AI to execute specialized tasks across Data Science, Finance, Legal, Operations, and Marketing.
        </p>
      </div>

      <button
        onClick={loadDemoWorkerPool}
        className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-purple-600 text-primary-foreground font-extrabold text-sm hover:opacity-90 transition-all shadow-xl shadow-primary/25 cursor-pointer scale-105"
      >
        <Play className="h-4 w-4 fill-current" /> Spawn Worker Agent Pool Demo
      </button>
    </div>
  );
}

export default WorkerEmptyState;
