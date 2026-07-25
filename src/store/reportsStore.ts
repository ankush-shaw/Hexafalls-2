import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ReportItem {
  id: string;
  name: string;
  type: 'summary' | 'detailed' | 'audit' | 'workflow';
  status: 'generating' | 'ready' | 'failed';
  workflowId?: string;
  fileSize?: number;
  downloadUrl?: string;
  createdAt: string;
  createdBy: string;
}

interface ReportsState {
  reports: ReportItem[];
  selectedReportId: string | null;
  isLoading: boolean;
  error: string | null;
}

interface ReportsActions {
  setReports: (reports: ReportItem[]) => void;
  addReport: (report: ReportItem) => void;
  updateReportStatus: (id: string, update: Partial<Omit<ReportItem, 'id'>>) => void;
  removeReport: (id: string) => void;
  setSelectedReportId: (id: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

type ReportsStore = ReportsState & ReportsActions;

export const useReportsStore = create<ReportsStore>()(
  devtools(
    (set) => ({
      reports: [],
      selectedReportId: null,
      isLoading: false,
      error: null,

      setReports: (reports) => set({ reports }),
      addReport: (report) => set((state) => ({ reports: [report, ...state.reports] })),
      updateReportStatus: (id, update) =>
        set((state) => ({
          reports: state.reports.map((r) => (r.id === id ? { ...r, ...update } : r)),
        })),
      removeReport: (id) =>
        set((state) => ({
          reports: state.reports.filter((r) => r.id !== id),
          selectedReportId: state.selectedReportId === id ? null : state.selectedReportId,
        })),
      setSelectedReportId: (selectedReportId) => set({ selectedReportId }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    { name: 'ReportsStore' }
  )
);
