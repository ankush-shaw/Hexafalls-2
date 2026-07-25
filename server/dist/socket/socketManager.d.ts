import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
export declare const SOCKET_EVENTS: {
    readonly CONNECTION: "connection";
    readonly DISCONNECT: "disconnect";
    readonly HEARTBEAT: "heartbeat";
    readonly BOSS_STARTED: "boss_started";
    readonly BOSS_ANALYZING: "boss_analyzing";
    readonly BOSS_PLANNING: "boss_planning";
    readonly BOSS_THINKING: "boss_thinking";
    readonly BOSS_STEP: "boss_step";
    readonly BOSS_APPROVED: "boss_approved";
    readonly SUPERVISOR_STATUS: "supervisor_status";
    readonly TASK_ASSIGNED: "task_assigned";
    readonly WORKER_STATUS: "worker_status";
    readonly WORKER_LOG: "worker_log";
    readonly WORKER_COMPLETE: "worker_complete";
    readonly WORKFLOW_STARTED: "workflow_started";
    readonly WORKFLOW_FINISHED: "workflow_finished";
    readonly ANALYTICS_UPDATED: "analytics_updated";
    readonly NOTIFICATION_RECEIVED: "notification_received";
    readonly REPORT_STREAM: "report_stream";
    readonly REPORT_COMPLETE: "report_complete";
    readonly AUDIT_EVENT: "audit_event";
    readonly SYSTEM_HEALTH: "system_health";
};
declare class SocketManager {
    private io;
    initialize(httpServer: HttpServer): void;
    private setupListeners;
    getIO(): SocketIOServer;
    emit(event: string, data: unknown): void;
    emitToRoom(room: string, event: string, data: unknown): void;
}
export declare const socketManager: SocketManager;
export default socketManager;
