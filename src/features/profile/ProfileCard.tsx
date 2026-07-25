'use client';

import React, { useEffect } from 'react';
import { Users } from 'lucide-react';

import { useAnalyticsStore } from '../../store/analyticsStore';
import { PageContainer } from '../../components/shared/PageContainer';
import { useUIStore } from '../../store/uiStore';

export function ProfileCard() {
  const { teamMembers } = useAnalyticsStore();
  const { setBreadcrumbs } = useUIStore();

  useEffect(() => {
    setBreadcrumbs([{ label: 'Profile', href: '/profile' }, { label: 'User & Team Role Matrix' }]);
  }, [setBreadcrumbs]);

  return (
    <PageContainer className="space-y-6 max-w-[1300px] mx-auto">
      {/* User Hero Card */}
      <div className="p-6 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 text-amber-950 shadow-xl font-bold text-xl font-mono">
            AM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-foreground">Alex Mercer</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/40">
                Super Admin
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Chief AI Officer · Enterprise AI Operating System</p>
            <span className="text-[11px] text-sky-400 font-mono block mt-1">alex.mercer@enterprise.ai</span>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="p-3 rounded-2xl bg-card border border-border/50 text-center">
            <span className="text-[10px] text-muted-foreground block font-sans">Role</span>
            <strong className="text-amber-400">Admin</strong>
          </div>
          <div className="p-3 rounded-2xl bg-card border border-border/50 text-center">
            <span className="text-[10px] text-muted-foreground block font-sans">Workspace</span>
            <strong className="text-primary">Production</strong>
          </div>
        </div>
      </div>

      {/* Team Member Role Permission Matrix */}
      <div className="p-6 rounded-3xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-border/40 pb-3">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-extrabold text-foreground">Team Members & Role Permission Matrix</h3>
          </div>
          <button className="px-3 py-1.5 rounded-xl bg-primary text-primary-foreground font-extrabold text-xs hover:bg-primary/90 transition-colors cursor-pointer">
            + Invite Team Member
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 border-b border-border/40 text-[10px] font-mono font-bold uppercase text-muted-foreground">
              <tr>
                <th className="p-3.5">Member Name</th>
                <th className="p-3.5">Email</th>
                <th className="p-3.5">Assigned Role</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 font-medium">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-muted/20 transition-colors">
                  <td className="p-3.5 font-bold text-foreground">{member.name}</td>
                  <td className="p-3.5 font-mono text-muted-foreground">{member.email}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono text-[10px] font-bold border border-primary/20">
                      {member.role}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
                      ✓ {member.status}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-muted-foreground">{member.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  );
}

export default ProfileCard;
