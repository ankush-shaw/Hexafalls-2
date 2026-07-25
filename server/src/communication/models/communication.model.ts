import { Schema, model, Document } from 'mongoose';
import { EventSource, EventTarget } from '../types/communication.types.js';

// ─── Event Log Document ─────────────────────────────────────────────────────
export interface IEventLogRecord extends Document {
  eventId: string;
  eventName: string;
  source: EventSource;
  target: EventTarget;
  workflowId?: string;
  executionId?: string;
  priority: number;
  payload: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  version: string;
  timestamp: Date;
}

const eventLogSchema = new Schema<IEventLogRecord>(
  {
    eventId: { type: String, required: true, unique: true, index: true },
    eventName: { type: String, required: true, index: true },
    source: { type: String, required: true },
    target: { type: String, required: true },
    workflowId: { type: String, index: true },
    executionId: { type: String, index: true },
    priority: { type: Number, default: 5 },
    payload: { type: Schema.Types.Mixed, required: true },
    metadata: Schema.Types.Mixed,
    version: { type: String, default: '1.0' },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const EventLogRecord = model<IEventLogRecord>('EventLogRecord', eventLogSchema);

// ─── Notification Document ──────────────────────────────────────────────────
export interface INotificationRecord extends Document {
  notificationId: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  workflowId?: string;
  read: boolean;
  createdAt: Date;
}

const notificationSchema = new Schema<INotificationRecord>(
  {
    notificationId: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['info', 'success', 'warning', 'error'], default: 'info' },
    workflowId: String,
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const NotificationRecord = model<INotificationRecord>('NotificationRecord', notificationSchema);

// ─── Presence Document ──────────────────────────────────────────────────────
export interface IPresenceRecord extends Document {
  agentId: string;
  type: 'boss' | 'supervisor' | 'worker' | 'user';
  status: 'online' | 'busy' | 'idle' | 'offline';
  lastHeartbeat: Date;
  metadata?: Record<string, unknown>;
}

const presenceSchema = new Schema<IPresenceRecord>(
  {
    agentId: { type: String, required: true, unique: true, index: true },
    type: { type: String, required: true },
    status: { type: String, required: true, default: 'online' },
    lastHeartbeat: { type: Date, default: Date.now },
    metadata: Schema.Types.Mixed,
  },
  { timestamps: true }
);

export const PresenceRecord = model<IPresenceRecord>('PresenceRecord', presenceSchema);
