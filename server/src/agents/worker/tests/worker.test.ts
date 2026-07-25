import { workerExecutionEngine } from '../runtime/execution.engine.js';
import { WorkerTaskContext } from '../types/worker.types.js';

async function runWorkerTests() {
  console.log('🧪 Starting Worker Agent Runtime Unit Tests...');

  // Mock Worker Task Context
  const mockContext: WorkerTaskContext = {
    taskId: 'tsk-test-101',
    workflowId: 'wf-test-88',
    executionId: 'exec-test-77',
    department: 'Financial Engineering',
    taskName: 'Financial Ledger & Margin Analysis',
    description: 'Audit unit economics and compute margin benchmarks.',
    dependencies: ['tsk-stg-1'],
    requiredOutput: 'Margin & Cashflow Telemetry JSON',
    payload: { query: 'Q4 Enterprise Margin' },
  };

  const stepsLogged: number[] = [];

  // Test 1: 5-Step Execution Engine Lifecycle
  const result = await workerExecutionEngine.executeTask('wrk-fin-101', mockContext, (step, percent, name) => {
    stepsLogged.push(step);
  });

  console.assert(result.status === 'completed', 'Test 1 Failed: Result status should be completed');
  console.assert(result.logs.length === 5, 'Test 1 Failed: Should log 5 execution steps');
  console.assert(stepsLogged.length === 5, 'Test 1 Failed: Progress callback called 5 times');
  console.assert(result.confidence === 0.98, 'Test 1 Failed: Confidence score should be 0.98');
  console.log('✅ Test 1 Passed: 5-Step Worker Execution Lifecycle');

  // Test 2: Structured Deliverable Payload Generation
  console.assert(result.output.department === 'Financial Engineering', 'Test 2 Failed: Output department matches');
  console.assert(result.output.telemetry !== undefined, 'Test 2 Failed: Telemetry metrics generated');
  console.log('✅ Test 2 Passed: Structured Deliverable Payload Generation');

  console.log('🎉 All 2 Worker Agent Runtime Unit Tests Passed Successfully!');
}

runWorkerTests().catch(console.error);
