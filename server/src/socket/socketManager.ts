import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { appConfig } from '../config/app.config.js';
import logger from '../logger/logger.js';

export const SOCKET_EVENTS = {
  // Connection
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  HEARTBEAT: 'heartbeat',
  // Boss Agent
  BOSS_STARTED: 'boss_started',
  BOSS_ANALYZING: 'boss_analyzing',
  BOSS_PLANNING: 'boss_planning',
  BOSS_THINKING: 'boss_thinking',
  BOSS_STEP: 'boss_step',
  BOSS_APPROVED: 'boss_approved',

  // Supervisor
  SUPERVISOR_STATUS: 'supervisor_status',
  WORKFLOW_RECEIVED: 'workflow_received',
  WORKER_ASSIGNED: 'worker_assigned',
  TASK_STARTED: 'task_started',
  TASK_COMPLETED: 'task_completed',
  TASK_FAILED: 'task_failed',
  EXECUTION_COMPLETED: 'execution_completed',
  RETRY_STARTED: 'retry_started',

  // Workers
  WORKER_CREATED: 'worker_created',
  WORKER_READY: 'worker_ready',
  WORKER_STARTED: 'worker_started',
  WORKER_PROGRESS: 'worker_progress',
  WORKER_STATUS: 'worker_status',
  WORKER_LOG: 'worker_log',
  WORKER_COMPLETE: 'worker_complete',
  WORKER_COMPLETED: 'worker_completed',
  WORKER_FAILED: 'worker_failed',
  WORKER_DESTROYED: 'worker_destroyed',

  // Workflow
  WORKFLOW_STARTED: 'workflow_started',
  WORKFLOW_FINISHED: 'workflow_finished',
  ANALYTICS_UPDATED: 'analytics_updated',
  // Notifications
  NOTIFICATION_RECEIVED: 'notification_received',
  // Reports
  REPORT_STREAM: 'report_stream',
  REPORT_COMPLETE: 'report_complete',
  // Audit
  AUDIT_EVENT: 'audit_event',
  // System
  SYSTEM_HEALTH: 'system_health',
} as const;

class SocketManager {
  private io: SocketIOServer | null = null;

  public initialize(httpServer: HttpServer): void {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: appConfig.corsOrigin,
        methods: ['GET', 'POST'],
      },
      pingTimeout: 30000,
      pingInterval: 10000,
    });

    this.setupListeners();
    logger.info('[SocketManager] Socket.IO server initialized.');
  }

  private setupListeners(): void {
    if (!this.io) return;

    this.io.on(SOCKET_EVENTS.CONNECTION, (socket: Socket) => {
      logger.info(`[Socket] Client connected: ${socket.id}`);

      socket.emit(SOCKET_EVENTS.HEARTBEAT, { ts: Date.now() });

      socket.on(SOCKET_EVENTS.HEARTBEAT, () => {
        socket.emit(SOCKET_EVENTS.HEARTBEAT, { ts: Date.now() });
      });

      socket.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
        logger.info(`[Socket] Client disconnected: ${socket.id} (${reason})`);
      });
    });
  }

  public getIO(): SocketIOServer {
    if (!this.io) throw new Error('Socket.IO is not initialized. Call initialize() first.');
    return this.io;
  }

  public emit(event: string, data: unknown): void {
    if (!this.io) return;
    this.io.emit(event, data);
  }

  public emitToRoom(room: string, event: string, data: unknown): void {
    if (!this.io) return;
    this.io.to(room).emit(event, data);
  }
}

export const socketManager = new SocketManager();
export default socketManager;
