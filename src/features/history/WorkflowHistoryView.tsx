'use client';

import React, { useEffect, useState } from 'react';
import { History, Search } from 'lucide-react';

import { useAnalyticsStore } from '../../store/analyticsStore';
import { PageContainer } from '../../components/shared/PageContainer';
import { useUIStore } from '../../store/uiStore';

export function WorkflowHistoryView() {
  const { auditLogs } = useAnalyticsStore();
  const [search, setSearch] = useState<string>('');
  const { setBreadcrumbs } = useUIStore();

  useEffect(() => {
    setBreadcrumbs([{ label: 'History', href: '/history' }, { label: 'Workflow & Audit Log Archive' }]);
  }, [setBreadcrumbs]);

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.actor.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageContainer className="space-y-6 max-w-[1500px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl border border-primary/30 bg-card/80 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
            <History className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-foreground">Workflow & Audit Trail Archive</h1>
            <p className="text-xs text-muted-foreground">Immutable historical record of Boss decisions, Supervisor orchestrations, and Worker process logs</p>
          </div>
        </div>

        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit logs..."
            className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-border/50 bg-card/80 text-xs font-medium text-foreground focus:outline-none focus:border-primary/50"
          />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-3xl border border-border/60 bg-card overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/40 border-b border-border/40 text-[10px] font-mono font-bold uppercase text-muted-foreground">
            <tr>
              <th className="p-4">Timestamp</th>
              <th className="p-4">Actor</th>
              <th className="p-4">Category</th>
              <th className="p-4">Action</th>
              <th className="p-4">Audit Details</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30 font-medium">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-muted/20 transition-colors">
                <td className="p-4 font-mono text-[10px] text-muted-foreground">{log.timestamp}</td>
                <td className="p-4 font-bold text-foreground">
                  {log.actor} <span className="text-[10px] font-normal text-muted-foreground">({log.actorRole})</span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 text-[9px] font-mono uppercase font-bold">
                    {log.category}
                  </span>
                </td>
                <td className="p-4 font-extrabold text-foreground">{log.action}</td>
                <td className="p-4 text-muted-foreground max-w-md truncate">{log.details}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono font-bold uppercase">
                    ✓ {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}

export default WorkflowHistoryView;
