import { Request, Response } from 'express';
import { supervisorService } from '../service/supervisor.service.js';
import { ApiResponse } from '../../../utils/apiResponse.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

/**
 * @openapi
 * /api/v1/supervisor/start:
 *   post:
 *     tags: [Supervisor]
 *     summary: Start Supervisor COO workflow task execution
 */
export const start = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId || '000000000000000000000000';
  const { workflowId, executionMode } = req.body;
  const execution = await supervisorService.startOrchestration(userId, workflowId, executionMode);
  ApiResponse.success(res, 'Supervisor orchestration started.', execution, 201);
});

/**
 * @openapi
 * /api/v1/supervisor/execution/{id}:
 *   get:
 *     tags: [Supervisor]
 *     summary: Get Supervisor execution progress and task status by execution ID
 */
export const getExecution = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const execution = await supervisorService.getExecutionById(id);
  if (!execution) {
    res.status(404).json({ success: false, message: 'Execution not found.' });
    return;
  }
  ApiResponse.success(res, 'Execution details retrieved.', execution);
});

/**
 * @openapi
 * /api/v1/supervisor/workers:
 *   get:
 *     tags: [Supervisor]
 *     summary: Get list of dynamic Worker Agent nodes and registry status
 */
export const getWorkers = asyncHandler(async (_req: Request, res: Response) => {
  const workers = await supervisorService.getWorkers();
  ApiResponse.success(res, 'Worker node registry retrieved.', workers);
});

/**
 * @openapi
 * /api/v1/supervisor/retry:
 *   post:
 *     tags: [Supervisor]
 *     summary: Manually trigger retry for a failed task
 */
export const retry = asyncHandler(async (req: Request, res: Response) => {
  const { executionId, taskId } = req.body;
  const execution = await supervisorService.retryTask(executionId, taskId);
  ApiResponse.success(res, 'Task retry initiated.', execution);
});

/**
 * @openapi
 * /api/v1/supervisor/cancel:
 *   post:
 *     tags: [Supervisor]
 *     summary: Cancel workflow execution
 */
export const cancel = asyncHandler(async (req: Request, res: Response) => {
  const { executionId } = req.body;
  const execution = await supervisorService.cancelExecution(executionId);
  ApiResponse.success(res, 'Execution cancelled.', execution);
});
