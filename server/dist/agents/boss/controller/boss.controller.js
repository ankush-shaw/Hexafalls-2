"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistory = exports.getContext = exports.getWorkflow = exports.createWorkflow = exports.analyze = void 0;
const boss_service_js_1 = require("../service/boss.service.js");
const context_engine_js_1 = require("../memory/context.engine.js");
const apiResponse_js_1 = require("../../../utils/apiResponse.js");
const asyncHandler_js_1 = require("../../../utils/asyncHandler.js");
/**
 * @openapi
 * /api/v1/boss/analyze:
 *   post:
 *     tags: [Boss]
 *     summary: Boss Agent CEO analyzes user prompt and generates execution blueprint
 */
exports.analyze = (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.userId || '000000000000000000000000';
    const workflow = await boss_service_js_1.bossService.analyzeRequest(userId, req.body);
    apiResponse_js_1.ApiResponse.success(res, 'Boss Agent analysis complete.', workflow, 201);
});
/**
 * @openapi
 * /api/v1/boss/workflow:
 *   post:
 *     tags: [Boss]
 *     summary: Boss Agent CEO approves strategy and dispatches to Supervisor COO
 */
exports.createWorkflow = (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    const { workflowId } = req.body;
    const approvedWorkflow = await boss_service_js_1.bossService.approveAndHandOffToSupervisor(workflowId);
    apiResponse_js_1.ApiResponse.success(res, 'Workflow approved and sent to Supervisor COO Queue.', approvedWorkflow);
});
/**
 * @openapi
 * /api/v1/boss/workflow/{id}:
 *   get:
 *     tags: [Boss]
 *     summary: Get Boss Workflow details by ID
 */
exports.getWorkflow = (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const workflow = await boss_service_js_1.bossService.getWorkflowById(id);
    if (!workflow) {
        res.status(404).json({ success: false, message: 'Workflow not found.' });
        return;
    }
    apiResponse_js_1.ApiResponse.success(res, 'Workflow retrieved.', workflow);
});
/**
 * @openapi
 * /api/v1/boss/context:
 *   get:
 *     tags: [Boss]
 *     summary: Get conversation context and memory
 */
exports.getContext = (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.userId || '000000000000000000000000';
    const conversationId = req.query.conversationId || 'default-conv';
    const context = await context_engine_js_1.contextEngine.getContext(conversationId, userId);
    apiResponse_js_1.ApiResponse.success(res, 'Context retrieved.', context);
});
/**
 * @openapi
 * /api/v1/boss/history:
 *   get:
 *     tags: [Boss]
 *     summary: Get Boss Agent workflow history for current user
 */
exports.getHistory = (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.userId || '000000000000000000000000';
    const history = await boss_service_js_1.bossService.getUserHistory(userId);
    apiResponse_js_1.ApiResponse.success(res, 'Workflow history retrieved.', history);
});
