import { Schema, model, Document } from 'mongoose';
import { WorkerRuntimeState, WorkerHealthState } from '../types/worker.types.js';

// ─── Worker Agent Model ──────────────────────────────────────────────────────
export interface IWorkerAgent extends Document {
  workerId: string;
  executionId: string;
  department: string;
  capabilities: string[];
  currentTaskId?: string;
  status: WorkerRuntimeState;
  health: WorkerHealthState;
  priority: number;
  currentStep: number;
  progressPercent: number;
  lastHeartbeat: Date;
  startedTime?: Date;
  finishedTime?: Date;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const workerAgentSchema = new Schema<IWorkerAgent>(
  {
    workerId: { type: String, required: true, unique: true, index: true },
    executionId: { type: String, required: true, index: true },
    department: { type: String, required: true },
    capabilities: [String],
    currentTaskId: String,
    status: {
      type: String,
      enum: [
        'created',
        'initialized',
        'ready',
        'assigned',
        'planning',
        'executing',
        'validating',
        'completed',
        'failed',
        'retrying',
        'destroyed',
      ],
      default: 'created',
    },
    health: {
      type: String,
      enum: ['healthy', 'busy', 'waiting', 'failed', 'retrying', 'stopped', 'offline'],
      default: 'healthy',
    },
    priority: { type: Number, default: 5 },
    currentStep: { type: Number, default: 0 },
    progressPercent: { type: Number, default: 0 },
    lastHeartbeat: { type: Date, default: Date.now },
    startedTime: Date,
    finishedTime: Date,
    metadata: Schema.Types.Mixed,
  },
  { timestamps: true }
);

workerAgentSchema.index({ executionId: 1, status: 1 });

export const WorkerAgent = model<IWorkerAgent>('WorkerAgent', workerAgentSchema);

// ─── Worker Result Model ──────────────────────────────────────────────────────
export interface IWorkerResult extends Document {
  taskId: string;
  workerId: string;
  executionId: string;
  status: 'completed' | 'failed';
  summary: string;
  output: Record<string, unknown>;
  confidence: number;
  executionTimeMs: number;
  logs: string[];
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

const workerResultSchema = new Schema<IWorkerResult>(
  {
    taskId: { type: String, required: true, index: true },
    workerId: { type: String, required: true, index: true },
    executionId: { type: String, required: true, index: true },
    status: { type: String, required: true },
    summary: { type: String, required: true },
    output: { type: Schema.Types.Mixed, required: true },
    confidence: { type: Number, default: 0.95 },
    executionTimeMs: { type: Number, required: true },
    logs: [String],
    metadata: Schema.Types.Mixed,
  },
  { timestamps: true }
);

export const WorkerResult = model<IWorkerResult>('WorkerResult', workerResultSchema);

// ─── Worker Log Model ────────────────────────────────────────────────────────
export interface IWorkerLog extends Document {
  workerId: string;
  taskId?: string;
  executionId: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  step?: number;
  timestamp: Date;
}

const workerLogSchema = new Schema<IWorkerLog>(
  {
    workerId: { type: String, required: true, index: true },
    taskId: String,
    executionId: { type: String, required: true, index: true },
    level: { type: String, enum: ['info', 'warn', 'error'], default: 'info' },
    message: { type: String, required: true },
    step: Number,
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const WorkerLog = model<IWorkerLog>('WorkerLog', workerLogSchema);
