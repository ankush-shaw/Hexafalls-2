import { WorkflowGraph, BossDecision } from '../types/boss.types.js';
export interface ValidationResult {
    valid: boolean;
    bossDecision: BossDecision;
    rationale: string;
    overallConfidence: number;
}
export declare class BossValidationEngine {
    validateWorkflow(prompt: string, graph: WorkflowGraph): ValidationResult;
}
export declare const bossValidationEngine: BossValidationEngine;
export default bossValidationEngine;
