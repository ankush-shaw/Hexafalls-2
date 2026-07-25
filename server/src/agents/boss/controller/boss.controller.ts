import { Request, Response } from 'express';
import { bossService } from '../service/boss.service.js';
import { contextEngine } from '../memory/context.engine.js';
import { ApiResponse } from '../../../utils/apiResponse.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

/**
 * @openapi
 * /api/v1/boss/analyze:
 *   post:
 *     tags: [Boss]
 *     summary: Boss Agent CEO analyzes user prompt and generates execution blueprint
 */
export const analyze = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId || '000000000000000000000000';
  const workflow = await bossService.analyzeRequest(userId, req.body);
  ApiResponse.success(res, 'Boss Agent analysis complete.', workflow, 201);
});

/**
 * @openapi
 * /api/v1/boss/workflow:
 *   post:
 *     tags: [Boss]
 *     summary: Boss Agent CEO approves strategy and dispatches to Supervisor COO
 */
export const createWorkflow = asyncHandler(async (req: Request, res: Response) => {
  const { workflowId } = req.body;
  const approvedWorkflow = await bossService.approveAndHandOffToSupervisor(workflowId);
  ApiResponse.success(res, 'Workflow approved and sent to Supervisor COO Queue.', approvedWorkflow);
});

/**
 * @openapi
 * /api/v1/boss/workflow/{id}:
 *   get:
 *     tags: [Boss]
 *     summary: Get Boss Workflow details by ID
 */
export const getWorkflow = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const workflow = await bossService.getWorkflowById(id);
  if (!workflow) {
    res.status(404).json({ success: false, message: 'Workflow not found.' });
    return;
  }
  ApiResponse.success(res, 'Workflow retrieved.', workflow);
});

/**
 * @openapi
 * /api/v1/boss/context:
 *   get:
 *     tags: [Boss]
 *     summary: Get conversation context and memory
 */
export const getContext = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId || '000000000000000000000000';
  const conversationId = (req.query.conversationId as string) || 'default-conv';
  const context = await contextEngine.getContext(conversationId, userId);
  ApiResponse.success(res, 'Context retrieved.', context);
});

/**
 * @openapi
 * /api/v1/boss/history:
 *   get:
 *     tags: [Boss]
 *     summary: Get Boss Agent workflow history for current user
 */
export const getHistory = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId || '000000000000000000000000';
  const history = await bossService.getUserHistory(userId);
  ApiResponse.success(res, 'Workflow history retrieved.', history);
});
