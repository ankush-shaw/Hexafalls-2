import { bossRepository } from '../../boss/repository/boss.repository.js';
import { supervisorRepository } from '../repository/supervisor.repository.js';
import { workflowParser } from '../planner/workflow.parser.js';
import { dependencyEngine } from '../dependency/dependency.engine.js';
import { workerCreator } from '../allocator/worker.creator.js';
import { retryEngine } from '../retry/retry.engine.js';
import { resultCollector } from '../collector/result.collector.js';
import { socketManager, SOCKET_EVENTS } from '../../../socket/socketManager.js';
import { ISupervisorExecution } from '../models/supervisor.model.js';
import { ExecutableTask, WorkerNode } from '../types/supervisor.types.js';
import logger from '../../../logger/logger.js';

export class SupervisorService {
  /**
   * Start Supervisor AI orchestration for a given workflowId
   */
  public async startOrchestration(userId: string, workflowId: string, executionMode: 'sequential' | 'parallel' | 'mixed' | 'conditional' = 'mixed'): Promise<ISupervisorExecution> {
    const bossWorkflow = await bossRepository.findWorkflowById(workflowId);
    if (!bossWorkflow) {
      throw new Error(`Boss Workflow ${workflowId} not found.`);
    }

    const executionId = `exec-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    logger.info(`[SupervisorService] Starting orchestration for workflow ${workflowId} (ExecID: ${executionId}).`);
    socketManager.emit(SOCKET_EVENTS.SUPERVISOR_STATUS, { executionId, workflowId, status: 'receiving_workflow' });

    // Step 1: Parse Workflow into Executable Tasks
    const tasks = workflowParser.parseWorkflow(bossWorkflow);

    // Step 2: Validate DAG Graph
    const dagCheck = dependencyEngine.validateDAG(tasks);
    if (!dagCheck.valid) {
      throw new Error(`DAG Validation Failed: ${dagCheck.reason}`);
    }

    // Step 3: Spawn Dynamic Workers
    const workers = workerCreator.createWorkersForTasks(tasks);

    // Save Execution in DB
    const execution = await supervisorRepository.createExecution({
      executionId,
      workflowId,
      conversationId: bossWorkflow.conversationId,
      userId: userId as any,
      status: 'executing',
      progressPercent: 0,
      tasks,
      workers,
      executionMode,
    });

    socketManager.emit(SOCKET_EVENTS.WORKFLOW_RECEIVED, { executionId, workflowId, taskCount: tasks.length });

    // Trigger Execution Loop asynchronously
    this.runExecutionLoop(executionId).catch((err) => logger.error(`[SupervisorLoop] Error: ${err.message}`));

    return execution;
  }

  /**
   * Execution Loop: Assigns ready tasks to idle workers, simulates completion or handles retry
   */
  private async runExecutionLoop(executionId: string): Promise<void> {
    let execution = await supervisorRepository.findByExecutionId(executionId);
    if (!execution || execution.status === 'completed' || execution.status === 'cancelled') return;

    const readyTasks = dependencyEngine.getReadyTasks(execution.tasks);

    for (const task of readyTasks) {
      // Find idle worker matching department
      const worker = execution.workers.find(
        (w) => w.department === task.department && (w.status === 'idle' || w.status === 'healthy')
      );

      if (worker) {
        worker.status = 'busy';
        worker.currentTaskId = task.taskId;
        task.status = 'running';
        task.assignedWorkerId = worker.workerId;
        task.startedAt = new Date();

        await execution.save();

        socketManager.emit(SOCKET_EVENTS.WORKER_ASSIGNED, { executionId, taskId: task.taskId, workerId: worker.workerId });
        socketManager.emit(SOCKET_EVENTS.TASK_STARTED, { executionId, taskId: task.taskId, taskName: task.taskName });

        // Simulate Worker Task Execution (1.5s per task)
        setTimeout(async () => {
          await this.completeTask(executionId, task.taskId, {
            summary: `Executed ${task.taskName} cleanly with 100% telemetry pass rate.`,
            durationMs: task.estimatedDurationMs,
          });
        }, 1500);
      }
    }
  }

  /**
   * Complete a task and progress execution loop
   */
  public async completeTask(executionId: string, taskId: string, resultData: Record<string, unknown>): Promise<void> {
    let execution = await supervisorRepository.findByExecutionId(executionId);
    if (!execution) return;

    const task = execution.tasks.find((t) => t.taskId === taskId);
    if (!task) return;

    task.status = 'completed';
    task.completedAt = new Date();
    task.resultData = resultData;

    // Mark subtasks completed
    task.subtasks.forEach((st) => (st.status = 'completed'));

    // Free Worker
    if (task.assignedWorkerId) {
      const worker = execution.workers.find((w) => w.workerId === task.assignedWorkerId);
      if (worker) {
        worker.status = 'idle';
        worker.currentTaskId = undefined;
        worker.completedTaskCount += 1;
      }
    }

    // Re-calculate Progress %
    const completedCount = execution.tasks.filter((t) => t.status === 'completed').length;
    execution.progressPercent = Math.round((completedCount / execution.tasks.length) * 100);

    const isAllCompleted = completedCount === execution.tasks.length;
    if (isAllCompleted) {
      execution.status = 'completed';
      execution.completedAt = new Date();
      execution.collectedResults = resultCollector.collectResults(execution.tasks);

      // Update Boss Workflow status
      await bossRepository.updateWorkflowStatus(execution.workflowId, 'completed');
    }

    await execution.save();

    socketManager.emit(SOCKET_EVENTS.TASK_COMPLETED, {
      executionId,
      taskId,
      progressPercent: execution.progressPercent,
      isAllCompleted,
    });

    if (isAllCompleted) {
      socketManager.emit(SOCKET_EVENTS.EXECUTION_COMPLETED, {
        executionId,
        workflowId: execution.workflowId,
        collectedResults: execution.collectedResults,
      });
      logger.info(`[SupervisorService] Execution ${executionId} completed successfully (100%).`);
    } else {
      // Run loop to trigger remaining ready tasks
      this.runExecutionLoop(executionId).catch((err) => logger.error(`[SupervisorLoop] Error: ${err.message}`));
    }
  }

  /**
   * Manually trigger task retry
   */
  public async retryTask(executionId: string, taskId: string): Promise<ISupervisorExecution> {
    const execution = await supervisorRepository.findByExecutionId(executionId);
    if (!execution) throw new Error(`Execution ${executionId} not found.`);

    const task = execution.tasks.find((t) => t.taskId === taskId);
    if (!task) throw new Error(`Task ${taskId} not found.`);

    retryEngine.prepareRetry(task);
    await execution.save();

    socketManager.emit(SOCKET_EVENTS.RETRY_STARTED, { executionId, taskId, retryCount: task.retryCount });
    this.runExecutionLoop(executionId).catch((err) => logger.error(`[SupervisorLoop] Error: ${err.message}`));

    return execution;
  }

  /**
   * Cancel execution
   */
  public async cancelExecution(executionId: string): Promise<ISupervisorExecution> {
    const execution = await supervisorRepository.updateStatus(executionId, 'cancelled');
    if (!execution) throw new Error(`Execution ${executionId} not found.`);
    return execution;
  }

  public async getExecutionById(executionId: string): Promise<ISupervisorExecution | null> {
    return supervisorRepository.findByExecutionId(executionId);
  }

  public async getWorkers(): Promise<WorkerNode[]> {
    const active = await supervisorRepository.getAllActiveExecutions();
    const allWorkers: WorkerNode[] = [];
    active.forEach((e) => allWorkers.push(...e.workers));
    return allWorkers;
  }
}

export const supervisorService = new SupervisorService();
export default supervisorService;
