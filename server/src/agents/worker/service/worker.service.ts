import { workerRepository } from '../repository/worker.repository.js';
import { workerExecutionEngine } from '../runtime/execution.engine.js';
import { supervisorService } from '../../supervisor/service/supervisor.service.js';
import { socketManager, SOCKET_EVENTS } from '../../../socket/socketManager.js';
import { CreateWorkerInput, StartWorkerTaskInput } from '../validators/worker.validator.js';
import { IWorkerAgent, IWorkerResult } from '../models/worker.model.js';
import logger from '../../../logger/logger.js';

export class WorkerService {
  /**
   * Dynamically create a Worker Agent
   */
  public async createWorker(input: CreateWorkerInput): Promise<IWorkerAgent> {
    const workerId = `wrk-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const worker = await workerRepository.createWorker({
      workerId,
      executionId: input.executionId,
      department: input.department,
      capabilities: input.capabilities || [input.department, 'Data Processing'],
      status: 'created',
      health: 'healthy',
      priority: input.priority || 5,
    });

    logger.info(`[WorkerService] Dynamic worker created: ${workerId} (${input.department}).`);
    socketManager.emit(SOCKET_EVENTS.WORKER_CREATED, {
      workerId,
      executionId: input.executionId,
      department: input.department,
      status: 'created',
    });

    // Move to ready state
    await workerRepository.updateState(workerId, 'ready', 'healthy');
    socketManager.emit(SOCKET_EVENTS.WORKER_READY, { workerId, status: 'ready' });

    return worker;
  }

  /**
   * Start executing an assigned task on a worker node
   */
  public async startWorkerTask(input: StartWorkerTaskInput): Promise<IWorkerResult> {
    const { workerId, taskId, workflowId, executionId, taskName, department, description, dependencies, requiredOutput, payload } = input;

    let worker = await workerRepository.findByWorkerId(workerId);
    if (!worker) {
      throw new Error(`Worker Agent ${workerId} not found.`);
    }

    worker.currentTaskId = taskId;
    worker.status = 'executing';
    worker.health = 'busy';
    await worker.save();

    socketManager.emit(SOCKET_EVENTS.WORKER_STARTED, { workerId, taskId, taskName, department });

    logger.info(`[WorkerService] Worker ${workerId} started executing task ${taskId} (${taskName}).`);

    // Execute 5-step Lifecycle
    const resultPayload = await workerExecutionEngine.executeTask(
      workerId,
      { taskId, workflowId, executionId, department, taskName, description, dependencies, requiredOutput, payload },
      async (step, percent) => {
        await workerRepository.updateState(workerId, 'executing', 'busy', step, percent);
      }
    );

    // Save Result to MongoDB
    let resultPayloadToReturn = resultPayload;
    try {
      await workerRepository.saveResult(resultPayload);
      await workerRepository.updateState(workerId, 'completed', 'healthy', 5, 100);
    } catch (err) {
      // Offline fallback
    }


    socketManager.emit(SOCKET_EVENTS.WORKER_COMPLETED, {
      workerId,
      taskId,
      executionId,
      summary: resultPayload.summary,
      output: resultPayload.output,
    });

    // Notify Supervisor AI of completed task output
    await supervisorService.completeTask(executionId, taskId, resultPayload.output);

    return resultPayload as unknown as IWorkerResult;
  }


  /**
   * Stop worker instance and destroy
   */
  public async stopWorker(workerId: string): Promise<IWorkerAgent | null> {
    const worker = await workerRepository.updateState(workerId, 'destroyed', 'stopped');
    if (worker) {
      socketManager.emit(SOCKET_EVENTS.WORKER_DESTROYED, { workerId, status: 'destroyed' });
      logger.info(`[WorkerService] Worker ${workerId} terminated cleanly.`);
    }
    return worker;
  }

  public async getWorkerById(workerId: string): Promise<IWorkerAgent | null> {
    return workerRepository.findByWorkerId(workerId);
  }

  public async getWorkersByExecution(executionId: string): Promise<IWorkerAgent[]> {
    return workerRepository.getWorkersByExecution(executionId);
  }

  public async getResultByTaskId(taskId: string): Promise<IWorkerResult | null> {
    return workerRepository.findResultByTaskId(taskId);
  }
}

export const workerService = new WorkerService();
export default workerService;
