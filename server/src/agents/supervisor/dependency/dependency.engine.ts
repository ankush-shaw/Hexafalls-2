import { ExecutableTask } from '../types/supervisor.types.js';

export class DependencyEngine {
  /**
   * Validates DAG graph against circular dependencies
   */
  public validateDAG(tasks: ExecutableTask[]): { valid: boolean; reason?: string } {
    const taskMap = new Map<string, ExecutableTask>();
    tasks.forEach((t) => taskMap.set(t.taskId, t));

    const visited = new Set<string>();
    const recStack = new Set<string>();

    const hasCycle = (taskId: string): boolean => {
      visited.add(taskId);
      recStack.add(taskId);

      const task = taskMap.get(taskId);
      if (task) {
        for (const depId of task.dependencies) {
          if (!visited.has(depId)) {
            if (hasCycle(depId)) return true;
          } else if (recStack.has(depId)) {
            return true;
          }
        }
      }

      recStack.delete(taskId);
      return false;
    };

    for (const task of tasks) {
      if (!visited.has(task.taskId)) {
        if (hasCycle(task.taskId)) {
          return { valid: false, reason: `Circular dependency detected starting from task ${task.taskId}` };
        }
      }
    }

    return { valid: true };
  }

  /**
   * Gets tasks that have all prerequisites satisfied and are ready for queueing
   */
  public getReadyTasks(tasks: ExecutableTask[]): ExecutableTask[] {
    const completedTaskIds = new Set(
      tasks.filter((t) => t.status === 'completed').map((t) => t.taskId)
    );

    return tasks.filter((task) => {
      if (task.status !== 'pending') return false;
      return task.dependencies.every((depId) => completedTaskIds.has(depId));
    });
  }
}

export const dependencyEngine = new DependencyEngine();
export default dependencyEngine;
