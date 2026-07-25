"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.complexityEngine = exports.ComplexityEngine = void 0;
class ComplexityEngine {
    estimateComplexity(prompt, intent) {
        const wordCount = prompt.split(/\s+/).length;
        const secondaryCount = intent.secondaryGoals.length;
        let level = 'simple';
        let durationMs = 45000;
        let workers = 2;
        let queueSize = 2;
        if (wordCount > 100 || secondaryCount >= 3 || intent.requestType === 'audit') {
            level = 'enterprise';
            durationMs = 185000;
            workers = 6;
            queueSize = 8;
        }
        else if (wordCount > 50 || secondaryCount >= 2 || intent.requestType === 'strategy') {
            level = 'complex';
            durationMs = 120000;
            workers = 4;
            queueSize = 5;
        }
        else if (wordCount > 20 || secondaryCount >= 1) {
            level = 'medium';
            durationMs = 75000;
            workers = 3;
            queueSize = 3;
        }
        return {
            level,
            estimatedDurationMs: durationMs,
            estimatedWorkers: workers,
            estimatedQueueSize: queueSize,
            rationale: `Evaluated as ${level.toUpperCase()} based on ${wordCount} words, ${secondaryCount} secondary domain goals, and request type [${intent.requestType}].`,
        };
    }
}
exports.ComplexityEngine = ComplexityEngine;
exports.complexityEngine = new ComplexityEngine();
exports.default = exports.complexityEngine;
