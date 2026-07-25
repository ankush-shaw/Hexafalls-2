"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contextEngine = exports.ContextEngine = void 0;
const boss_repository_js_1 = require("../repository/boss.repository.js");
class ContextEngine {
    async getContext(conversationId, userId) {
        const memory = await boss_repository_js_1.bossRepository.getOrCreateMemory(conversationId, userId);
        const history = await boss_repository_js_1.bossRepository.getWorkflowsByConversation(conversationId);
        return { memory, history };
    }
}
exports.ContextEngine = ContextEngine;
exports.contextEngine = new ContextEngine();
exports.default = exports.contextEngine;
