import { Request, Response } from 'express';
import { DatabaseManager } from '../database/connection.js';
import { redisManager } from '../redis/redisManager.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @openapi
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: General health check
 */
export const health = asyncHandler(async (_req: Request, res: Response) => {
  const db = DatabaseManager.getHealth();
  const redis = redisManager.getHealth();

  ApiResponse.success(res, 'System healthy.', {
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
export const live = (_req: Request, res: Response): void => {
  res.status(200).json({ status: 'alive', timestamp: new Date().toISOString() });
};

/**
 * @openapi
 * /ready:
 *   get:
 *     tags: [Health]
 *     summary: Readiness check - is the server ready to serve traffic?
 */
export const ready = (_req: Request, res: Response): void => {
  const db = DatabaseManager.getHealth();
  if (db.status !== 'healthy') {
    res.status(503).json({ status: 'not_ready', reason: 'Database not connected', timestamp: new Date().toISOString() });
    return;
  }
  res.status(200).json({ status: 'ready', timestamp: new Date().toISOString() });
};

/**
 * @openapi
 * /system:
 *   get:
 *     tags: [Health]
 *     summary: Full system telemetry
 */
export const system = asyncHandler(async (_req: Request, res: Response) => {
  const db = DatabaseManager.getHealth();
  const redis = redisManager.getHealth();

  ApiResponse.success(res, 'System telemetry retrieved.', {
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
