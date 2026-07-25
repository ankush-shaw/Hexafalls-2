import { Schema, model, Document, Types } from 'mongoose';
import { WorkflowEngineState, WorkflowCheckpoint } from '../types/workflow.types.js';

// ─── Checkpoint Sub-Schema ──────────────────────────────────────────────────
const checkpointSchema = new Schema(
  {
    checkpointId: { type: String, required: true },
    workflowId: { type: String, required: true },
    executionId: { type: String, required: true },
    stepPosition: { type: Number, required: true },
    completedTaskIds: [String],
    queueState: Schema.Types.Mixed,
    progressPercent: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

// ─── Workflow Engine Master Document ────────────────────────────────────────
export interface IWorkflowEngineRecord extends Document {
  engineWorkflowId: string;
  bossWorkflowId: string;
  supervisorExecutionId?: string;
  conversationId: string;
  userId: Types.ObjectId;
  name: string;
  status: WorkflowEngineState;
  progressPercent: number;
  priority: number;
  executionStrategy: 'sequential' | 'parallel' | 'mixed' | 'conditional';
  completedTaskCount: number;
  totalTaskCount: number;
  retryCount: number;
  startedAt?: Date;
  completedAt?: Date;
  checkpoints: WorkflowCheckpoint[];
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const workflowEngineRecordSchema = new Schema<IWorkflowEngineRecord>(
  {
    engineWorkflowId: { type: String, required: true, unique: true, index: true },
    bossWorkflowId: { type: String, required: true, index: true },
    supervisorExecutionId: String,
    conversationId: { type: String, required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    status: {
      type: String,
      enum: [
        'created',
        'queued',
        'waiting',
        'running',
        'paused',
        'retrying',
        'recovering',
        'completed',
        'failed',
        'cancelled',
        'archived',
      ],
      default: 'created',
    },
    progressPercent: { type: Number, default: 0 },
    priority: { type: Number, default: 5 },
    executionStrategy: { type: String, default: 'mixed' },
    completedTaskCount: { type: Number, default: 0 },
    totalTaskCount: { type: Number, default: 0 },
    retryCount: { type: Number, default: 0 },
    startedAt: Date,
    completedAt: Date,
    checkpoints: [checkpointSchema],
    metadata: Schema.Types.Mixed,
  },
  { timestamps: true }
);

workflowEngineRecordSchema.index({ userId: 1, createdAt: -1 });

export const WorkflowEngineRecord = model<IWorkflowEngineRecord>(
  'WorkflowEngineRecord',
  workflowEngineRecordSchema
);

// ─── Workflow Metrics Document ──────────────────────────────────────────────
export interface IWorkflowMetricsRecord extends Document {
  date: string;
  totalExecutions: number;
  successCount: number;
  failedCount: number;
  avgDurationMs: number;
  createdAt: Date;
}

const workflowMetricsSchema = new Schema<IWorkflowMetricsRecord>(
  {
    date: { type: String, required: true, unique: true, index: true },
    totalExecutions: { type: Number, default: 0 },
    successCount: { type: Number, default: 0 },
    failedCount: { type: Number, default: 0 },
    avgDurationMs: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const WorkflowMetricsRecord = model<IWorkflowMetricsRecord>(
  'WorkflowMetricsRecord',
  workflowMetricsSchema
);
