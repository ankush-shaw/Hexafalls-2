import { ExecutableTask } from '../types/supervisor.types.js';
import logger from '../../../logger/logger.js';

export class RetryEngine {
  public shouldRetry(task: ExecutableTask): boolean {
    return task.retryCount < task.maxRetries;
  }

  public getBackoffDelayMs(retryCount: number): number {
    return Math.pow(2, retryCount) * 1000; // Exponential backoff: 1s, 2s, 4s...
  }

  public prepareRetry(task: ExecutableTask): ExecutableTask {
    task.retryCount += 1;
    task.status = 'retrying';
    logger.warn(`[RetryEngine] Scheduling retry #${task.retryCount} for task ${task.taskId} (${task.taskName}).`);
    return task;
  }
}

export const retryEngine = new RetryEngine();
export default retryEngine;
