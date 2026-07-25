"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.system = exports.ready = exports.live = exports.health = void 0;
const connection_js_1 = require("../database/connection.js");
const redisManager_js_1 = require("../redis/redisManager.js");
const apiResponse_js_1 = require("../utils/apiResponse.js");
const asyncHandler_js_1 = require("../utils/asyncHandler.js");
/**
 * @openapi
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: General health check
 */
exports.health = (0, asyncHandler_js_1.asyncHandler)(async (_req, res) => {
    const db = connection_js_1.DatabaseManager.getHealth();
    const redis = redisManager_js_1.redisManager.getHealth();
    apiResponse_js_1.ApiResponse.success(res, 'System healthy.', {
        status: 'healthy',
        services: {
            database: db,
            redis: redis,
        },
    });
});
/**
 * @openapi
 * /live:
 *   get:
 *     tags: [Health]
 *     summary: Liveness check - is the process alive?
 */
const live = (_req, res) => {
    res.status(200).json({ status: 'alive', timestamp: new Date().toISOString() });
};
exports.live = live;
/**
 * @openapi
 * /ready:
 *   get:
 *     tags: [Health]
 *     summary: Readiness check - is the server ready to serve traffic?
 */
const ready = (_req, res) => {
    const db = connection_js_1.DatabaseManager.getHealth();
    if (db.status !== 'healthy') {
        res.status(503).json({ status: 'not_ready', reason: 'Database not connected', timestamp: new Date().toISOString() });
        return;
    }
    res.status(200).json({ status: 'ready', timestamp: new Date().toISOString() });
};
exports.ready = ready;
/**
 * @openapi
 * /system:
 *   get:
 *     tags: [Health]
 *     summary: Full system telemetry
 */
exports.system = (0, asyncHandler_js_1.asyncHandler)(async (_req, res) => {
    const db = connection_js_1.DatabaseManager.getHealth();
    const redis = redisManager_js_1.redisManager.getHealth();
    apiResponse_js_1.ApiResponse.success(res, 'System telemetry retrieved.', {
        process: {
            uptime: process.uptime(),
            memoryMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
            nodeVersion: process.version,
        },
        services: {
            database: db,
            redis: redis,
        },
    });
});
