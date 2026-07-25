import { workflowParser } from '../planner/workflow.parser.js';
import { dependencyEngine } from '../dependency/dependency.engine.js';
import { workerCreator } from '../allocator/worker.creator.js';
import { retryEngine } from '../retry/retry.engine.js';
import { resultCollector } from '../collector/result.collector.js';
import { ExecutableTask } from '../types/supervisor.types.js';

async function runSupervisorTests() {
  console.log('🧪 Starting Supervisor AI Unit Tests...');

  // Mock Boss Workflow
  const mockBossWorkflow: any = {
    workflowId: 'wf-test-99',
    graph: {
      stages: [
        { stageId: 'stg-1', name: 'Data Harvesting', department: 'Data Science & AI Intelligence', description: 'Scrape data', dependencies: [], estimatedDurationMs: 20000 },
        { stageId: 'stg-2', name: 'Financial Audit', department: 'Financial Engineering', description: 'Audit ledgers', dependencies: ['stg-1'], estimatedDurationMs: 25000 },
      ],
      edges: [{ fromStageId: 'stg-1', toStageId: 'stg-2' }],
      executionStrategy: 'mixed',
    },
  };

  // Test 1: Workflow Parsing into Tasks
  const tasks = workflowParser.parseWorkflow(mockBossWorkflow);
  console.assert(tasks.length === 2, 'Test 1 Failed: Should parse 2 tasks');
  console.assert(tasks[0].subtasks.length === 3, 'Test 1 Failed: Task 1 should have 3 subtasks');
  console.log('✅ Test 1 Passed: Workflow Parsing & Task/Subtask Generation');

  // Test 2: DAG Validation
  const dagResult = dependencyEngine.validateDAG(tasks);
  console.assert(dagResult.valid === true, 'Test 2 Failed: DAG should be valid');
  console.log('✅ Test 2 Passed: DAG Graph Validation');

  // Test 3: Ready Task Calculation
  const readyTasks = dependencyEngine.getReadyTasks(tasks);
  console.assert(readyTasks.length === 1, 'Test 3 Failed: Only Stage 1 should be ready initially');
  console.assert(readyTasks[0].taskId === 'tsk-stg-1', 'Test 3 Failed: Task 1 should be ready');
  console.log('✅ Test 3 Passed: Ready Task Dependency Calculation');

  // Test 4: Dynamic Worker Creation
  const workers = workerCreator.createWorkersForTasks(tasks);
  console.assert(workers.length === 2, 'Test 4 Failed: Should spawn 2 dynamic worker nodes');
  console.log('✅ Test 4 Passed: Dynamic Worker Node Spawning');

  // Test 5: Retry Engine Exponential Backoff
  const sampleTask: ExecutableTask = { ...tasks[0], retryCount: 0, maxRetries: 3 };
  console.assert(retryEngine.shouldRetry(sampleTask) === true, 'Test 5 Failed: Should allow retry');
  retryEngine.prepareRetry(sampleTask);
  console.assert(sampleTask.retryCount === 1, 'Test 5 Failed: Retry count incremented');
  console.assert(retryEngine.getBackoffDelayMs(1) === 2000, 'Test 5 Failed: 2s backoff for retry 1');
  console.log('✅ Test 5 Passed: Retry Engine & Backoff Strategy');

  // Test 6: Result Collector
  tasks[0].status = 'completed';
  tasks[0].resultData = { summary: 'Data harvested successfully.' };
  tasks[1].status = 'completed';
  tasks[1].resultData = { summary: 'Ledgers audited successfully.' };
  const finalResults = resultCollector.collectResults(tasks);
  console.assert(finalResults.completedTasks === 2, 'Test 6 Failed: 2 tasks completed');
  console.log('✅ Test 6 Passed: Result Collector');

  console.log('🎉 All 6 Supervisor AI Unit Tests Passed Successfully!');
}

runSupervisorTests().catch(console.error);
