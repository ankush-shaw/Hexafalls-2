import { Request, Response } from 'express';
import { workerService } from '../service/worker.service.js';
import { ApiResponse } from '../../../utils/apiResponse.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

/**
 * @openapi
 * /api/v1/workers/create:
 *   post:
 *     tags: [Workers]
 *     summary: Dynamically spawn a Worker Agent node
 */
export const createWorker = asyncHandler(async (req: Request, res: Response) => {
  const worker = await workerService.createWorker(req.body);
  ApiResponse.success(res, 'Worker Agent node created.', worker, 201);
});

/**
 * @openapi
 * /api/v1/workers/start:
 *   post:
 *     tags: [Workers]
 *     summary: Assign and execute task on Worker Agent node
 */
export const startWorkerTask = asyncHandler(async (req: Request, res: Response) => {
  const result = await workerService.startWorkerTask(req.body);
  ApiResponse.success(res, 'Task execution started on worker.', result);
});

/**
 * @openapi
 * /api/v1/workers/stop:
 *   post:
 *     tags: [Workers]
 *     summary: Stop and terminate Worker Agent node
 */
export const stopWorker = asyncHandler(async (req: Request, res: Response) => {
  const { workerId } = req.body;
  const worker = await workerService.stopWorker(workerId);
  ApiResponse.success(res, 'Worker node stopped.', worker);
});

/**
 * @openapi
 * /api/v1/workers/{id}:
 *   get:
 *     tags: [Workers]
 *     summary: Get Worker Agent node details by ID
 */
export const getWorker = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const worker = await workerService.getWorkerById(id);
  if (!worker) {
    res.status(404).json({ success: false, message: 'Worker node not found.' });
    return;
  }
  ApiResponse.success(res, 'Worker details retrieved.', worker);
});

/**
 * @openapi
 * /api/v1/workers/execution/{executionId}:
 *   get:
 *     tags: [Workers]
 *     summary: Get all Worker Agent nodes for a specific execution ID
 */
export const getWorkersByExecution = asyncHandler(async (req: Request, res: Response) => {
  const { executionId } = req.params;
  const workers = await workerService.getWorkersByExecution(executionId);
  ApiResponse.success(res, 'Workers for execution retrieved.', workers);
});

/**
 * @openapi
 * /api/v1/workers/result/{taskId}:
 *   get:
 *     tags: [Workers]
 *     summary: Get deliverable result payload for a completed task
 */
export const getTaskResult = asyncHandler(async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const result = await workerService.getResultByTaskId(taskId);
  if (!result) {
    res.status(404).json({ success: false, message: 'Task result not found.' });
    return;
  }
  ApiResponse.success(res, 'Task result payload retrieved.', result);
});
