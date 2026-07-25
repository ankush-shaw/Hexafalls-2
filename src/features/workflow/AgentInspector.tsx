'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot } from 'lucide-react';
import { useWorkflowStore } from '../../store/workflowStore';


export function AgentInspector() {
  const { nodes, selectedNodeId, setSelectedNodeId } = useWorkflowStore();

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  if (!selectedNode) return null;

  const data = selectedNode.data;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedNodeId(null)}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-lg bg-card border-l border-border/60 shadow-2xl h-full flex flex-col z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/40 bg-card/60">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-foreground">{data.label}</h3>
                <p className="text-xs text-muted-foreground uppercase font-mono tracking-wider">{data.nodeType} Node · Latency: {data.latencyMs}ms</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedNodeId(null)}
              className="p-2 rounded-xl border border-border/50 bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Task Info */}
            <div className="p-4 rounded-2xl border border-primary/30 bg-primary/5 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Assigned Task / Operation</span>
              <h4 className="text-sm font-bold text-foreground">{data.assignedTaskName || 'Core Agent Orchestration'}</h4>
              <p className="text-xs text-muted-foreground pt-0.5">{data.currentStep}</p>
            </div>

            {/* Progress */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted-foreground">Execution Progress</span>
                <span className="font-bold text-foreground">{data.progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${data.progress}%` }} />
              </div>
            </div>

            {/* Hardware Metrics */}
            {data.metrics && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Simulated Node Hardware Metrics</span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl border border-border/40 bg-muted/20">
                    <span className="text-[9px] text-muted-foreground">CPU Usage</span>
                    <p className="font-mono font-bold text-sky-400">{data.metrics.cpuUsage}%</p>
                  </div>
                  <div className="p-2.5 rounded-xl border border-border/40 bg-muted/20">
                    <span className="text-[9px] text-muted-foreground">Memory</span>
                    <p className="font-mono font-bold text-foreground">{data.metrics.memoryUsage}</p>
                  </div>
                  <div className="p-2.5 rounded-xl border border-border/40 bg-muted/20">
                    <span className="text-[9px] text-muted-foreground">LLM Tokens</span>
                    <p className="font-mono font-bold text-amber-400">{data.metrics.tokensUsed.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Subtasks */}
            {data.subtasks && data.subtasks.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Subtask Execution Breakdown</span>
                <div className="space-y-1.5 text-xs">
                  {data.subtasks.map((st) => (
                    <div key={st.id} className="p-2.5 rounded-xl border border-border/40 bg-muted/20 flex items-center justify-between">
                      <span className="font-medium text-foreground">{st.title}</span>
                      <span className="px-2 py-0.2 rounded text-[9px] font-mono uppercase bg-primary/10 text-primary border border-primary/20 font-bold">
                        {st.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Node Logs */}
            {data.logs && data.logs.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Node Logs</span>
                <div className="p-3 rounded-xl border border-border/60 bg-black/80 font-mono text-[11px] text-slate-300 space-y-1">
                  {data.logs.map((lg, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-slate-500">[{lg.timestamp}]</span>
                      <span className="text-slate-200">{lg.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default AgentInspector;
