import { bossRepository } from '../repository/boss.repository.js';
import { IBossMemory, IBossWorkflow } from '../models/boss.model.js';

export class ContextEngine {
  public async getContext(conversationId: string, userId: string): Promise<{ memory: IBossMemory; history: IBossWorkflow[] }> {
    const memory = await bossRepository.getOrCreateMemory(conversationId, userId);
    const history = await bossRepository.getWorkflowsByConversation(conversationId);
    return { memory, history };
  }
}

export const contextEngine = new ContextEngine();
export default contextEngine;
