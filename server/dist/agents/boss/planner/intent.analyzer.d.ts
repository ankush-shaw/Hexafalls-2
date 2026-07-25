import { IntentAnalysis } from '../types/boss.types.js';
export declare class IntentAnalyzer {
    analyzeIntent(prompt: string, voiceTranscript?: string): IntentAnalysis;
}
export declare const intentAnalyzer: IntentAnalyzer;
export default intentAnalyzer;
