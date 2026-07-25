'use client';

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Bot } from 'lucide-react';
import { WorkflowNodeData } from '../../../types/workflow.types';
import { cn } from '../../../utils/cn';

interface WorkerNodeProps {
  data: WorkflowNodeData;
}

const statusColors: Record<string, string> = {
  running: 'border-sky-500/40 bg-sky-500/10 text-sky-400',
  completed: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  waiting: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  retrying: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
};

export function WorkerNode({ data }: WorkerNodeProps) {
  return (
    <div className="relative group p-3.5 rounded-2xl border border-primary/40 bg-card/90 shadow-xl backdrop-blur-xl min-w-[210px] space-y-2">
      <Handle type="target" position={Position.Top} className="w-2.5 h-2.5 bg-primary border-2 border-background" />
      <Handle type="source" position={Position.Bottom} className="w-2.5 h-2.5 bg-primary border-2 border-background" />

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded-lg bg-primary/10 text-primary">
            <Bot className="h-3.5 w-3.5" />
          </div>
          <span className="font-bold text-foreground text-[11px] truncate max-w-[120px]">{data.label}</span>
        </div>
        <span className={cn('px-1.5 py-0.2 rounded text-[8px] font-mono font-bold uppercase border', statusColors[data.status])}>
          {data.status}
        </span>
      </div>

      <p className="text-[10px] text-muted-foreground line-clamp-1">{data.assignedTaskName}</p>

      <div className="space-y-1 pt-1 border-t border-border/30 text-[10px] font-mono">
        <div className="flex justify-between text-muted-foreground">
          <span>{data.department || 'Worker'}</span>
          <span className="font-bold text-foreground">{data.progress}%</span>
        </div>
        <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: `${data.progress}%` }} />
        </div>
      </div>
    </div>
  );
}

export default WorkerNode;
