'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { useBossStore } from '../../store/bossStore';

export function BossEmptyState() {
  const { startPlanning, loadDemoSession } = useBossStore();

  const SAMPLE_PROMPTS = [
    {
      title: 'Q4 Financial & Competitor Analysis',
      prompt: 'Orchestrate a multi-department audit analyzing Q4 financial results and benchmarking key competitor growth drivers across Finance, Operations, and Marketing.',
      badge: 'Executive Audit',
    },
    {
      title: 'Multi-Agent Workflow Strategy',
      prompt: 'Architect a multi-agent orchestration graph to automate data processing and report generation. Allocate supervisor tasks and dynamic worker threads.',
      badge: 'Workflow Architecture',
    },
    {
      title: 'Supply Chain Risk Assessment',
      prompt: 'Analyze inventory turnover rates and evaluate supply chain bottlenecks across global fulfillment nodes. Define mitigation strategies.',
      badge: 'Risk Mitigation',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 max-w-4xl mx-auto space-y-8 text-center">
      {/* Hero Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-4"
      >
        <div className="mx-auto h-20 w-20 rounded-3xl bg-gradient-to-br from-amber-500 via-primary to-violet-600 p-0.5 shadow-2xl shadow-primary/30 flex items-center justify-center">
          <div className="h-full w-full bg-card rounded-[22px] flex items-center justify-center">
            <Bot className="h-10 w-10 text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" /> CEO AI Reasoning Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Boss Agent Workspace
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            The Boss Agent does not execute tasks directly — it analyzes user intent, evaluates workload complexity, and constructs structured execution blueprints before delegating to Supervisors.
          </p>
        </div>
      </motion.div>

      {/* Main Start Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={loadDemoSession}
        className="flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary via-violet-600 to-amber-500 text-white font-extrabold text-sm hover:opacity-90 transition-all shadow-xl shadow-primary/25 cursor-pointer scale-105"
      >
        <Zap className="h-5 w-5" /> Launch CEO Planning Simulation
      </motion.button>

      {/* Sample Prompts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full text-left pt-4">
        {SAMPLE_PROMPTS.map((sample) => (
          <motion.div
            key={sample.title}
            whileHover={{ y: -3 }}
            onClick={() => startPlanning(sample.prompt)}
            className="group flex flex-col justify-between p-5 rounded-2xl border border-border/60 bg-card/60 hover:border-primary/40 hover:bg-muted/40 transition-all cursor-pointer shadow-sm space-y-3"
          >
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                {sample.badge}
              </span>
              <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors pt-1">
                {sample.title}
              </h3>
              <p className="text-[11px] text-muted-foreground line-clamp-3 leading-snug">
                {sample.prompt}
              </p>
            </div>

            <div className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
              <span>Start Planning</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default BossEmptyState;
