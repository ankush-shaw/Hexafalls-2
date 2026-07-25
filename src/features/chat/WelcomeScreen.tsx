'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Bot, GitFork, BarChart3, FileText, Lightbulb, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onSelectPrompt: (prompt: string) => void;
  onOpenTemplates: () => void;
}

const SUGGESTED_PROMPTS = [
  {
    title: 'Analyze Business Competitors',
    description: 'Decompose market share, feature matrices, and pricing tiers for key rivals.',
    icon: BarChart3,
    prompt: 'Conduct a thorough competitor analysis of market leaders. Highlight key differentiators and market gaps.',
  },
  {
    title: 'Design Multi-Agent Pipeline',
    description: 'Structure Boss Agent -> Supervisor -> Worker Agent delegation graph.',
    icon: GitFork,
    prompt: 'Architect a multi-agent workflow to automate complex tasks. Specify agent roles, boundaries, and validation steps.',
  },
  {
    title: 'Executive Financial Audit',
    description: 'Generate a Q4 financial performance summary report with EBITDA metrics.',
    icon: FileText,
    prompt: 'Synthesize Q4 financial performance statements into an executive report with key growth figures.',
  },
  {
    title: 'Product Concept Roadmap',
    description: 'Brainstorm 10 AI features prioritized by user impact and implementation effort.',
    icon: Lightbulb,
    prompt: 'Brainstorm 10 innovative platform capabilities. Prioritize top 3 based on ROI and technical feasibility.',
  },
];

export function WelcomeScreen({ onSelectPrompt, onOpenTemplates }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 max-w-4xl mx-auto space-y-8 text-center">
      {/* Brand Hero Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-3"
      >
        <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-primary via-violet-600 to-amber-500 p-0.5 shadow-xl shadow-primary/20 flex items-center justify-center">
          <div className="h-full w-full bg-background rounded-[14px] flex items-center justify-center">
            <Bot className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            AegisOS Multi-Agent Workspace
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Communicate naturally with Boss Agent, Supervisor, and dynamic Workers via Text, Voice, and Templates.
          </p>
        </div>
      </motion.div>

      {/* Suggested Quick Prompts Grid */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full"
      >
        {SUGGESTED_PROMPTS.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectPrompt(item.prompt)}
              className="group flex flex-col justify-between p-4 rounded-xl border border-border/60 bg-card/60 hover:border-primary/40 hover:bg-muted/40 transition-all cursor-pointer text-left shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{item.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom CTA to Open Template Library */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onClick={onOpenTemplates}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-primary/30 bg-primary/8 text-primary text-xs font-semibold hover:bg-primary/15 transition-colors cursor-pointer"
      >
        <Sparkles className="h-4 w-4" />
        Explore Full Prompt Template Library
      </motion.button>
    </div>
  );
}

export default WelcomeScreen;
