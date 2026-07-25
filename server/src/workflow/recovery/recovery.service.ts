import { workflowRepository } from '../repository/workflow.repository.js';
import { IWorkflowEngineRecord } from '../models/workflow.model.js';
import logger from '../../logger/logger.js';

export class RecoveryService {
  /**
   * Recovers a failed or interrupted workflow from its latest checkpoint
   */
  public async recoverWorkflow(engineWorkflowId: string): Promise<IWorkflowEngineRecord> {
    const record = await workflowRepository.findByEngineId(engineWorkflowId);
    if (!record) throw new Error(`Workflow ${engineWorkflowId} not found.`);

    if (record.checkpoints.length === 0) {
      logger.warn(`[RecoveryService] No checkpoints found for ${engineWorkflowId}. Restarting execution from step 0.`);
      record.status = 'running';
      record.progressPercent = 0;
      return record.save();
    }

    const latestCheckpoint = record.checkpoints[record.checkpoints.length - 1];
    logger.info(`[RecoveryService] Restoring workflow ${engineWorkflowId} from checkpoint ${latestCheckpoint.checkpointId} (${latestCheckpoint.progressPercent}%).`);

    record.status = 'recovering';
    record.progressPercent = latestCheckpoint.progressPercent;
    record.completedTaskCount = latestCheckpoint.completedTaskIds.length;
    await record.save();

    // Move to running
    record.status = 'running';
    return record.save();
  }
}

export const recoveryService = new RecoveryService();
export default recoveryService;
