'use client';

import React from 'react';
import { Download, FileText, Code, Table, Printer, Share2, Copy } from 'lucide-react';
import { useReviewStore } from '../../store/reviewStore';

export function DownloadCenter() {
  const { activeReport, setIsShareModalOpen } = useReviewStore();

  const handleCopySummary = () => {
    if (activeReport) {
      navigator.clipboard.writeText(activeReport.executiveSummary);
      alert('Executive Summary copied to clipboard!');
    }
  };

  const handleDownload = (format: string) => {
    if (!activeReport) return;
    const content = JSON.stringify(activeReport, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `executive-report-${activeReport.workflowId}.${format.toLowerCase()}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-4 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <Download className="h-4 w-4 text-primary" />
        <span className="text-xs font-extrabold text-foreground">Executive Report Download & Share Center</span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
        <button
          onClick={() => handleDownload('pdf')}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
        >
          <FileText className="h-3.5 w-3.5" /> PDF Report
        </button>

        <button
          onClick={() => handleDownload('json')}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border/50 bg-card hover:bg-muted text-foreground transition-colors cursor-pointer"
        >
          <Code className="h-3.5 w-3.5" /> JSON Data
        </button>

        <button
          onClick={() => handleDownload('csv')}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border/50 bg-card hover:bg-muted text-foreground transition-colors cursor-pointer"
        >
          <Table className="h-3.5 w-3.5" /> CSV Deliverables
        </button>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border/50 bg-card hover:bg-muted text-foreground transition-colors cursor-pointer"
        >
          <Printer className="h-3.5 w-3.5" /> Print
        </button>

        <button
          onClick={() => setIsShareModalOpen(true)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
        >
          <Share2 className="h-3.5 w-3.5" /> Share Report
        </button>

        <button
          onClick={handleCopySummary}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border/50 bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <Copy className="h-3.5 w-3.5" /> Copy Summary
        </button>
      </div>
    </div>
  );
}

export default DownloadCenter;
