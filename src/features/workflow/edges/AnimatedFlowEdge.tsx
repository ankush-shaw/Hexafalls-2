'use client';

import React from 'react';
import { BaseEdge, EdgeProps, getBezierPath } from '@xyflow/react';

export function AnimatedFlowEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const edgeTypeKey = typeof data?.edgeType === 'string' ? data.edgeType : 'task_assignment';
  const label = typeof data?.label === 'string' ? data.label : '';

  const edgeColors: Record<string, string> = {
    task_assignment: '#38bdf8', // Sky Blue
    dependency: '#f59e0b', // Amber
    communication: '#a855f7', // Purple
    validation: '#10b981', // Emerald
    completion: '#10b981',
    data_flow: '#38bdf8',
  };

  const strokeColor = edgeColors[edgeTypeKey] || '#38bdf8';


  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: strokeColor,
          strokeWidth: 2,
          opacity: 0.8,
          ...style,
        }}
      />

      {/* Animated Flowing Particle Circle */}
      <circle r="3.5" fill={strokeColor}>
        <animateMotion dur="2.5s" repeatCount="indefinite" path={edgePath} />
      </circle>

      {/* Optional Edge Label Pill */}
      {label && (
        <foreignObject
          width={140}
          height={24}
          x={labelX - 70}
          y={labelY - 12}
          className="overflow-visible pointer-events-none"
        >
          <div className="flex items-center justify-center h-full">
            <span className="px-2 py-0.5 rounded-full text-[8px] font-mono font-bold uppercase tracking-wider bg-card/90 border border-border/60 text-foreground/80 shadow-xs truncate">
              {label}
            </span>
          </div>
        </foreignObject>
      )}
    </>
  );
}

export default AnimatedFlowEdge;
