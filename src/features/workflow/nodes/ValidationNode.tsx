'use client';

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { ShieldCheck, FileText, Database } from 'lucide-react';
import { WorkflowNodeData } from '../../../types/workflow.types';


interface NodeProps {
  data: WorkflowNodeData;
}

export function ValidationNode({ data }: NodeProps) {
  return (
    <div className="relative group p-3.5 rounded-2xl border border-emerald-500/40 bg-emerald-500/8 shadow-xl backdrop-blur-xl min-w-[210px] space-y-1.5">
      <Handle type="target" position={Position.Top} className="w-2.5 h-2.5 bg-emerald-400 border-2 border-background" />
      <Handle type="source" position={Position.Bottom} className="w-2.5 h-2.5 bg-emerald-400 border-2 border-background" />

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span className="font-bold text-foreground text-[11px]">{data.label}</span>
        </div>
        <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          7-Point Pass
        </span>
      </div>

      <p className="text-[10px] text-muted-foreground line-clamp-1">{data.currentStep}</p>

      <div className="pt-1 border-t border-emerald-500/20 flex justify-between text-[10px] font-mono text-emerald-400 font-bold">
        <span>Validation Progress</span>
        <span>{data.progress}%</span>
      </div>
    </div>
  );
}

export function ReportNode({ data }: NodeProps) {
  return (
    <div className="relative group p-3.5 rounded-2xl border border-violet-500/40 bg-violet-500/8 shadow-xl backdrop-blur-xl min-w-[210px] space-y-1.5">
      <Handle type="target" position={Position.Top} className="w-2.5 h-2.5 bg-violet-400 border-2 border-background" />

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <FileText className="h-4 w-4 text-violet-400" />
          <span className="font-bold text-foreground text-[11px]">{data.label}</span>
        </div>
        <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold uppercase bg-violet-500/20 text-violet-400 border border-violet-500/30">
          Output PDF
        </span>
      </div>

      <p className="text-[10px] text-muted-foreground line-clamp-1">{data.currentStep}</p>
    </div>
  );
}

export function ResourceNode({ data }: NodeProps) {
  return (
    <div className="relative group p-3 rounded-xl border border-border/50 bg-muted/40 shadow-sm min-w-[180px]">
      <Handle type="source" position={Position.Right} className="w-2 h-2 bg-muted-foreground" />
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-foreground">
        <Database className="h-3.5 w-3.5 text-primary" />
        <span>{data.label}</span>
      </div>
    </div>
  );
}
