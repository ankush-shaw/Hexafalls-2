'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Building2, Lightbulb, FileText } from 'lucide-react';
import { DownloadCenter } from './DownloadCenter';
import { useReviewStore } from '../../store/reviewStore';


export function ExecutiveReportView() {
  const { activeReport } = useReviewStore();

  if (!activeReport) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 rounded-3xl border border-primary/30 bg-card/90 backdrop-blur-2xl shadow-2xl space-y-8 max-w-[1400px] mx-auto"
    >
      {/* Top Header & Download Center */}
      <div className="space-y-4 border-b border-border/40 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-primary via-purple-600 to-amber-500 text-white shadow-xl">
              <Sparkles className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Gemini Verified Report
                </span>
                <span className="text-xs font-mono text-muted-foreground">{activeReport.generatedAt}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">{activeReport.title}</h2>
              <p className="text-xs text-muted-foreground font-mono">Workflow ID: {activeReport.workflowId}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-right">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono">
              <span className="text-[10px] text-muted-foreground block uppercase font-sans">Success Rate</span>
              <strong className="text-xl">{activeReport.overallSuccessRate}%</strong>
            </div>
            <div className="p-3 rounded-2xl bg-violet-500/10 border border-violet-500/30 text-violet-400 font-mono">
              <span className="text-[10px] text-muted-foreground block uppercase font-sans">Final Confidence</span>
              <strong className="text-xl">{activeReport.finalConfidence}%</strong>
            </div>
          </div>
        </div>

        <DownloadCenter />
      </div>

      {/* Hero Executive Summary Card */}
      <div className="p-6 rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/10 via-card to-card space-y-2 shadow-xl">
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
          <FileText className="h-4 w-4" /> Executive CEO Summary
        </span>
        <p className="text-sm font-semibold text-foreground/95 leading-relaxed">{activeReport.executiveSummary}</p>
      </div>

      {/* Department Performance Table */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Building2 className="h-4 w-4 text-primary" /> Departmental Deliverables & Audit Scores
        </h3>
        <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 border-b border-border/40 text-[10px] font-mono font-bold uppercase text-muted-foreground">
              <tr>
                <th className="p-3.5">Department</th>
                <th className="p-3.5">Audit Status</th>
                <th className="p-3.5">Score</th>
                <th className="p-3.5">Primary Deliverable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 font-medium">
              {activeReport.departments.map((dept, idx) => (
                <tr key={idx} className="hover:bg-muted/20 transition-colors">
                  <td className="p-3.5 font-bold text-foreground">{dept.name}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
                      ✓ {dept.status}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-sky-400">{dept.score}%</td>
                  <td className="p-3.5 text-muted-foreground">{dept.deliverable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Execution Timeline */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Clock className="h-4 w-4 text-amber-400" /> End-to-End Execution Timeline
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
          {activeReport.timelineEvents.map((evt, i) => (
            <div key={i} className="p-3 rounded-2xl border border-border/40 bg-muted/20 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                <span>{evt.timestamp}</span>
                <span className="text-emerald-400 font-bold">✓</span>
              </div>
              <h4 className="font-bold text-foreground leading-snug">{evt.stage}</h4>
              <p className="text-[10px] text-muted-foreground line-clamp-2">{evt.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gemini AI Strategic Recommendations */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-400" /> Gemini AI Strategic Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {activeReport.recommendations.map((rec) => (
            <div key={rec.id} className="p-4 rounded-2xl border border-border/60 bg-card/80 space-y-2 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-primary/10 text-primary border border-primary/20 font-bold">
                  {rec.type}
                </span>
                <span className="text-[10px] font-mono text-amber-400 font-bold">Impact: {rec.impact}</span>
              </div>
              <h4 className="font-extrabold text-foreground">{rec.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{rec.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default ExecutiveReportView;
