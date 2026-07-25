"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_js_1 = __importDefault(require("./app.js"));
const app_config_js_1 = require("./config/app.config.js");
const connection_js_1 = require("./database/connection.js");
const redisManager_js_1 = require("./redis/redisManager.js");
const socketManager_js_1 = require("./socket/socketManager.js");
const logger_js_1 = __importDefault(require("./logger/logger.js"));
const server = http_1.default.createServer(app_js_1.default);
// Initialize Socket.IO on the HTTP server
socketManager_js_1.socketManager.initialize(server);
async function startServer() {
    // Connect MongoDB
    await connection_js_1.DatabaseManager.connect();
    // Connect Redis
    redisManager_js_1.redisManager.connect();
    server.listen(app_config_js_1.appConfig.port, () => {
        logger_js_1.default.info(`─────────────────────────────────────────────`);
        logger_js_1.default.info(`  AegisOS Backend Server`);
        logger_js_1.default.info(`  ENV:    ${app_config_js_1.appConfig.env}`);
        logger_js_1.default.info(`  PORT:   ${app_config_js_1.appConfig.port}`);
        logger_js_1.default.info(`  API:    http://localhost:${app_config_js_1.appConfig.port}${app_config_js_1.appConfig.apiPrefix}`);
        logger_js_1.default.info(`  Docs:   http://localhost:${app_config_js_1.appConfig.port}/api/docs`);
        logger_js_1.default.info(`  Health: http://localhost:${app_config_js_1.appConfig.port}/health`);
        logger_js_1.default.info(`─────────────────────────────────────────────`);
    });
}
// ─── Graceful Shutdown ─────────────────────────────────────────────────────────
const gracefulShutdown = async (signal) => {
    logger_js_1.default.warn(`[Server] Received ${signal}. Starting graceful shutdown...`);
    server.close(async () => {
        logger_js_1.default.info('[Server] HTTP server closed.');
        await connection_js_1.DatabaseManager.disconnect();
        await redisManager_js_1.redisManager.disconnect();
        logger_js_1.default.info('[Server] All connections closed. Exiting process.');
        process.exit(0);
    });
};
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('uncaughtException', (err) => {
    logger_js_1.default.error(`[Server] Uncaught Exception: ${err.message}`);
    process.exit(1);
});
process.on('unhandledRejection', (reason) => {
    logger_js_1.default.error(`[Server] Unhandled Rejection: ${reason}`);
    process.exit(1);
});
startServer();
