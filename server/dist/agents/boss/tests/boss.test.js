"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const intent_analyzer_js_1 = require("../planner/intent.analyzer.js");
const complexity_engine_js_1 = require("../planner/complexity.engine.js");
const department_discovery_js_1 = require("../planner/department.discovery.js");
const workflow_planner_js_1 = require("../planner/workflow.planner.js");
const validation_engine_js_1 = require("../planner/validation.engine.js");
async function runBossAgentTests() {
    console.log('🧪 Starting Boss Agent Unit Tests...');
    // Test 1: Intent Analysis
    const prompt = 'Audit our Q4 enterprise marketing performance and calculate financial ROI.';
    const intent = intent_analyzer_js_1.intentAnalyzer.analyzeIntent(prompt);
    console.assert(intent.requestType === 'audit', 'Test 1 Failed: Request type should be audit');
    console.assert(intent.secondaryGoals.length > 0, 'Test 1 Failed: Secondary goals should be extracted');
    console.log('✅ Test 1 Passed: Intent Analysis');
    // Test 2: Complexity Estimation
    const complexity = complexity_engine_js_1.complexityEngine.estimateComplexity(prompt, intent);
    console.assert(complexity.level !== undefined, 'Test 2 Failed: Complexity level defined');
    console.assert(complexity.estimatedWorkers >= 2, 'Test 2 Failed: Workers estimated');
    console.log('✅ Test 2 Passed: Complexity Estimation');
    // Test 3: Department Discovery
    const depts = department_discovery_js_1.departmentDiscoveryEngine.discoverDepartments(prompt, intent);
    console.assert(depts.length >= 2, 'Test 3 Failed: Should discover at least 2 departments');
    console.log('✅ Test 3 Passed: Department Discovery');
    // Test 4: Workflow Graph Generation
    const graph = workflow_planner_js_1.workflowPlanner.planGraph(depts);
    console.assert(graph.stages.length === 4, 'Test 4 Failed: Should generate 4 workflow stages');
    console.assert(graph.edges.length === 4, 'Test 4 Failed: Should generate 4 DAG edges');
    console.log('✅ Test 4 Passed: Workflow Graph Generation');
    // Test 5: Self-Validation Engine
    const validation = validation_engine_js_1.bossValidationEngine.validateWorkflow(prompt, graph);
    console.assert(validation.valid === true, 'Test 5 Failed: Workflow should be valid');
    console.assert(validation.bossDecision === 'ready_for_supervisor', 'Test 5 Failed: Decision should be ready_for_supervisor');
    console.log('✅ Test 5 Passed: Boss Self-Validation Engine');
    console.log('🎉 All 5 Boss Agent Unit Tests Passed Successfully!');
}
runBossAgentTests().catch(console.error);
