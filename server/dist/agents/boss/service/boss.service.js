"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bossService = exports.BossService = void 0;
const intent_analyzer_js_1 = require("../planner/intent.analyzer.js");
const complexity_engine_js_1 = require("../planner/complexity.engine.js");
const department_discovery_js_1 = require("../planner/department.discovery.js");
const workflow_planner_js_1 = require("../planner/workflow.planner.js");
const validation_engine_js_1 = require("../planner/validation.engine.js");
const boss_repository_js_1 = require("../repository/boss.repository.js");
const socketManager_js_1 = require("../../../socket/socketManager.js");
const queueManager_js_1 = require("../../../queue/queueManager.js");
const logger_js_1 = __importDefault(require("../../../logger/logger.js"));
class BossService {
    /**
     * Analyze prompt and generate Boss Workflow Blueprint (does not send to Supervisor yet)
     */
    async analyzeRequest(userId, input) {
        const startTime = Date.now();
        const conversationId = input.conversationId || `conv-${Date.now()}`;
        const workflowId = `wf-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        logger_js_1.default.info(`[BossService] Received analysis request for prompt: "${input.prompt.substring(0, 50)}..."`);
        socketManager_js_1.socketManager.emit(socketManager_js_1.SOCKET_EVENTS.BOSS_STARTED, { workflowId, conversationId, status: 'receiving' });
        // Step 1: Intent Analysis
        socketManager_js_1.socketManager.emit(socketManager_js_1.SOCKET_EVENTS.BOSS_ANALYZING, { workflowId, step: 'intent_analysis' });
        const intent = intent_analyzer_js_1.intentAnalyzer.analyzeIntent(input.prompt, input.voiceTranscript);
        // Step 2: Complexity Estimation
        socketManager_js_1.socketManager.emit(socketManager_js_1.SOCKET_EVENTS.BOSS_ANALYZING, { workflowId, step: 'complexity_estimation' });
        const complexity = complexity_engine_js_1.complexityEngine.estimateComplexity(input.prompt, intent);
        // Step 3: Department Discovery
        socketManager_js_1.socketManager.emit(socketManager_js_1.SOCKET_EVENTS.BOSS_ANALYZING, { workflowId, step: 'department_discovery' });
        const departments = department_discovery_js_1.departmentDiscoveryEngine.discoverDepartments(input.prompt, intent);
        // Step 4: Workflow Graph Generation
        socketManager_js_1.socketManager.emit(socketManager_js_1.SOCKET_EVENTS.BOSS_PLANNING, { workflowId, step: 'graph_generation' });
        const graph = workflow_planner_js_1.workflowPlanner.planGraph(departments);
        // Step 5: Self-Validation
        socketManager_js_1.socketManager.emit(socketManager_js_1.SOCKET_EVENTS.BOSS_PLANNING, { workflowId, step: 'self_validation' });
        const validation = validation_engine_js_1.bossValidationEngine.validateWorkflow(input.prompt, graph);
        const planningDurationMs = Date.now() - startTime;
        // Save to Database
        const workflow = await boss_repository_js_1.bossRepository.createWorkflow({
            workflowId,
            workflowName: `Strategy Blueprint: ${intent.primaryGoal.substring(0, 40)}`,
            conversationId,
            userId: userId,
            prompt: input.prompt,
            voiceTranscript: input.voiceTranscript,
            intent,
            complexity,
            departments,
            graph,
            bossDecision: validation.bossDecision,
            decisionRationale: validation.rationale,
            overallConfidence: validation.overallConfidence,
            status: 'planning',
            planningDurationMs,
        });
        await boss_repository_js_1.bossRepository.logDecision(workflowId, validation.bossDecision, validation.rationale, validation.overallConfidence);
        await boss_repository_js_1.bossRepository.addWorkflowToMemory(conversationId, workflowId);
        socketManager_js_1.socketManager.emit(socketManager_js_1.SOCKET_EVENTS.BOSS_STEP, {
            workflowId,
            status: 'planning',
            intent,
            complexity,
            departments,
            decision: validation.bossDecision,
        });
        return workflow;
    }
    /**
     * Finalize and approve workflow, hand off to Supervisor queue
     */
    async approveAndHandOffToSupervisor(workflowId) {
        const workflow = await boss_repository_js_1.bossRepository.findWorkflowById(workflowId);
        if (!workflow) {
            throw new Error(`Workflow ${workflowId} not found.`);
        }
        workflow.status = 'completed';
        workflow.bossDecision = 'ready_for_supervisor';
        await workflow.save();
        await boss_repository_js_1.bossRepository.logDecision(workflowId, 'ready_for_supervisor', 'CEO Boss Agent approved strategy blueprint and dispatched execution plan to Supervisor COO Queue.', workflow.overallConfidence);
        // Emit Socket Event
        socketManager_js_1.socketManager.emit(socketManager_js_1.SOCKET_EVENTS.BOSS_APPROVED, {
            workflowId,
            status: 'completed',
            bossDecision: 'ready_for_supervisor',
            departments: workflow.departments,
            stages: workflow.graph.stages,
        });
        // Delegate to Supervisor BullMQ Queue
        const supervisorJob = await queueManager_js_1.queueManager.addJob(queueManager_js_1.QUEUE_NAMES.SUPERVISOR, 'orchestrate_workflow', {
            workflowId: workflow.workflowId,
            conversationId: workflow.conversationId,
            prompt: workflow.prompt,
            departments: workflow.departments,
            graph: workflow.graph,
        });
        logger_js_1.default.info(`[BossService] Workflow ${workflowId} approved and delegated to Supervisor BullMQ Queue.`);
        return workflow;
    }
    async getWorkflowById(workflowId) {
        return boss_repository_js_1.bossRepository.findWorkflowById(workflowId);
    }
    async getUserHistory(userId) {
        return boss_repository_js_1.bossRepository.getWorkflowsByUser(userId);
    }
}
exports.BossService = BossService;
exports.bossService = new BossService();
exports.default = exports.bossService;
