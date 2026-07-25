import { IntentAnalysis, RequestType } from '../types/boss.types.js';

export class IntentAnalyzer {
  public analyzeIntent(prompt: string, voiceTranscript?: string): IntentAnalysis {
    const text = `${prompt} ${voiceTranscript || ''}`.toLowerCase();

    let requestType: RequestType = 'analysis';
    if (text.includes('report') || text.includes('executive summary') || text.includes('pdf')) {
      requestType = 'report';
    } else if (text.includes('audit') || text.includes('compliance') || text.includes('review')) {
      requestType = 'audit';
    } else if (text.includes('research') || text.includes('scrape') || text.includes('search')) {
      requestType = 'research';
    } else if (text.includes('strategy') || text.includes('plan') || text.includes('roadmap')) {
      requestType = 'strategy';
    } else if (text.includes('build') || text.includes('execute') || text.includes('create')) {
      requestType = 'execution';
    }

    let urgency: 'low' | 'medium' | 'high' | 'critical' = 'medium';
    if (text.includes('asap') || text.includes('urgent') || text.includes('critical') || text.includes('immediately')) {
      urgency = 'critical';
    } else if (text.includes('high priority') || text.includes('quick')) {
      urgency = 'high';
    } else if (text.includes('whenever') || text.includes('low priority')) {
      urgency = 'low';
    }

    // Goal extraction logic
    const primaryGoal = prompt.length > 80 ? prompt.substring(0, 77) + '...' : prompt;
    const secondaryGoals: string[] = [];
    const hiddenGoals: string[] = [];

    if (text.includes('finance') || text.includes('cost') || text.includes('budget')) {
      secondaryGoals.push('Financial Analysis & Cost Optimization');
    }
    if (text.includes('legal') || text.includes('compliance') || text.includes('gdpr')) {
      secondaryGoals.push('Legal & Regulatory Compliance Assertion');
    }
    if (text.includes('data') || text.includes('metrics') || text.includes('analytics')) {
      secondaryGoals.push('Data Science Telemetry & Extraction');
    }

    hiddenGoals.push('Verify cross-departmental dependencies');
    hiddenGoals.push('Ensure 95%+ confidence rating before CEO approval');

    const confidence = Math.min(0.99, 0.85 + (prompt.length > 30 ? 0.1 : 0.05));

    return {
      primaryGoal,
      secondaryGoals,
      hiddenGoals,
      requestType,
      urgency,
      priority: urgency === 'critical' ? 10 : urgency === 'high' ? 8 : 5,
      confidence,
      expectedOutput: 'Synthesized Multi-Agent Executive Blueprint & Workflow Execution Plan',
      successCriteria: [
        '100% Departmental Task Resolution',
        'Zero Unhandled Exception Invocations',
        'CEO Validation Quality Score >= 95/100',
      ],
    };
  }
}

export const intentAnalyzer = new IntentAnalyzer();
export default intentAnalyzer;
