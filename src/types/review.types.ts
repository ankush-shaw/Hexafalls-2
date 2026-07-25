export type ReviewStatus = 'pending' | 'reviewing' | 'validated' | 'approved' | 'rejected' | 'needs_retry';

export type DepartmentType =
  | 'Data Science'
  | 'Finance'
  | 'Legal'
  | 'Operations'
  | 'Marketing'
  | 'Technical'
  | 'Sales'
  | 'Support';

export interface DepartmentReviewItem {
  id: string;
  department: DepartmentType;
  workerName: string;
  workerAvatar: string;
  status: 'completed' | 'failed' | 'retrying' | 'pending';
  executionTime: string;
  confidenceScore: number;
  summary: string;
  keyOutputs: string[];
  issuesFound: string[];
  tasks: {
    id: string;
    title: string;
    status: string;
    duration: string;
    logs: string[];
  }[];
}

export interface ReviewValidationCheck {
  id: string;
  title: string;
  description: string;
  passed: boolean;
  score: number;
}

export interface QualityAnalysis {
  overallQuality: number;
  accuracy: number;
  completeness: number;
  reliability: number;
  consistency: number;
  performance: number;
}

export interface RiskAnalysis {
  businessRisk: 'Low' | 'Medium' | 'High';
  technicalRisk: 'Low' | 'Medium' | 'High';
  executionRisk: 'Low' | 'Medium' | 'High';
  remainingRisk: 'Low' | 'Medium' | 'High';
  recommendations: string[];
}

export interface GeminiRecommendation {
  id: string;
  type: 'business' | 'technical' | 'performance';
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface ExecutiveReport {
  id: string;
  workflowId: string;
  title: string;
  generatedAt: string;
  executiveSummary: string;
  overallSuccessRate: number;
  totalExecutionTime: string;
  finalConfidence: number;
  departments: {
    name: string;
    status: string;
    score: number;
    deliverable: string;
  }[];
  timelineEvents: {
    stage: string;
    timestamp: string;
    status: string;
    description: string;
  }[];
  recommendations: GeminiRecommendation[];
  keyIssues: string[];
}

export interface ReportHistoryItem {
  id: string;
  workflowId: string;
  title: string;
  generatedAt: string;
  successRate: number;
  confidence: number;
}
