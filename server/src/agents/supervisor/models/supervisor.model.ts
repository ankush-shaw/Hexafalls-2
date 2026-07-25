import { Schema, model, Document, Types } from 'mongoose';
import {
  SupervisorStatus,
  TaskStatus,
  WorkerStatus,
  ExecutableTask,
  WorkerNode,
} from '../types/supervisor.types.js';

// ─── Subtask Schema ─────────────────────────────────────────────────────────
const subtaskSchema = new Schema(
  {
    subtaskId: { type: String, required: true },
    parentTaskId: { type: String, required: true },
    title: { type: String, required: true },
    executionOrder: { type: Number, required: true },
    status: { type: String, required: true, default: 'pending' },
    result: String,
    error: String,
  },
  { _id: false }
);

// ─── Executable Task Schema ──────────────────────────────────────────────────
const executableTaskSchema = new Schema(
  {
    taskId: { type: String, required: true },
    workflowId: { type: String, required: true },
    stageId: { type: String, required: true },
    department: { type: String, required: true },
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: Number, default: 5 },
    dependencies: [String],
    subtasks: [subtaskSchema],
    assignedWorkerId: String,
    status: { type: String, required: true, default: 'pending' },
    retryCount: { type: Number, default: 0 },
    maxRetries: { type: Number, default: 3 },
    estimatedDurationMs: { type: Number, default: 30000 },
    startedAt: Date,
    completedAt: Date,
    resultData: Schema.Types.Mixed,
    errorMessage: String,
  },
  { _id: false }
);

// ─── Worker Node Schema ─────────────────────────────────────────────────────
const workerNodeSchema = new Schema(
  {
    workerId: { type: String, required: true },
    workerName: { type: String, required: true },
    department: { type: String, required: true },
    capabilities: [String],
    status: { type: String, required: true, default: 'idle' },
    currentTaskId: String,
    completedTaskCount: { type: Number, default: 0 },
    failedTaskCount: { type: Number, default: 0 },
    lastHeartbeat: { type: Date, default: Date.now },
    cpuLoadPercent: { type: Number, default: 10 },
    memoryUsageMB: { type: Number, default: 128 },
  },
  { _id: false }
);

// ─── Supervisor Execution Document ──────────────────────────────────────────
export interface ISupervisorExecution extends Document {
  executionId: string;
  workflowId: string;
  conversationId: string;
  userId: Types.ObjectId;
  status: SupervisorStatus;
  progressPercent: number;
  tasks: ExecutableTask[];
  workers: WorkerNode[];
  startedAt: Date;
  completedAt?: Date;
  executionMode: 'sequential' | 'parallel' | 'mixed' | 'conditional';
  collectedResults?: Record<string, unknown>;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const supervisorExecutionSchema = new Schema<ISupervisorExecution>(
  {
    executionId: { type: String, required: true, unique: true, index: true },
    workflowId: { type: String, required: true, index: true },
    conversationId: { type: String, required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: [
        'idle',
        'receiving_workflow',
        'parsing',
        'generating_tasks',
        'scheduling',
        'assigning',
        'executing',
        'monitoring',
        'retrying',
        'collecting_results',
        'completed',
        'failed',
        'cancelled',
      ],
      default: 'idle',
    },
    progressPercent: { type: Number, default: 0 },
    tasks: [executableTaskSchema],
    workers: [workerNodeSchema],
    startedAt: { type: Date, default: Date.now },
    completedAt: Date,
    executionMode: { type: String, default: 'mixed' },
    collectedResults: Schema.Types.Mixed,
    errorMessage: String,
  },
  { timestamps: true }
);

supervisorExecutionSchema.index({ userId: 1, createdAt: -1 });

export const SupervisorExecution = model<ISupervisorExecution>('SupervisorExecution', supervisorExecutionSchema);
