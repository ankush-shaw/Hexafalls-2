import { AnalyzeRequestInput } from '../validators/boss.validator.js';
import { IBossWorkflow } from '../models/boss.model.js';
export declare class BossService {
    /**
     * Analyze prompt and generate Boss Workflow Blueprint (does not send to Supervisor yet)
     */
    analyzeRequest(userId: string, input: AnalyzeRequestInput): Promise<IBossWorkflow>;
    /**
     * Finalize and approve workflow, hand off to Supervisor queue
     */
    approveAndHandOffToSupervisor(workflowId: string): Promise<IBossWorkflow>;
    getWorkflowById(workflowId: string): Promise<IBossWorkflow | null>;
    getUserHistory(userId: string): Promise<IBossWorkflow[]>;
}
export declare const bossService: BossService;
export default bossService;
