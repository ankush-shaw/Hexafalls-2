import { ExecutableTask } from '../types/supervisor.types.js';

export class ResultCollector {
  public collectResults(tasks: ExecutableTask[]): Record<string, unknown> {
    const departmentResults: Record<string, unknown> = {};

    tasks.forEach((t) => {
      departmentResults[t.department] = {
        taskId: t.taskId,
        taskName: t.taskName,
        status: t.status,
        completedAt: t.completedAt,
        outputSummary: t.resultData?.summary || `Completed task ${t.taskName} successfully.`,
        data: t.resultData || { status: 'ok', durationMs: t.estimatedDurationMs },
      };
    });

    return {
      totalTasks: tasks.length,
      completedTasks: tasks.filter((t) => t.status === 'completed').length,
      failedTasks: tasks.filter((t) => t.status === 'failed').length,
      departments: departmentResults,
    };
  }
}

export const resultCollector = new ResultCollector();
export default resultCollector;
