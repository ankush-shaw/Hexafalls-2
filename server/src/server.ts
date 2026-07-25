import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { appConfig } from './config/app.config.js';
import { DatabaseManager } from './database/connection.js';
import { redisManager } from './redis/redisManager.js';
import { socketManager } from './socket/socketManager.js';
import logger from './logger/logger.js';

const server = http.createServer(app);

// Initialize Socket.IO on the HTTP server
socketManager.initialize(server);

async function startServer(): Promise<void> {
  // Connect MongoDB
  await DatabaseManager.connect();

  // Connect Redis
  redisManager.connect();

  server.listen(appConfig.port, () => {
    logger.info(`─────────────────────────────────────────────`);
    logger.info(`  AegisOS Backend Server`);
    logger.info(`  ENV:    ${appConfig.env}`);
    logger.info(`  PORT:   ${appConfig.port}`);
    logger.info(`  API:    http://localhost:${appConfig.port}${appConfig.apiPrefix}`);
    logger.info(`  Docs:   http://localhost:${appConfig.port}/api/docs`);
    logger.info(`  Health: http://localhost:${appConfig.port}/health`);
    logger.info(`─────────────────────────────────────────────`);
  });
}

// ─── Graceful Shutdown ─────────────────────────────────────────────────────────
const gracefulShutdown = async (signal: string): Promise<void> => {
  logger.warn(`[Server] Received ${signal}. Starting graceful shutdown...`);

  server.close(async () => {
    logger.info('[Server] HTTP server closed.');
    await DatabaseManager.disconnect();
    await redisManager.disconnect();
    logger.info('[Server] All connections closed. Exiting process.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT',  () => gracefulShutdown('SIGINT'));

process.on('uncaughtException', (err) => {
  logger.error(`[Server] Uncaught Exception: ${err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error(`[Server] Unhandled Rejection: ${reason}`);
  process.exit(1);
});

startServer();
