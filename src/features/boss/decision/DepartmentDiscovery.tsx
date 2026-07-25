'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Link2 } from 'lucide-react';
import { SectionHeader } from '../intelligence/SectionHeader';
import { WorkflowNodePreview } from '../../../types/boss.types';
import { cn } from '../../../utils/cn';

interface DepartmentDiscoveryProps {
  nodes?: WorkflowNodePreview[];
  className?: string;
}

export function DepartmentDiscovery({ nodes = [], className }: DepartmentDiscoveryProps) {
  const deptNodes = nodes.filter((n) => n.type === 'department');

  if (deptNodes.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-6 rounded-3xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-xl space-y-4', className)}
    >
      <SectionHeader
        icon={Building2}
        title="Department Discovery & Workload Breakdown"
        description="Every business department identified by Boss CEO with purpose and workload metrics"
        badge={`${deptNodes.length} Departments`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {deptNodes.map((dept, idx) => (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.06 }}
            className="p-4 rounded-2xl border border-border/60 bg-card/60 hover:border-primary/40 transition-all space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                  <Building2 className="h-4 w-4" />
                </div>
                <h4 className="text-xs font-bold text-foreground truncate">{dept.name}</h4>
              </div>

              <span className="px-2 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-primary/10 border border-primary/20 text-primary">
                {dept.priority}
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">{dept.purpose}</p>

            <div className="space-y-1 pt-1 border-t border-border/30 text-[11px]">
              <div className="flex justify-between text-muted-foreground text-[10px] font-mono">
                <span>Estimated Workload</span>
                <span className="font-bold text-foreground">{dept.estimatedWorkload}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${dept.estimatedWorkload}%` }} />
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1">
              <span className="flex items-center gap-1">
                <Link2 className="h-3 w-3" /> Dep: {dept.dependencies.join(', ') || 'None'}
              </span>
              <span className="font-mono text-emerald-400 font-bold">{dept.confidence}% Conf.</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default DepartmentDiscovery;
