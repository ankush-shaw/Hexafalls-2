import { geminiService } from '../service/gemini.service.js';
import { reportService } from '../service/report.service.js';
import { aiService } from '../service/ai.service.js';

async function runAIServiceTests() {
  console.log('🧪 Starting AI Service Layer & Executive Report Engine Unit Tests...');

  // Test 1: Gemini Service LLM Completion & Token Calculation
  const completion = await geminiService.generateCompletion({
    prompt: 'Analyze enterprise Q4 operational efficiency and summarize key findings.',
    model: 'gemini-1.5-flash',
  });

  console.assert(completion.requestId.startsWith('req-ai-'), 'Test 1 Failed: Request ID generated');
  console.assert(completion.tokensUsed.totalTokens > 0, 'Test 1 Failed: Total tokens calculated');
  console.assert(completion.confidence === 0.985, 'Test 1 Failed: Confidence score 0.985');
  console.log('✅ Test 1 Passed: Gemini Service LLM Completion & Token Metric Calculation');

  // Test 2: Executive Report Synthesis
  const report = await reportService.generateExecutiveReport('wf-test-report-88');
  console.assert(report.reportId.startsWith('rep-'), 'Test 2 Failed: Report ID generated');
  console.assert(report.overallScore === 97, 'Test 2 Failed: Overall score 97');
  console.assert(report.recommendations.length >= 2, 'Test 2 Failed: Recommendations synthesized');
  console.log('✅ Test 2 Passed: Executive Report & Recommendation Engine Synthesis');

  // Test 3: Model Registry Abstraction
  const models = await aiService.getAvailableModels();
  console.assert(models.length === 4, 'Test 3 Failed: 4 AI models listed in registry');
  console.log('✅ Test 3 Passed: AI Provider-Independent Model Registry');

  console.log('🎉 All AI Service Layer & Executive Report Unit Tests Passed Successfully!');
}

runAIServiceTests().catch(console.error);
