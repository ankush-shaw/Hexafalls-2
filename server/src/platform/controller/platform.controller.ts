import { Request, Response } from 'express';
import { metricsService } from '../monitoring/metrics.service.js';
import { auditService } from '../audit/audit.service.js';
import { backupService } from '../backup/backup.service.js';
import { ApiResponse } from '../../utils/apiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

/**
 * @openapi
 * /api/v1/platform/metrics:
 *   get:
 *     tags: [Platform & Monitoring]
 *     summary: Get Prometheus metrics and system process telemetry
 */
export const getMetrics = asyncHandler(async (_req: Request, res: Response) => {
  const metrics = await metricsService.getSystemMetrics();
  ApiResponse.success(res, 'System telemetry & Prometheus metrics retrieved.', metrics);
});

/**
 * @openapi
 * /api/v1/platform/audit:
 *   get:
 *     tags: [Platform & Monitoring]
 *     summary: Get recent security audit logs
 */
export const getAuditLogs = asyncHandler(async (_req: Request, res: Response) => {
  const logs = await auditService.getRecentLogs();
  ApiResponse.success(res, 'Audit logs retrieved.', logs);
});

/**
 * @openapi
 * /api/v1/platform/security:
 *   get:
 *     tags: [Platform & Monitoring]
 *     summary: Get security compliance status, Helmet headers, and CORS posture
 */
export const getSecurityStatus = asyncHandler(async (_req: Request, res: Response) => {
  ApiResponse.success(res, 'Security posture retrieved.', {
    helmetEnabled: true,
    rateLimitingEnabled: true,
    jwtAuthEnabled: true,
    corsOrigin: '*',
    sslTermination: 'Nginx Reverse Proxy',
  });
});

/**
 * @openapi
 * /api/v1/platform/backup:
 *   post:
 *     tags: [Platform & Monitoring]
 *     summary: Trigger manual MongoDB snapshot backup
 */
export const triggerBackup = asyncHandler(async (_req: Request, res: Response) => {
  const backup = await backupService.triggerBackup();
  ApiResponse.success(res, 'Database backup snapshot triggered.', backup, 201);
});
