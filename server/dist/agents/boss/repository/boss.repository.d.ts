import { IBossWorkflow, IBossDecision, IBossMemory } from '../models/boss.model.js';
import { BossStatus, BossDecision } from '../types/boss.types.js';
export declare class BossRepository {
    createWorkflow(data: Partial<IBossWorkflow>): Promise<IBossWorkflow>;
    findWorkflowById(workflowId: string): Promise<IBossWorkflow | null>;
    updateWorkflowStatus(workflowId: string, status: BossStatus, planningDurationMs?: number): Promise<IBossWorkflow | null>;
    setSupervisorJobId(workflowId: string, jobId: string): Promise<IBossWorkflow | null>;
    getWorkflowsByUser(userId: string, limit?: number): Promise<IBossWorkflow[]>;
    getWorkflowsByConversation(conversationId: string): Promise<IBossWorkflow[]>;
    logDecision(workflowId: string, decision: BossDecision, rationale: string, confidence: number): Promise<IBossDecision>;
    getDecisionLogs(workflowId: string): Promise<IBossDecision[]>;
    getOrCreateMemory(conversationId: string, userId: string): Promise<IBossMemory>;
    addWorkflowToMemory(conversationId: string, workflowId: string): Promise<void>;
}
export declare const bossRepository: BossRepository;
export default bossRepository;
