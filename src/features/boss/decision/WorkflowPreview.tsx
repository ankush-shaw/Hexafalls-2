'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GitFork, Bot, Users, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../intelligence/SectionHeader';
import { WorkflowNodePreview } from '../../../types/boss.types';
import { cn } from '../../../utils/cn';

interface WorkflowPreviewProps {
  nodes?: WorkflowNodePreview[];
  className?: string;
}

const nodeTypeColors = {
  boss: 'border-amber-500/50 bg-amber-500/10 text-amber-400',
  supervisor: 'border-sky-500/50 bg-sky-500/10 text-sky-400',
  department: 'border-primary/40 bg-primary/10 text-primary',
  output: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
};

const nodeTypeIcons = {
  boss: Bot,
  supervisor: Users,
  department: Layers,
  output: CheckCircle2,
};

export function WorkflowPreview({ nodes = [], className }: WorkflowPreviewProps) {
  if (nodes.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-6 rounded-3xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-xl space-y-4', className)}
    >
      <SectionHeader
        icon={GitFork}
        title="Generated Workflow Graph Preview"
        description="Visualizing the Boss CEO node hierarchy before Supervisor department delegation"
        badge={`${nodes.length} Graph Nodes`}
      />

      {/* Horizontal Flow Container */}
      <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1">
        {nodes.map((node, idx) => {
          const Icon = nodeTypeIcons[node.type] || Layers;
          const isLast = idx === nodes.length - 1;

          return (
            <React.Fragment key={node.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.06 }}
                className={cn(
                  'group relative flex flex-col justify-between p-4 rounded-2xl border min-w-[200px] max-w-[240px] space-y-2 hover:scale-102 transition-all cursor-pointer shadow-md shrink-0',
                  nodeTypeColors[node.type]
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded-lg bg-card/60">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-card/60">
                    {node.type}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-extrabold truncate text-foreground">{node.name}</h4>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5 leading-snug">{node.purpose}</p>
                </div>

                <div className="flex items-center justify-between text-[10px] pt-1 border-t border-border/30 font-mono">
                  <span>Workload: {node.estimatedWorkload}%</span>
                  <span className="font-bold">{node.confidence}% Conf.</span>
                </div>
              </motion.div>

              {!isLast && (
                <ArrowRight className="h-5 w-5 text-muted-foreground/40 shrink-0 animate-pulse" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </motion.div>
  );
}

export default WorkflowPreview;
