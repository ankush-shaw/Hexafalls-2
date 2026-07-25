'use client';

import React, { useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  NodeTypes,
  EdgeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { BossNode } from './nodes/BossNode';
import { SupervisorNode } from './nodes/SupervisorNode';
import { WorkerNode } from './nodes/WorkerNode';
import { ValidationNode, ReportNode, ResourceNode } from './nodes/ValidationNode';
import { AnimatedFlowEdge } from './edges/AnimatedFlowEdge';
import { useWorkflowStore } from '../../store/workflowStore';
import { cn } from '../../utils/cn';

interface WorkflowCanvasProps {
  className?: string;
}

export function WorkflowCanvas({ className }: WorkflowCanvasProps) {
  const { nodes, edges, setSelectedNodeId } = useWorkflowStore();

  const nodeTypes: NodeTypes = useMemo(
    () => ({
      bossNode: BossNode,
      supervisorNode: SupervisorNode,
      workerNode: WorkerNode,
      validationNode: ValidationNode,
      reportNode: ReportNode,
      resourceNode: ResourceNode,
    }),
    []
  );

  const edgeTypes: EdgeTypes = useMemo(
    () => ({
      animatedFlowEdge: AnimatedFlowEdge,
    }),
    []
  );

  return (
    <div className={cn('relative w-full h-[540px] rounded-3xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden', className)}>
      <ReactFlow
        nodes={nodes as unknown as Parameters<typeof ReactFlow>[0]['nodes']}
        edges={edges}



        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        onPaneClick={() => setSelectedNodeId(null)}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.5}
        maxZoom={1.5}
        colorMode="dark"
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="rgba(255,255,255,0.08)" />
        <Controls className="!bg-card/90 !border-border/60 !rounded-xl !shadow-md" />
        <MiniMap
          className="!bg-card/90 !border-border/60 !rounded-xl !shadow-md"
          nodeColor={(node) => {
            if (node.type === 'bossNode') return '#f59e0b';
            if (node.type === 'supervisorNode') return '#38bdf8';
            if (node.type === 'workerNode') return '#a855f7';
            if (node.type === 'validationNode') return '#10b981';
            return '#64748b';
          }}
          maskColor="rgba(0,0,0,0.6)"
        />
      </ReactFlow>
    </div>
  );
}

export default WorkflowCanvas;
