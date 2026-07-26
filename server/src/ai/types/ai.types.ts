export type AIModelType = 'gemini-1.5-flash' | 'gemini-1.5-pro' | 'gpt-4o' | 'claude-3.5-sonnet';

export interface AICompletionRequest {
  prompt: string;
  systemInstruction?: string;
  model?: AIModelType;
  temperature?: number;
  maxTokens?: number;
  workflowId?: string;
  conversationId?: string;
}

export interface AICompletionResponse {
  requestId: string;
  model: string;
  text: string;
  tokensUsed: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
  durationMs: number;
  confidence: number;
}

export interface ExecutiveReportData {
  reportId: string;
  workflowId: string;
  title: string;
  executiveSummary: string;
  overallScore: number;
  departmentSummaries: Record<string, { summary: string; score: number }>;
  riskAnalysis: {
    businessRisk: string;
    technicalRisk: string;
    level: 'low' | 'medium' | 'high';
  };
  recommendations: Array<{
    category: 'business' | 'technical' | 'operational';
    title: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
  }>;
  generatedBy: string;
  generatedAt: Date;
}
