"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bossRepository = exports.BossRepository = void 0;
const boss_model_js_1 = require("../models/boss.model.js");
class BossRepository {
    async createWorkflow(data) {
        const workflow = new boss_model_js_1.BossWorkflow(data);
        return workflow.save();
    }
    async findWorkflowById(workflowId) {
        return boss_model_js_1.BossWorkflow.findOne({ workflowId }).exec();
    }
    async updateWorkflowStatus(workflowId, status, planningDurationMs) {
        const update = { status };
        if (planningDurationMs !== undefined) {
            update.planningDurationMs = planningDurationMs;
        }
        return boss_model_js_1.BossWorkflow.findOneAndUpdate({ workflowId }, { $set: update }, { new: true }).exec();
    }
    async setSupervisorJobId(workflowId, jobId) {
        return boss_model_js_1.BossWorkflow.findOneAndUpdate({ workflowId }, { $set: { supervisorJobId: jobId } }, { new: true }).exec();
    }
    async getWorkflowsByUser(userId, limit = 20) {
        return boss_model_js_1.BossWorkflow.find({ userId }).sort({ createdAt: -1 }).limit(limit).exec();
    }
    async getWorkflowsByConversation(conversationId) {
        return boss_model_js_1.BossWorkflow.find({ conversationId }).sort({ createdAt: -1 }).exec();
    }
    async logDecision(workflowId, decision, rationale, confidence) {
        const log = new boss_model_js_1.BossDecisionLog({ workflowId, decision, rationale, confidence });
        return log.save();
    }
    async getDecisionLogs(workflowId) {
        return boss_model_js_1.BossDecisionLog.find({ workflowId }).sort({ timestamp: 1 }).exec();
    }
    async getOrCreateMemory(conversationId, userId) {
        let memory = await boss_model_js_1.BossMemory.findOne({ conversationId }).exec();
        if (!memory) {
            memory = new boss_model_js_1.BossMemory({ conversationId, userId, workflowIds: [], summary: '' });
            await memory.save();
        }
        return memory;
    }
    async addWorkflowToMemory(conversationId, workflowId) {
        await boss_model_js_1.BossMemory.findOneAndUpdate({ conversationId }, { $addToSet: { workflowIds: workflowId }, $set: { lastActive: new Date() } }).exec();
    }
}
exports.BossRepository = BossRepository;
exports.bossRepository = new BossRepository();
exports.default = exports.bossRepository;
