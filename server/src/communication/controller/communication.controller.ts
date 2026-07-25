import { Request, Response } from 'express';
import { communicationService } from '../service/communication.service.js';
import { socketManager } from '../../socket/socketManager.js';
import { ApiResponse } from '../../utils/apiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

/**
 * @openapi
 * /api/v1/events:
 *   get:
 *     tags: [Communication Bus]
 *     summary: Get recent system events from Event Bus log
 */
export const getEvents = asyncHandler(async (_req: Request, res: Response) => {
  const events = await communicationService.getRecentEventLogs();
  ApiResponse.success(res, 'Recent events retrieved.', events);
});

/**
 * @openapi
 * /api/v1/events/history:
 *   get:
 *     tags: [Communication Bus]
 *     summary: Get full event timeline history for a specific workflow ID
 */
export const getHistory = asyncHandler(async (req: Request, res: Response) => {
  const workflowId = req.query.workflowId as string;
  if (!workflowId) {
    res.status(400).json({ success: false, message: 'workflowId query parameter is required.' });
    return;
  }
  const history = await communicationService.getWorkflowEventHistory(workflowId);
  ApiResponse.success(res, 'Workflow event timeline retrieved.', history);
});

/**
 * @openapi
 * /api/v1/socket/status:
 *   get:
 *     tags: [Communication Bus]
 *     summary: Get Socket.IO gateway status, active connections, and latency metrics
 */
export const getSocketStatus = asyncHandler(async (_req: Request, res: Response) => {
  const io = socketManager.getIO();
  const connectedCount = io.engine ? io.engine.clientsCount : 0;

  ApiResponse.success(res, 'Socket gateway status retrieved.', {
    status: 'connected',
    connectedClients: connectedCount,
    namespaces: ['/'],
    pingIntervalMs: 10000,
    pingTimeoutMs: 30000,
  });
});

/**
 * @openapi
 * /api/v1/events/replay:
 *   post:
 *     tags: [Communication Bus]
 *     summary: Replay historical workflow events over Socket.IO to frontend clients
 */
export const replayEvents = asyncHandler(async (req: Request, res: Response) => {
  const result = await communicationService.replayWorkflowEvents(req.body);
  ApiResponse.success(res, 'Workflow event replay completed.', result);
});

/**
 * @openapi
 * /api/v1/events/test:
 *   post:
 *     tags: [Communication Bus]
 *     summary: Test endpoint to publish a custom event into the Event Bus
 */
export const testPublish = asyncHandler(async (req: Request, res: Response) => {
  const event = await communicationService.publishCustomEvent(req.body);
  ApiResponse.success(res, 'Custom event published to Event Bus.', event, 201);
});
