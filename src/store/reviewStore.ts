import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  DepartmentReviewItem,
  ReviewValidationCheck,
  QualityAnalysis,
  RiskAnalysis,
  ExecutiveReport,
  ReportHistoryItem,
  ReviewStatus,
} from '../types/review.types';

interface ReviewState {
  workflowId: string;
  executionId: string;
  reviewStatus: ReviewStatus;
  departments: DepartmentReviewItem[];
  selectedDepartmentId: string | null;
  validationChecks: ReviewValidationCheck[];
  quality: QualityAnalysis;
  risk: RiskAnalysis;
  reportStreamStep: number; // 0 - 7 step streaming
  isGeneratingReport: boolean;
  activeReport: ExecutiveReport | null;
  reportHistory: ReportHistoryItem[];
  searchQuery: string;
  filterDepartment: string;
  filterIssueOnly: boolean;
  isHistoryDrawerOpen: boolean;
  isShareModalOpen: boolean;
}

interface ReviewActions {
  setSelectedDepartmentId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterDepartment: (dept: string) => void;
  setFilterIssueOnly: (issueOnly: boolean) => void;
  setIsHistoryDrawerOpen: (open: boolean) => void;
  setIsShareModalOpen: (open: boolean) => void;
  approveWorkflow: () => void;
  rejectWorkflow: () => void;
  revalidateWorkflow: () => void;
  generateGeminiReport: () => void;
  loadDemoReviewState: () => void;
}

type ReviewStore = ReviewState & ReviewActions;

const DEMO_DEPARTMENTS: DepartmentReviewItem[] = [
  {
    id: 'dept-ds',
    department: 'Data Science',
    workerName: 'Worker DS-Alpha',
    workerAvatar: 'from-purple-500 to-indigo-600',
    status: 'completed',
    executionTime: '00:45',
    confidenceScore: 96,
    summary: 'Extracted 14 pricing packages across 3 top competitor platforms with 99.2% scraping accuracy.',
    keyOutputs: ['14 Pricing Tiers Parsed', 'Feature Matrix CSV', 'Competitor Discount Mapping'],
    issuesFound: [],
    tasks: [
      {
        id: 't-1',
        title: 'Competitor Price Scraping & Feature Extraction',
        status: 'completed',
        duration: '45s',
        logs: [
          'Worker DS-Alpha initialized by Supervisor COO.',
          'Scraped 3 competitor endpoints cleanly.',
          'Exported formatted CSV deliverable payload.',
        ],
      },
    ],
  },
  {
    id: 'dept-fin',
    department: 'Finance',
    workerName: 'Worker Finance-Beta',
    workerAvatar: 'from-emerald-500 to-teal-600',
    status: 'completed',
    executionTime: '01:15',
    confidenceScore: 98,
    summary: 'Audit of Q4 income statements confirmed +4.2% YoY EBITDA margin expansion delta.',
    keyOutputs: ['Q4 Income Statement Audit', '+4.2% YoY Margin Delta', 'Ledger Integrity Verified'],
    issuesFound: [],
    tasks: [
      {
        id: 't-2',
        title: 'Q4 EBITDA & Income Statement Audit',
        status: 'completed',
        duration: '1m 15s',
        logs: [
          'Queried Internal Finance DB ledger accounts.',
          'Calculated gross margin and EBITDA expansion.',
          'Zero mathematical variance detected.',
        ],
      },
    ],
  },
  {
    id: 'dept-ops',
    department: 'Operations',
    workerName: 'Worker Ops-Delta',
    workerAvatar: 'from-sky-500 to-blue-600',
    status: 'completed',
    executionTime: '00:15',
    confidenceScore: 99,
    summary: 'Allocated 8 concurrent worker execution threads and established 15 req/s rate limits.',
    keyOutputs: ['8 Worker Threads Reserved', '15 req/s Rate Limit', 'Zero Lock Deadlocks'],
    issuesFound: [],
    tasks: [
      {
        id: 't-3',
        title: 'Thread Pool Scaling & Rate Limiting',
        status: 'completed',
        duration: '15s',
        logs: ['Allocated 8 worker threads cleanly.', 'Configured system rate-limiter bounds.'],
      },
    ],
  },
  {
    id: 'dept-leg',
    department: 'Legal',
    workerName: 'Worker Legal-Gamma',
    workerAvatar: 'from-amber-500 to-orange-600',
    status: 'completed',
    executionTime: '00:30',
    confidenceScore: 95,
    summary: 'Verified external data export compliance against GDPR and corporate governance policy.',
    keyOutputs: ['GDPR Export Check Passed', 'Data Anonymization Verified', 'Compliance Sign-off'],
    issuesFound: ['Notice: Retained raw CSV logs for 30-day compliance archive.'],
    tasks: [
      {
        id: 't-4',
        title: 'Legal Policy & Compliance Audit',
        status: 'completed',
        duration: '30s',
        logs: ['Verified corporate governance rules.', 'Audited data export anonymization.'],
      },
    ],
  },
];

const DEMO_CHECKS: ReviewValidationCheck[] = [
  { id: 'vc-1', title: 'Requirements Met', description: 'All core goals specified by Boss Agent CEO are fully addressed', passed: true, score: 100 },
  { id: 'vc-2', title: 'Dependencies Complete', description: 'Zero blocked or unfulfilled task prerequisite dependencies', passed: true, score: 100 },
  { id: 'vc-3', title: 'Output Complete', description: 'All deliverable CSV, matrix, and audit artifacts generated', passed: true, score: 98 },
  { id: 'vc-4', title: 'Data Validated', description: 'Cross-departmental calculations pass 7-point mathematical assertion', passed: true, score: 97 },
  { id: 'vc-5', title: 'No Missing Steps', description: 'Every stage in execution blueprint executed without truncation', passed: true, score: 100 },
  { id: 'vc-6', title: 'Quality Passed', description: 'Overall deliverables score >95% confidence threshold', passed: true, score: 96 },
];

const DEMO_REPORT: ExecutiveReport = {
  id: 'rep-q4-2026',
  workflowId: 'wf-q4-audit-8821',
  title: 'Executive AI Operating System Quarterly Strategy & Performance Report',
  generatedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  executiveSummary: 'Boss Agent CEO and Supervisor AI COO successfully executed the Q4 Strategic Enterprise Audit across Data Science, Finance, Operations, and Legal departments. The multi-agent workflow identified a +4.2% EBITDA margin expansion, mapped 14 competitor pricing packages, and passed 100% of corporate governance compliance audits with zero mathematical variances.',
  overallSuccessRate: 100,
  totalExecutionTime: '02:45',
  finalConfidence: 97.5,
  departments: [
    { name: 'Data Science', status: 'Completed', score: 96, deliverable: '14 Competitor Pricing Tiers CSV' },
    { name: 'Finance', status: 'Completed', score: 98, deliverable: 'Q4 Income Statement Audit' },
    { name: 'Operations', status: 'Completed', score: 99, deliverable: '8 Thread Pool Reservation' },
    { name: 'Legal', status: 'Completed', score: 95, deliverable: 'GDPR Data Compliance Sign-off' },
  ],
  timelineEvents: [
    { stage: 'Workflow Received', timestamp: '10:40:00 AM', status: 'Passed', description: 'Boss Agent CEO parsed strategic audit prompt.' },
    { stage: 'Supervisor Dispatched', timestamp: '10:41:00 AM', status: 'Passed', description: 'Supervisor COO created 4 worker execution threads.' },
    { stage: 'Workers Executed', timestamp: '10:42:30 AM', status: 'Passed', description: 'All specialized AI employees completed subtasks.' },
    { stage: 'CEO Review & Approval', timestamp: '10:43:10 AM', status: 'Passed', description: 'Boss Agent CEO validated all outputs with 97.5% confidence.' },
    { stage: 'Executive Report', timestamp: '10:43:25 AM', status: 'Passed', description: 'Gemini AI generated executive report payload.' },
  ],
  recommendations: [
    { id: 'rec-1', type: 'business', title: 'Leverage +4.2% EBITDA Margin for R&D Expansion', description: 'Allocate 60% of the Q4 margin expansion delta toward next-gen AI agent development.', impact: 'High' },
    { id: 'rec-2', type: 'technical', title: 'Scale Worker Thread Pool to 16 Concurrent Nodes', description: 'Increase dynamic worker thread pool bounds to reduce competitive scraping latency by 40%.', impact: 'Medium' },
    { id: 'rec-3', type: 'performance', title: 'Automate Legal Compliance Archiving', description: 'Implement automated 30-day encrypted cold storage for raw scraper logs.', impact: 'Low' },
  ],
  keyIssues: [],
};

const DEMO_HISTORY: ReportHistoryItem[] = [
  { id: 'rep-q4-2026', workflowId: 'wf-q4-audit-8821', title: 'Q4 Enterprise Strategy & Performance Audit', generatedAt: 'Today', successRate: 100, confidence: 97.5 },
  { id: 'rep-q3-2026', workflowId: 'wf-q3-audit-7412', title: 'Q3 Competitor & Pricing Analysis', generatedAt: 'Oct 14, 2026', successRate: 98, confidence: 95.0 },
];

export const useReviewStore = create<ReviewStore>()(
  devtools(
    persist(
      (set, get) => ({
        workflowId: 'wf-q4-audit-8821',
        executionId: 'exec-99410',
        reviewStatus: 'reviewing',
        departments: DEMO_DEPARTMENTS,
        selectedDepartmentId: 'dept-ds',
        validationChecks: DEMO_CHECKS,
        quality: {
          overallQuality: 97,
          accuracy: 99,
          completeness: 98,
          reliability: 96,
          consistency: 97,
          performance: 95,
        },
        risk: {
          businessRisk: 'Low',
          technicalRisk: 'Low',
          executionRisk: 'Low',
          remainingRisk: 'Low',
          recommendations: [
            'Maintain rate limiting on external scraper endpoints.',
            'Schedule monthly EBITDA margin assertion reviews.',
          ],
        },
        reportStreamStep: 0,
        isGeneratingReport: false,
        activeReport: DEMO_REPORT,
        reportHistory: DEMO_HISTORY,
        searchQuery: '',
        filterDepartment: 'All',
        filterIssueOnly: false,
        isHistoryDrawerOpen: false,
        isShareModalOpen: false,

        setSelectedDepartmentId: (id) => set({ selectedDepartmentId: id }),
        setSearchQuery: (query) => set({ searchQuery: query }),
        setFilterDepartment: (dept) => set({ filterDepartment: dept }),
        setFilterIssueOnly: (issueOnly) => set({ filterIssueOnly: issueOnly }),
        setIsHistoryDrawerOpen: (open) => set({ isHistoryDrawerOpen: open }),
        setIsShareModalOpen: (open) => set({ isShareModalOpen: open }),

        approveWorkflow: () => {
          set({ reviewStatus: 'approved' });
        },

        rejectWorkflow: () => {
          set({ reviewStatus: 'rejected' });
        },

        revalidateWorkflow: () => {
          set({ reviewStatus: 'validated' });
        },

        generateGeminiReport: () => {
          set({ isGeneratingReport: true, reportStreamStep: 1, reviewStatus: 'approved' });

          const interval = setInterval(() => {
            const currentStep = get().reportStreamStep;
            if (currentStep < 7) {
              set({ reportStreamStep: currentStep + 1 });
            } else {
              clearInterval(interval);
              set({ isGeneratingReport: false, activeReport: DEMO_REPORT });
            }
          }, 600);
        },

        loadDemoReviewState: () => {
          set({
            departments: DEMO_DEPARTMENTS,
            validationChecks: DEMO_CHECKS,
            activeReport: DEMO_REPORT,
            reviewStatus: 'approved',
          });
        },
      }),
      {
        name: 'aegisos-review-store',
        partialize: (state) => ({
          reviewStatus: state.reviewStatus,
          filterDepartment: state.filterDepartment,
        }),
      }
    ),
    { name: 'ReviewStore' }
  )
);
