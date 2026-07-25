import { IBossMemory, IBossWorkflow } from '../models/boss.model.js';
export declare class ContextEngine {
    getContext(conversationId: string, userId: string): Promise<{
        memory: IBossMemory;
        history: IBossWorkflow[];
    }>;
}
export declare const contextEngine: ContextEngine;
export default contextEngine;
