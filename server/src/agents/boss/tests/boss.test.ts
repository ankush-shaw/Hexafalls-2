import { intentAnalyzer } from '../planner/intent.analyzer.js';
import { complexityEngine } from '../planner/complexity.engine.js';
import { departmentDiscoveryEngine } from '../planner/department.discovery.js';
import { workflowPlanner } from '../planner/workflow.planner.js';
import { bossValidationEngine } from '../planner/validation.engine.js';

async function runBossAgentTests() {
  console.log('🧪 Starting Boss Agent Unit Tests...');

  // Test 1: Intent Analysis
  const prompt = 'Audit our Q4 enterprise marketing performance and calculate financial ROI.';
  const intent = intentAnalyzer.analyzeIntent(prompt);
  console.assert(intent.requestType === 'audit', 'Test 1 Failed: Request type should be audit');
  console.assert(intent.secondaryGoals.length > 0, 'Test 1 Failed: Secondary goals should be extracted');
  console.log('✅ Test 1 Passed: Intent Analysis');

  // Test 2: Complexity Estimation
  const complexity = complexityEngine.estimateComplexity(prompt, intent);
  console.assert(complexity.level !== undefined, 'Test 2 Failed: Complexity level defined');
  console.assert(complexity.estimatedWorkers >= 2, 'Test 2 Failed: Workers estimated');
  console.log('✅ Test 2 Passed: Complexity Estimation');

  // Test 3: Department Discovery
  const depts = departmentDiscoveryEngine.discoverDepartments(prompt, intent);
  console.assert(depts.length >= 2, 'Test 3 Failed: Should discover at least 2 departments');
  console.log('✅ Test 3 Passed: Department Discovery');

  // Test 4: Workflow Graph Generation
  const graph = workflowPlanner.planGraph(depts);
  console.assert(graph.stages.length === 4, 'Test 4 Failed: Should generate 4 workflow stages');
  console.assert(graph.edges.length === 4, 'Test 4 Failed: Should generate 4 DAG edges');
  console.log('✅ Test 4 Passed: Workflow Graph Generation');

  // Test 5: Self-Validation Engine
  const validation = bossValidationEngine.validateWorkflow(prompt, graph);
  console.assert(validation.valid === true, 'Test 5 Failed: Workflow should be valid');
  console.assert(validation.bossDecision === 'ready_for_supervisor', 'Test 5 Failed: Decision should be ready_for_supervisor');
  console.log('✅ Test 5 Passed: Boss Self-Validation Engine');

  console.log('🎉 All 5 Boss Agent Unit Tests Passed Successfully!');
}

runBossAgentTests().catch(console.error);
