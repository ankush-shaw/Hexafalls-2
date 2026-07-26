import { Schema, model, Document } from 'mongoose';
import { ExecutiveReportData } from '../types/ai.types.js';

// ─── AI Request Audit Document ──────────────────────────────────────────────
export interface IAIRequestRecord extends Document {
  requestId: string;
  workflowId?: string;
  conversationId?: string;
  aiModel: string;
  prompt: string;
  responseText: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  durationMs: number;
  createdAt: Date;
}

const aiRequestRecordSchema = new Schema<IAIRequestRecord>(
  {
    requestId: { type: String, required: true, unique: true, index: true },
    workflowId: { type: String, index: true },
    conversationId: { type: String, index: true },
    aiModel: { type: String, required: true },
    prompt: { type: String, required: true },
    responseText: { type: String, required: true },
    inputTokens: { type: Number, default: 0 },
    outputTokens: { type: Number, default: 0 },
    totalTokens: { type: Number, default: 0 },
    durationMs: { type: Number, required: true },
  },
  { timestamps: true }
);


export const AIRequestRecord = model<IAIRequestRecord>('AIRequestRecord', aiRequestRecordSchema);

// ─── Executive Report Document ─────────────────────────────────────────────
export interface IExecutiveReportRecord extends Document, ExecutiveReportData {}

const executiveReportRecordSchema = new Schema<IExecutiveReportRecord>(
  {
    reportId: { type: String, required: true, unique: true, index: true },
    workflowId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    executiveSummary: { type: String, required: true },
    overallScore: { type: Number, default: 95 },
    departmentSummaries: Schema.Types.Mixed,
    riskAnalysis: {
      businessRisk: String,
      technicalRisk: String,
      level: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    },
    recommendations: [
      {
        category: { type: String, enum: ['business', 'technical', 'operational'] },
        title: String,
        description: String,
        impact: { type: String, enum: ['high', 'medium', 'low'] },
        _id: false,
      },
    ],
    generatedBy: { type: String, default: 'Gemini 1.5 Pro AI Engine' },
    generatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const ExecutiveReportRecord = model<IExecutiveReportRecord>(
  'ExecutiveReportRecord',
  executiveReportRecordSchema
);
