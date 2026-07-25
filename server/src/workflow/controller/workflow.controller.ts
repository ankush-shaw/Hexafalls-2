import { Request, Response } from 'express';
import { workflowService } from '../service/workflow.service.js';
import { ApiResponse } from '../../utils/apiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

/**
 * @openapi
 * /api/v1/workflow/create:
 *   post:
 *     tags: [Workflow Engine]
 *     summary: Register a new workflow execution in the central Workflow Engine
 */
export const createWorkflow = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId || '000000000000000000000000';
  const record = await workflowService.createWorkflow(userId, req.body);
  ApiResponse.success(res, 'Workflow registered in Engine.', record, 201);
});

/**
 * @openapi
 * /api/v1/workflow/start:
 *   post:
 *     tags: [Workflow Engine]
 *     summary: Start workflow execution and trigger Supervisor COO
 */
export const startWorkflow = asyncHandler(async (req: Request, res: Response) => {
  const { engineWorkflowId } = req.body;
  const record = await workflowService.startWorkflow(engineWorkflowId);
  ApiResponse.success(res, 'Workflow Engine execution started.', record);
});

/**
 * @openapi
 * /api/v1/workflow/pause:
 *   post:
 *     tags: [Workflow Engine]
 *     summary: Pause active workflow execution
 */
export const pauseWorkflow = asyncHandler(async (req: Request, res: Response) => {
  const { engineWorkflowId } = req.body;
  const record = await workflowService.pauseWorkflow(engineWorkflowId);
  ApiResponse.success(res, 'Workflow execution paused.', record);
});

/**
 * @openapi
 * /api/v1/workflow/resume:
 *   post:
 *     tags: [Workflow Engine]
 *     summary: Resume paused workflow execution
 */
export const resumeWorkflow = asyncHandler(async (req: Request, res: Response) => {
  const { engineWorkflowId } = req.body;
  const record = await workflowService.resumeWorkflow(engineWorkflowId);
  ApiResponse.success(res, 'Workflow execution resumed.', record);
});

/**
 * @openapi
 * /api/v1/workflow/cancel:
 *   post:
 *     tags: [Workflow Engine]
 *     summary: Cancel active workflow execution
 */
export const cancelWorkflow = asyncHandler(async (req: Request, res: Response) => {
  const { engineWorkflowId } = req.body;
  const record = await workflowService.cancelWorkflow(engineWorkflowId);
  ApiResponse.success(res, 'Workflow execution cancelled.', record);
});

/**
 * @openapi
 * /api/v1/workflow/retry:
 *   post:
 *     tags: [Workflow Engine]
 *     summary: Retry failed workflow from latest saved checkpoint
 */
export const retryWorkflow = asyncHandler(async (req: Request, res: Response) => {
  const { engineWorkflowId } = req.body;
  const record = await workflowService.retryWorkflow(engineWorkflowId);
  ApiResponse.success(res, 'Workflow retry initiated.', record);
});

/**
 * @openapi
 * /api/v1/workflow/{id}:
 *   get:
 *     tags: [Workflow Engine]
 *     summary: Get detailed workflow state, checkpoints, and execution history by ID
 */
export const getWorkflow = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const record = await workflowService.getWorkflowById(id);
  if (!record) {
    res.status(404).json({ success: false, message: 'Workflow record not found.' });
    return;
  }
  ApiResponse.success(res, 'Workflow record retrieved.', record);
});

/**
 * @openapi
 * /api/v1/workflow/history:
 *   get:
 *     tags: [Workflow Engine]
 *     summary: Get user workflow execution history
 */
export const getHistory = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId || '000000000000000000000000';
  const history = await workflowService.getUserHistory(userId);
  ApiResponse.success(res, 'Workflow history retrieved.', history);
});
