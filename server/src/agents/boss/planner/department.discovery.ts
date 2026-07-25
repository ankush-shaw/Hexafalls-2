import { DepartmentNode, IntentAnalysis } from '../types/boss.types.js';

export class DepartmentDiscoveryEngine {
  public discoverDepartments(prompt: string, intent: IntentAnalysis): DepartmentNode[] {
    const text = prompt.toLowerCase();
    const departments: DepartmentNode[] = [];

    // Always include Data Science / Technical if query is technical
    if (text.includes('data') || text.includes('analytic') || text.includes('scrape') || text.includes('model') || true) {
      departments.push({
        id: 'dept-ds',
        name: 'Data Science & AI Intelligence',
        role: 'Data Harvesting, ML Ingestion & Pattern Mining',
        estimatedTasks: 2,
        priority: 1,
      });
    }

    if (text.includes('finance') || text.includes('cost') || text.includes('budget') || text.includes('revenue') || text.includes('audit')) {
      departments.push({
        id: 'dept-fin',
        name: 'Financial Engineering',
        role: 'Capital Allocation, Margin Audit & Forecasting',
        estimatedTasks: 2,
        priority: 2,
      });
    }

    if (text.includes('legal') || text.includes('compliance') || text.includes('gdpr') || text.includes('policy') || text.includes('audit')) {
      departments.push({
        id: 'dept-leg',
        name: 'Legal & Regulatory Oversight',
        role: 'Compliance Assertion & Risk Matrix Validation',
        estimatedTasks: 1,
        priority: 3,
      });
    }

    if (text.includes('operation') || text.includes('workflow') || text.includes('system') || departments.length < 3) {
      departments.push({
        id: 'dept-ops',
        name: 'Operations & Infrastructure',
        role: 'Process Logistics, Resource Scaling & Queue Allocation',
        estimatedTasks: 2,
        priority: 4,
      });
    }

    return departments;
  }
}

export const departmentDiscoveryEngine = new DepartmentDiscoveryEngine();
export default departmentDiscoveryEngine;
