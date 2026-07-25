import { Schema, model, Document, Types } from 'mongoose';

// ─── Workspace Model ────────────────────────────────────────────────────────
export interface IWorkspace extends Document {
  workspaceId: string;
  name: string;
  ownerId: Types.ObjectId;
  members: Types.ObjectId[];
  settings: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const workspaceSchema = new Schema<IWorkspace>(
  {
    workspaceId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    settings: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export const Workspace = model<IWorkspace>('Workspace', workspaceSchema);

// ─── Chat Session & Message Models ──────────────────────────────────────────
export interface IChatSession extends Document {
  sessionId: string;
  userId: Types.ObjectId;
  title: string;
  lastMessageSnippet?: string;
  status: 'active' | 'archived' | 'deleted';
  createdAt: Date;
  updatedAt: Date;
}

const chatSessionSchema = new Schema<IChatSession>(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, default: 'New Conversation' },
    lastMessageSnippet: String,
    status: { type: String, enum: ['active', 'archived', 'deleted'], default: 'active' },
  },
  { timestamps: true }
);

export const ChatSession = model<IChatSession>('ChatSession', chatSessionSchema);

export interface IChatMessage extends Document {
  messageId: string;
  sessionId: string;
  senderRole: 'user' | 'assistant' | 'system';
  senderName: string;
  content: string;
  attachments: Array<{ id: string; name: string; size: string; type: string; url?: string }>;
  tokensUsed?: number;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

const chatMessageSchema = new Schema<IChatMessage>(
  {
    messageId: { type: String, required: true, unique: true, index: true },
    sessionId: { type: String, required: true, index: true },
    senderRole: { type: String, enum: ['user', 'assistant', 'system'], required: true },
    senderName: { type: String, required: true },
    content: { type: String, required: true },
    attachments: [
      {
        id: String,
        name: String,
        size: String,
        type: { type: String },
        url: String,
        _id: false,
      },
    ],
    tokensUsed: Number,
    metadata: Schema.Types.Mixed,
  },
  { timestamps: true }
);

export const ChatMessage = model<IChatMessage>('ChatMessage', chatMessageSchema);

// ─── Task Item Model ────────────────────────────────────────────────────────
export interface ITaskItem extends Document {
  taskId: string;
  workflowId: string;
  executionId: string;
  department: string;
  taskName: string;
  description: string;
  priority: number;
  assignedWorkerId?: string;
  status: 'pending' | 'queued' | 'assigned' | 'running' | 'completed' | 'failed' | 'cancelled';
  dependencies: string[];
  estimatedDurationMs: number;
  actualDurationMs?: number;
  createdAt: Date;
  updatedAt: Date;
}

const taskItemSchema = new Schema<ITaskItem>(
  {
    taskId: { type: String, required: true, unique: true, index: true },
    workflowId: { type: String, required: true, index: true },
    executionId: { type: String, required: true, index: true },
    department: { type: String, required: true },
    taskName: { type: String, required: true },
    description: String,
    priority: { type: Number, default: 5 },
    assignedWorkerId: String,
    status: {
      type: String,
      enum: ['pending', 'queued', 'assigned', 'running', 'completed', 'failed', 'cancelled'],
      default: 'pending',
    },
    dependencies: [String],
    estimatedDurationMs: { type: Number, default: 30000 },
    actualDurationMs: Number,
  },
  { timestamps: true }
);

export const TaskItem = model<ITaskItem>('TaskItem', taskItemSchema);

// ─── Report Item Model ──────────────────────────────────────────────────────
export interface IReportItem extends Document {
  reportId: string;
  workflowId: string;
  title: string;
  summary: string;
  overallScore: number;
  departmentOutputs: Record<string, unknown>;
  recommendations: Array<{ category: string; title: string; description: string; impact: string }>;
  generatedBy: string;
  createdAt: Date;
}

const reportItemSchema = new Schema<IReportItem>(
  {
    reportId: { type: String, required: true, unique: true, index: true },
    workflowId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    overallScore: { type: Number, default: 95 },
    departmentOutputs: { type: Schema.Types.Mixed, required: true },
    recommendations: [
      {
        category: String,
        title: String,
        description: String,
        impact: String,
        _id: false,
      },
    ],
    generatedBy: { type: String, default: 'Gemini Report Generator AI' },
  },
  { timestamps: true }
);

export const ReportItem = model<IReportItem>('ReportItem', reportItemSchema);

// ─── Audit Log Model ────────────────────────────────────────────────────────
export interface IAuditLog extends Document {
  auditId: string;
  userId?: Types.ObjectId;
  action: string;
  module: string;
  ipAddress?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    auditId: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, required: true, index: true },
    module: { type: String, required: true, index: true },
    ipAddress: String,
    metadata: Schema.Types.Mixed,
  },
  { timestamps: true }
);

export const AuditLog = model<IAuditLog>('AuditLog', auditLogSchema);
