import { IBossWorkflow } from '../../boss/models/boss.model.js';
import { ExecutableTask, ExecutableSubtask } from '../types/supervisor.types.js';

export class WorkflowParser {
  public parseWorkflow(bossWorkflow: IBossWorkflow): ExecutableTask[] {
    const tasks: ExecutableTask[] = [];

    const stages = bossWorkflow.graph?.stages || [];
    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i];
      const taskId = `tsk-${stage.stageId}`;

      // Build Subtasks
      const subtasks: ExecutableSubtask[] = [
        {
          subtaskId: `${taskId}-sub-1`,
          parentTaskId: taskId,
          title: `Initialize ${stage.department} Context & Parameters`,
          executionOrder: 1,
          status: 'pending',
        },
        {
          subtaskId: `${taskId}-sub-2`,
          parentTaskId: taskId,
          title: `Execute Core Domain Logic: ${stage.name}`,
          executionOrder: 2,
          status: 'pending',
        },
        {
          subtaskId: `${taskId}-sub-3`,
          parentTaskId: taskId,
          title: `Validate & Anonymize Output Payload`,
          executionOrder: 3,
          status: 'pending',
        },
      ];

      tasks.push({
        taskId,
        workflowId: bossWorkflow.workflowId,
        stageId: stage.stageId,
        department: stage.department,
        taskName: stage.name,
        description: stage.description,
        priority: 5 + i,
        dependencies: stage.dependencies.map((depStageId) => `tsk-${depStageId}`),
        subtasks,
        status: 'pending',
        retryCount: 0,
        maxRetries: 3,
        estimatedDurationMs: stage.estimatedDurationMs || 30000,
      });
    }

    return tasks;
  }
}

export const workflowParser = new WorkflowParser();
export default workflowParser;
