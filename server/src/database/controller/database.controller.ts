import { Request, Response } from 'express';
import { seedDatabase } from '../seeders/db.seeder.js';
import { TaskItem, ReportItem, AuditLog } from '../schemas/domain.models.js';
import { ApiResponse } from '../../utils/apiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

/**
 * @openapi
 * /api/v1/database/seed:
 *   get:
 *     tags: [Database]
 *     summary: Run database seeder for admin user and default workspace
 */
export const runSeed = asyncHandler(async (_req: Request, res: Response) => {
  const result = await seedDatabase();
  ApiResponse.success(res, 'Database seeder executed.', result);
});

/**
 * @openapi
 * /api/v1/database/analytics:
 *   get:
 *     tags: [Database]
 *     summary: Get aggregated multi-agent database telemetry
 */
export const getAnalytics = asyncHandler(async (_req: Request, res: Response) => {
  const taskCount = await TaskItem.countDocuments();
  const reportCount = await ReportItem.countDocuments();
  const auditCount = await AuditLog.countDocuments();

  ApiResponse.success(res, 'Database telemetry retrieved.', {
    collections: {
      tasks: taskCount,
      reports: reportCount,
      auditLogs: auditCount,
    },
    databaseStatus: 'connected',
  });
});
