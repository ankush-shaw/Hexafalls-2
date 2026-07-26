import { geminiService } from './gemini.service.js';
import { reportService } from './report.service.js';
import { aiRepository } from '../repository/ai.repository.js';
import { AICompletionRequest, AICompletionResponse, ExecutiveReportData } from '../types/ai.types.js';

export class AIService {
  public async generateChatResponse(request: AICompletionRequest): Promise<AICompletionResponse> {
    const response = await geminiService.generateCompletion(request);
    try {
      await aiRepository.logRequest(response, request.prompt, request.workflowId, request.conversationId);
    } catch {
      // Offline fallback
    }
    return response;
  }

  public async generateExecutiveReport(workflowId: string, title?: string): Promise<ExecutiveReportData> {
    return reportService.generateExecutiveReport(workflowId, title);
  }

  public async summarizeContent(content: string, maxLength = 300): Promise<{ summary: string; tokensUsed: number }> {
    const prompt = `Summarize the following text in under ${maxLength} characters:\n\n${content}`;
    const response = await geminiService.generateCompletion({ prompt });
    return {
      summary: response.text,
      tokensUsed: response.tokensUsed.totalTokens,
    };
  }

  public async getAvailableModels() {
    return [
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash (High Speed)', provider: 'Google AI', status: 'available' },
      { id: 'gemini-1.5-pro',   name: 'Gemini 1.5 Pro (Reasoning & Reports)', provider: 'Google AI', status: 'available' },
      { id: 'gpt-4o',           name: 'GPT-4o (Fallback)', provider: 'OpenAI', status: 'ready' },
      { id: 'claude-3.5-sonnet',name: 'Claude 3.5 Sonnet (Fallback)', provider: 'Anthropic', status: 'ready' },
    ];
  }

  public async getTokenUsageMetrics() {
    return aiRepository.getTotalTokenUsage();
  }
}

export const aiService = new AIService();
export default aiService;
