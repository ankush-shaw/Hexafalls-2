import { workflowRepository } from '../repository/workflow.repository.js';
import { checkpointService } from '../checkpoint/checkpoint.service.js';
import { recoveryService } from '../recovery/recovery.service.js';
import { supervisorService } from '../../agents/supervisor/service/supervisor.service.js';
import { socketManager, SOCKET_EVENTS } from '../../socket/socketManager.js';
import { queueManager, QUEUE_NAMES } from '../../queue/queueManager.js';
import { CreateWorkflowEngineInput } from '../validators/workflow.validator.js';
import { IWorkflowEngineRecord } from '../models/workflow.model.js';
import logger from '../../logger/logger.js';

export class WorkflowService {
  /**
   * Register a new workflow in the Workflow Engine
   */
  public async createWorkflow(userId: string, input: CreateWorkflowEngineInput): Promise<IWorkflowEngineRecord> {
    const engineWorkflowId = `eng-wf-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const record = await workflowRepository.createRecord({
      engineWorkflowId,
      bossWorkflowId: input.bossWorkflowId,
      conversationId: input.conversationId,
      userId: userId as any,
      name: input.name || 'AI Engine Execution',
      status: 'created',
      priority: input.priority || 5,
      executionStrategy: input.executionStrategy || 'mixed',
      progressPercent: 0,
      completedTaskCount: 0,
      totalTaskCount: 4,
      retryCount: 0,
      checkpoints: [],
    });

    logger.info(`[WorkflowEngine] Registered workflow ${engineWorkflowId} (Boss WF: ${input.bossWorkflowId}).`);
    socketManager.emit(SOCKET_EVENTS.WORKFLOW_STARTED, {
      engineWorkflowId,
      bossWorkflowId: input.bossWorkflowId,
      status: 'created',
    });

    return record;
  }

  /**
   * Start executing workflow in the Engine, triggering Supervisor AI COO
   */
  public async startWorkflow(engineWorkflowId: string): Promise<IWorkflowEngineRecord> {
    const record = await workflowRepository.findByEngineId(engineWorkflowId);
    if (!record) throw new Error(`Workflow Engine record ${engineWorkflowId} not found.`);

    record.status = 'running';
    record.startedAt = new Date();
    await record.save();

    logger.info(`[WorkflowEngine] Starting execution for ${engineWorkflowId}. Triggering Supervisor COO...`);

    // Trigger Supervisor AI Orchestration
    const supervisorExecution = await supervisorService.startOrchestration(
      String(record.userId),
      record.bossWorkflowId,
      record.executionStrategy
    );

    record.supervisorExecutionId = supervisorExecution.executionId;
    await record.save();

    // Save initial checkpoint (0%)
    await checkpointService.saveCheckpoint(engineWorkflowId, supervisorExecution.executionId, 1, [], 0);

    socketManager.emit(SOCKET_EVENTS.WORKFLOW_STARTED, {
      engineWorkflowId,
      supervisorExecutionId: supervisorExecution.executionId,
      status: 'running',
    });

    return record;
  }

  /**
   * Pause active workflow
   */
  public async pauseWorkflow(engineWorkflowId: string): Promise<IWorkflowEngineRecord> {
    const record = await workflowRepository.updateStatus(engineWorkflowId, 'paused');
    if (!record) throw new Error(`Workflow ${engineWorkflowId} not found.`);

    logger.info(`[WorkflowEngine] Workflow ${engineWorkflowId} paused.`);
    socketManager.emit('workflow_paused', { engineWorkflowId, status: 'paused' });

    return record;
  }

  /**
   * Resume paused workflow
   */
  public async resumeWorkflow(engineWorkflowId: string): Promise<IWorkflowEngineRecord> {
    const record = await workflowRepository.updateStatus(engineWorkflowId, 'running');
    if (!record) throw new Error(`Workflow ${engineWorkflowId} not found.`);

    logger.info(`[WorkflowEngine] Workflow ${engineWorkflowId} resumed.`);
    socketManager.emit('workflow_resumed', { engineWorkflowId, status: 'running' });

    return record;
  }

  /**
   * Cancel active workflow
   */
  public async cancelWorkflow(engineWorkflowId: string): Promise<IWorkflowEngineRecord> {
    const record = await workflowRepository.updateStatus(engineWorkflowId, 'cancelled');
    if (!record) throw new Error(`Workflow ${engineWorkflowId} not found.`);

    logger.info(`[WorkflowEngine] Workflow ${engineWorkflowId} cancelled.`);
    socketManager.emit('workflow_cancelled', { engineWorkflowId, status: 'cancelled' });

    return record;
  }

  /**
   * Retry failed workflow from checkpoint
   */
  public async retryWorkflow(engineWorkflowId: string): Promise<IWorkflowEngineRecord> {
    const record = await recoveryService.recoverWorkflow(engineWorkflowId);
    record.retryCount += 1;
    await record.save();

    logger.info(`[WorkflowEngine] Workflow ${engineWorkflowId} retried (Attempt #${record.retryCount}).`);
    socketManager.emit('workflow_retry', { engineWorkflowId, retryCount: record.retryCount });

    return record;
  }

  public async getWorkflowById(engineWorkflowId: string): Promise<IWorkflowEngineRecord | null> {
    return workflowRepository.findByEngineId(engineWorkflowId);
  }

  public async getUserHistory(userId: string): Promise<IWorkflowEngineRecord[]> {
    return workflowRepository.getUserHistory(userId);
  }
}

export const workflowService = new WorkflowService();
export default workflowService;
