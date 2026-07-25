import { BossWorkflow, BossDecisionLog, BossMemory, IBossWorkflow, IBossDecision, IBossMemory } from '../models/boss.model.js';
import { BossStatus, BossDecision } from '../types/boss.types.js';

export class BossRepository {
  async createWorkflow(data: Partial<IBossWorkflow>): Promise<IBossWorkflow> {
    const workflow = new BossWorkflow(data);
    return workflow.save();
  }

  async findWorkflowById(workflowId: string): Promise<IBossWorkflow | null> {
    return BossWorkflow.findOne({ workflowId }).exec();
  }

  async updateWorkflowStatus(workflowId: string, status: BossStatus, planningDurationMs?: number): Promise<IBossWorkflow | null> {
    const update: Record<string, unknown> = { status };
    if (planningDurationMs !== undefined) {
      update.planningDurationMs = planningDurationMs;
    }
    return BossWorkflow.findOneAndUpdate({ workflowId }, { $set: update }, { new: true }).exec();
  }

  async setSupervisorJobId(workflowId: string, jobId: string): Promise<IBossWorkflow | null> {
    return BossWorkflow.findOneAndUpdate({ workflowId }, { $set: { supervisorJobId: jobId } }, { new: true }).exec();
  }

  async getWorkflowsByUser(userId: string, limit = 20): Promise<IBossWorkflow[]> {
    return BossWorkflow.find({ userId }).sort({ createdAt: -1 }).limit(limit).exec();
  }

  async getWorkflowsByConversation(conversationId: string): Promise<IBossWorkflow[]> {
    return BossWorkflow.find({ conversationId }).sort({ createdAt: -1 }).exec();
  }

  async logDecision(workflowId: string, decision: BossDecision, rationale: string, confidence: number): Promise<IBossDecision> {
    const log = new BossDecisionLog({ workflowId, decision, rationale, confidence });
    return log.save();
  }

  async getDecisionLogs(workflowId: string): Promise<IBossDecision[]> {
    return BossDecisionLog.find({ workflowId }).sort({ timestamp: 1 }).exec();
  }

  async getOrCreateMemory(conversationId: string, userId: string): Promise<IBossMemory> {
    let memory = await BossMemory.findOne({ conversationId }).exec();
    if (!memory) {
      memory = new BossMemory({ conversationId, userId, workflowIds: [], summary: '' });
      await memory.save();
    }
    return memory;
  }

  async addWorkflowToMemory(conversationId: string, workflowId: string): Promise<void> {
    await BossMemory.findOneAndUpdate(
      { conversationId },
      { $addToSet: { workflowIds: workflowId }, $set: { lastActive: new Date() } }
    ).exec();
  }
}

export const bossRepository = new BossRepository();
export default bossRepository;
