'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, X, Search, Sparkles, BarChart, GitFork, Lightbulb, HelpCircle } from 'lucide-react';
import { PromptTemplate } from '../../types/chat.types';
import { QuickPromptCard } from './QuickPromptCard';



interface PromptTemplatesProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (prompt: string) => void;
}

const TEMPLATES: PromptTemplate[] = [
  {
    id: 'tmpl-1',
    title: 'Analyze Competitor Ecosystem',
    description: 'Decompose market position, product pricing, and growth triggers of top 3 rivals.',
    category: 'business',
    prompt: 'Conduct a thorough competitor analysis of [Competitor Name]. Identify their key value propositions, pricing strategy, and growth drivers.',
    icon: 'BarChart',
    shortcut: '⌘ Shift B',
  },
  {
    id: 'tmpl-2',
    title: 'Generate Executive Q4 Report',
    description: 'Structure financial EBITDA, revenue metrics, and strategic risks into a PDF report draft.',
    category: 'reports',
    prompt: 'Generate an executive summary report for Q4 performance. Include revenue growth YoY, EBITDA margins, operational risks, and key 2026 milestones.',
    icon: 'Sparkles',
    shortcut: '⌘ Shift R',
  },
  {
    id: 'tmpl-3',
    title: 'Design Multi-Agent Pipeline',
    description: 'Architect Boss -> Supervisor -> Worker hierarchy for data processing workflows.',
    category: 'workflow',
    prompt: 'Design a multi-agent orchestration plan to automate [Workflow Goal]. Define roles for Boss Agent, Supervisor, and 5 dynamic Worker Agents.',
    icon: 'GitFork',
    shortcut: '⌘ Shift W',
  },
  {
    id: 'tmpl-4',
    title: 'Brainstorm Product Roadmap',
    description: 'Generate 10 high-impact feature concepts prioritized by RICE score.',
    category: 'creative',
    prompt: 'Brainstorm 10 innovative AI features for our platform. Calculate a estimated RICE score for each and recommend top 3 for Phase 1 MVP.',
    icon: 'Lightbulb',
  },
  {
    id: 'tmpl-5',
    title: 'Inventory & Supply Audit',
    description: 'Analyze stock levels, turnover rates, and supply chain bottlenecks.',
    category: 'business',
    prompt: 'Perform a supply chain health audit. Identify high-risk inventory bottlenecks and suggest automated reorder triggers.',
    icon: 'ShoppingBag',
  },
  {
    id: 'tmpl-6',
    title: 'Customer Feedback Sentiment',
    description: 'Classify user reviews into positive/neutral/negative clusters.',
    category: 'support',
    prompt: 'Analyze customer feedback dataset. Group responses into sentiment clusters and outline top 5 feature requests.',
    icon: 'HelpCircle',
  },
];

const categoryIcons: Record<string, LucideIcon> = {
  business: BarChart,
  reports: Sparkles,
  workflow: GitFork,
  creative: Lightbulb,
  support: HelpCircle,
};


export function PromptTemplates({ isOpen, onClose, onSelectTemplate }: PromptTemplatesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = TEMPLATES.filter((t) => {
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesQuery = !query.trim() || t.title.toLowerCase().includes(query.toLowerCase()) || t.description.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative z-10 w-full max-w-3xl rounded-2xl border border-border bg-popover shadow-2xl p-6 overflow-hidden space-y-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/50 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold">Prompt Templates Library</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Search + Categories */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search templates..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-muted/50 border border-border/50 rounded-xl outline-none focus:border-primary/50 text-foreground"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {['all', 'business', 'reports', 'workflow', 'creative', 'support'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer capitalize ${
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
            {filtered.map((tmpl) => {
              const Icon = categoryIcons[tmpl.category] || Sparkles;
              return (
                <QuickPromptCard
                  key={tmpl.id}
                  template={tmpl}
                  icon={Icon}
                  onSelect={(p) => {
                    onSelectTemplate(p);
                    onClose();
                  }}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default PromptTemplates;
