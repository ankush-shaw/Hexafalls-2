'use client';

import React from 'react';
import { CheckCircle2, RefreshCw, Sparkles } from 'lucide-react';

import { useReviewStore } from '../../store/reviewStore';

export function ApprovalPanel() {
  const {
    reviewStatus,
    approveWorkflow,
    revalidateWorkflow,
    generateGeminiReport,
    isGeneratingReport,
  } = useReviewStore();


  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-3xl border border-amber-500/40 bg-gradient-to-r from-card via-card to-amber-500/10 backdrop-blur-xl shadow-xl">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xs font-extrabold text-foreground">Boss Agent CEO Decision Center</h3>
          <p className="text-[10px] text-muted-foreground">Approve workflow deliverables to trigger Gemini AI Executive Report Generation</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        {reviewStatus !== 'approved' ? (
          <button
            onClick={approveWorkflow}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 text-emerald-950 font-extrabold text-xs hover:bg-emerald-400 transition-colors shadow-md cursor-pointer"
          >
            <CheckCircle2 className="h-4 w-4" /> Approve Workflow
          </button>
        ) : (
          <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-xs">
            ✓ Workflow Approved by CEO
          </span>
        )}

        <button
          onClick={revalidateWorkflow}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-border/50 bg-muted/40 text-muted-foreground font-bold text-xs hover:text-foreground hover:bg-muted cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Revalidate
        </button>

        <button
          onClick={generateGeminiReport}
          disabled={isGeneratingReport}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-primary-foreground font-extrabold text-xs hover:opacity-90 transition-all shadow-lg shadow-primary/25 cursor-pointer disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4 fill-current" />
          <span>{isGeneratingReport ? 'Generating Report...' : 'Generate Gemini Executive Report'}</span>
        </button>
      </div>
    </div>
  );
}

export default ApprovalPanel;
