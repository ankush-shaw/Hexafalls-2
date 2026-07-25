'use client';

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Bot } from 'lucide-react';
import { WorkflowNodeData } from '../../../types/workflow.types';


interface BossNodeProps {
  data: WorkflowNodeData;
}

export function BossNode({ data }: BossNodeProps) {
  return (
    <div className="relative group p-4 rounded-3xl border-2 border-amber-500/50 bg-gradient-to-br from-card via-card to-amber-500/10 shadow-2xl backdrop-blur-xl min-w-[240px]">
      {/* React Flow Handles */}
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-amber-500 border-2 border-background" />

      {/* Top Badge */}
      <div className="flex items-center justify-between pb-2 border-b border-border/40 text-xs">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400">
            <Bot className="h-4 w-4" />
          </div>
          <span className="font-extrabold text-foreground">{data.label}</span>
        </div>
        <span className="px-2 py-0.2 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
          CEO AI
        </span>
      </div>

      {/* Action step */}
      <div className="py-2.5 space-y-1 text-xs">
        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Strategic Action</span>
        <p className="text-[11px] font-semibold text-foreground line-clamp-2 leading-snug">{data.currentStep}</p>
      </div>

      {/* Progress & Latency */}
      <div className="pt-2 border-t border-border/30 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
        <span>Latency: <strong className="text-amber-400">{data.latencyMs}ms</strong></span>
        <span className="font-bold text-foreground">{data.progress}%</span>
      </div>
    </div>
  );
}

export default BossNode;
