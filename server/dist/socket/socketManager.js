"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketManager = exports.SOCKET_EVENTS = void 0;
const socket_io_1 = require("socket.io");
const app_config_js_1 = require("../config/app.config.js");
const logger_js_1 = __importDefault(require("../logger/logger.js"));
exports.SOCKET_EVENTS = {
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
    TASK_ASSIGNED: 'task_assigned',
    // Workers
    WORKER_STATUS: 'worker_status',
    WORKER_LOG: 'worker_log',
    WORKER_COMPLETE: 'worker_complete',
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
};
class SocketManager {
    io = null;
    initialize(httpServer) {
        this.io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: app_config_js_1.appConfig.corsOrigin,
                methods: ['GET', 'POST'],
            },
            pingTimeout: 30000,
            pingInterval: 10000,
        });
        this.setupListeners();
        logger_js_1.default.info('[SocketManager] Socket.IO server initialized.');
    }
    setupListeners() {
        if (!this.io)
            return;
        this.io.on(exports.SOCKET_EVENTS.CONNECTION, (socket) => {
            logger_js_1.default.info(`[Socket] Client connected: ${socket.id}`);
            socket.emit(exports.SOCKET_EVENTS.HEARTBEAT, { ts: Date.now() });
            socket.on(exports.SOCKET_EVENTS.HEARTBEAT, () => {
                socket.emit(exports.SOCKET_EVENTS.HEARTBEAT, { ts: Date.now() });
            });
            socket.on(exports.SOCKET_EVENTS.DISCONNECT, (reason) => {
                logger_js_1.default.info(`[Socket] Client disconnected: ${socket.id} (${reason})`);
            });
        });
    }
    getIO() {
        if (!this.io)
            throw new Error('Socket.IO is not initialized. Call initialize() first.');
        return this.io;
    }
    emit(event, data) {
        if (!this.io)
            return;
        this.io.emit(event, data);
    }
    emitToRoom(room, event, data) {
        if (!this.io)
            return;
        this.io.to(room).emit(event, data);
    }
}
exports.socketManager = new SocketManager();
exports.default = exports.socketManager;
