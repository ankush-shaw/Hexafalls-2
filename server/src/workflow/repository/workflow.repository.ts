import {
  WorkflowEngineRecord,
  WorkflowMetricsRecord,
  IWorkflowEngineRecord,
  IWorkflowMetricsRecord,
} from '../models/workflow.model.js';
import { WorkflowEngineState, WorkflowCheckpoint } from '../types/workflow.types.js';

export class WorkflowRepository {
  async createRecord(data: Partial<IWorkflowEngineRecord>): Promise<IWorkflowEngineRecord> {
    const record = new WorkflowEngineRecord(data);
    return record.save();
  }

  async findByEngineId(engineWorkflowId: string): Promise<IWorkflowEngineRecord | null> {
    return WorkflowEngineRecord.findOne({ engineWorkflowId }).exec();
  }

  async findByBossWorkflowId(bossWorkflowId: string): Promise<IWorkflowEngineRecord | null> {
    return WorkflowEngineRecord.findOne({ bossWorkflowId }).exec();
  }

  async updateStatus(
    engineWorkflowId: string,
    status: WorkflowEngineState,
    progressPercent?: number
  ): Promise<IWorkflowEngineRecord | null> {
    const update: Record<string, unknown> = { status };
    if (progressPercent !== undefined) update.progressPercent = progressPercent;
    if (status === 'running' && !update.startedAt) update.startedAt = new Date();
    if (status === 'completed' || status === 'failed' || status === 'cancelled') {
      update.completedAt = new Date();
    }
    return WorkflowEngineRecord.findOneAndUpdate({ engineWorkflowId }, { $set: update }, { new: true }).exec();
  }

  async addCheckpoint(engineWorkflowId: string, checkpoint: WorkflowCheckpoint): Promise<IWorkflowEngineRecord | null> {
    return WorkflowEngineRecord.findOneAndUpdate(
      { engineWorkflowId },
      { $push: { checkpoints: checkpoint }, $set: { progressPercent: checkpoint.progressPercent } },
      { new: true }
    ).exec();
  }

  async getUserHistory(userId: string, limit = 20): Promise<IWorkflowEngineRecord[]> {
    return WorkflowEngineRecord.find({ userId }).sort({ createdAt: -1 }).limit(limit).exec();
  }

  async recordTelemetry(success: boolean, durationMs: number): Promise<IWorkflowMetricsRecord> {
    const today = new Date().toISOString().split('T')[0];
    let metrics = await WorkflowMetricsRecord.findOne({ date: today }).exec();
    if (!metrics) {
      metrics = new WorkflowMetricsRecord({
        date: today,
        totalExecutions: 1,
        successCount: success ? 1 : 0,
        failedCount: success ? 0 : 1,
        avgDurationMs: durationMs,
      });
    } else {
      metrics.totalExecutions += 1;
      if (success) metrics.successCount += 1;
      else metrics.failedCount += 1;
      metrics.avgDurationMs = Math.round((metrics.avgDurationMs + durationMs) / 2);
    }
    return metrics.save();
  }
}

export const workflowRepository = new WorkflowRepository();
export default workflowRepository;
