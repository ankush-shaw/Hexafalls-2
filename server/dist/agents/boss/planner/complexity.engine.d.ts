import { ComplexityEstimation, IntentAnalysis } from '../types/boss.types.js';
export declare class ComplexityEngine {
    estimateComplexity(prompt: string, intent: IntentAnalysis): ComplexityEstimation;
}
export declare const complexityEngine: ComplexityEngine;
export default complexityEngine;
