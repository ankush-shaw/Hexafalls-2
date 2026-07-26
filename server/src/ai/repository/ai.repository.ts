import { AIRequestRecord, ExecutiveReportRecord, IAIRequestRecord, IExecutiveReportRecord } from '../models/ai.model.js';
import { AICompletionResponse, ExecutiveReportData } from '../types/ai.types.js';

export class AIRepository {
  async logRequest(response: AICompletionResponse, prompt: string, workflowId?: string, conversationId?: string): Promise<IAIRequestRecord> {
    const record = new AIRequestRecord({
      requestId: response.requestId,
      workflowId,
      conversationId,
      aiModel: response.model,
      prompt,
      responseText: response.text,
      inputTokens: response.tokensUsed.inputTokens,
      outputTokens: response.tokensUsed.outputTokens,
      totalTokens: response.tokensUsed.totalTokens,
      durationMs: response.durationMs,
    });

    return record.save();
  }

  async saveReport(data: ExecutiveReportData): Promise<IExecutiveReportRecord> {
    const report = new ExecutiveReportRecord(data);
    return report.save();
  }

  async findReportByWorkflowId(workflowId: string): Promise<IExecutiveReportRecord | null> {
    return ExecutiveReportRecord.findOne({ workflowId }).exec();
  }

  async getTotalTokenUsage(): Promise<{ totalInput: number; totalOutput: number; totalTokens: number }> {
    const result = await AIRequestRecord.aggregate([
      {
        $group: {
          _id: null,
          totalInput: { $sum: '$inputTokens' },
          totalOutput: { $sum: '$outputTokens' },
          totalTokens: { $sum: '$totalTokens' },
        },
      },
    ]).exec();

    if (result.length > 0) {
      return {
        totalInput: result[0].totalInput,
        totalOutput: result[0].totalOutput,
        totalTokens: result[0].totalTokens,
      };
    }

    return { totalInput: 0, totalOutput: 0, totalTokens: 0 };
  }
}

export const aiRepository = new AIRepository();
export default aiRepository;
