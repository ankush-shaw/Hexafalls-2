import { WorkerAgent, WorkerResult, WorkerLog, IWorkerAgent, IWorkerResult, IWorkerLog } from '../models/worker.model.js';
import { WorkerRuntimeState, WorkerHealthState } from '../types/worker.types.js';

export class WorkerRepository {
  async createWorker(data: Partial<IWorkerAgent>): Promise<IWorkerAgent> {
    const worker = new WorkerAgent(data);
    return worker.save();
  }

  async findByWorkerId(workerId: string): Promise<IWorkerAgent | null> {
    return WorkerAgent.findOne({ workerId }).exec();
  }

  async updateState(workerId: string, status: WorkerRuntimeState, health?: WorkerHealthState, currentStep?: number, progressPercent?: number): Promise<IWorkerAgent | null> {
    const update: Record<string, unknown> = { status, lastHeartbeat: new Date() };
    if (health) update.health = health;
    if (currentStep !== undefined) update.currentStep = currentStep;
    if (progressPercent !== undefined) update.progressPercent = progressPercent;
    if (status === 'executing' && !update.startedTime) update.startedTime = new Date();
    if (status === 'completed' || status === 'failed' || status === 'destroyed') update.finishedTime = new Date();

    return WorkerAgent.findOneAndUpdate({ workerId }, { $set: update }, { new: true }).exec();
  }

  async saveResult(data: Partial<IWorkerResult>): Promise<IWorkerResult> {
    const result = new WorkerResult(data);
    return result.save();
  }

  async findResultByTaskId(taskId: string): Promise<IWorkerResult | null> {
    return WorkerResult.findOne({ taskId }).exec();
  }

  async logStep(workerId: string, executionId: string, message: string, taskId?: string, level: 'info' | 'warn' | 'error' = 'info', step?: number): Promise<IWorkerLog> {
    const log = new WorkerLog({ workerId, executionId, message, taskId, level, step });
    return log.save();
  }

  async getLogsForWorker(workerId: string): Promise<IWorkerLog[]> {
    return WorkerLog.find({ workerId }).sort({ timestamp: 1 }).exec();
  }

  async getWorkersByExecution(executionId: string): Promise<IWorkerAgent[]> {
    return WorkerAgent.find({ executionId }).exec();
  }
}

export const workerRepository = new WorkerRepository();
export default workerRepository;
