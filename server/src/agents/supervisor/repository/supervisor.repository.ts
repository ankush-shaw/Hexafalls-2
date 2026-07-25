import { SupervisorExecution, ISupervisorExecution } from '../models/supervisor.model.js';
import { SupervisorStatus, TaskStatus, ExecutableTask, WorkerNode } from '../types/supervisor.types.js';

export class SupervisorRepository {
  async createExecution(data: Partial<ISupervisorExecution>): Promise<ISupervisorExecution> {
    const execution = new SupervisorExecution(data);
    return execution.save();
  }

  async findByExecutionId(executionId: string): Promise<ISupervisorExecution | null> {
    return SupervisorExecution.findOne({ executionId }).exec();
  }

  async findByWorkflowId(workflowId: string): Promise<ISupervisorExecution | null> {
    return SupervisorExecution.findOne({ workflowId }).sort({ createdAt: -1 }).exec();
  }

  async updateStatus(executionId: string, status: SupervisorStatus, progressPercent?: number): Promise<ISupervisorExecution | null> {
    const update: Record<string, unknown> = { status };
    if (progressPercent !== undefined) {
      update.progressPercent = progressPercent;
    }
    if (status === 'completed' || status === 'failed' || status === 'cancelled') {
      update.completedAt = new Date();
    }
    return SupervisorExecution.findOneAndUpdate({ executionId }, { $set: update }, { new: true }).exec();
  }

  async updateTaskStatus(executionId: string, taskId: string, status: TaskStatus, assignedWorkerId?: string, resultData?: Record<string, unknown>, errorMessage?: string): Promise<ISupervisorExecution | null> {
    const execution = await this.findByExecutionId(executionId);
    if (!execution) return null;

    const task = execution.tasks.find((t) => t.taskId === taskId);
    if (task) {
      task.status = status;
      if (assignedWorkerId) task.assignedWorkerId = assignedWorkerId;
      if (status === 'running') task.startedAt = new Date();
      if (status === 'completed') task.completedAt = new Date();
      if (resultData) task.resultData = resultData;
      if (errorMessage) task.errorMessage = errorMessage;
    }

    // Re-calculate progress
    const completedTasks = execution.tasks.filter((t) => t.status === 'completed').length;
    execution.progressPercent = Math.round((completedTasks / execution.tasks.length) * 100);

    return execution.save();
  }

  async getAllActiveExecutions(): Promise<ISupervisorExecution[]> {
    return SupervisorExecution.find({ status: { $in: ['executing', 'scheduling', 'retrying'] } }).exec();
  }
}

export const supervisorRepository = new SupervisorRepository();
export default supervisorRepository;
