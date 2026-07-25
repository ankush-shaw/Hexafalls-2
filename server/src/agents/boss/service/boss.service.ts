import { intentAnalyzer } from '../planner/intent.analyzer.js';
import { complexityEngine } from '../planner/complexity.engine.js';
import { departmentDiscoveryEngine } from '../planner/department.discovery.js';
import { workflowPlanner } from '../planner/workflow.planner.js';

import { bossValidationEngine } from '../planner/validation.engine.js';
import { bossRepository } from '../repository/boss.repository.js';
import { socketManager, SOCKET_EVENTS } from '../../../socket/socketManager.js';
import { queueManager, QUEUE_NAMES } from '../../../queue/queueManager.js';
import { AnalyzeRequestInput } from '../validators/boss.validator.js';
import { IBossWorkflow } from '../models/boss.model.js';
import logger from '../../../logger/logger.js';

export class BossService {
  /**
   * Analyze prompt and generate Boss Workflow Blueprint (does not send to Supervisor yet)
   */
  public async analyzeRequest(userId: string, input: AnalyzeRequestInput): Promise<IBossWorkflow> {
    const startTime = Date.now();
    const conversationId = input.conversationId || `conv-${Date.now()}`;
    const workflowId = `wf-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    logger.info(`[BossService] Received analysis request for prompt: "${input.prompt.substring(0, 50)}..."`);
    socketManager.emit(SOCKET_EVENTS.BOSS_STARTED, { workflowId, conversationId, status: 'receiving' });

    // Step 1: Intent Analysis
    socketManager.emit(SOCKET_EVENTS.BOSS_ANALYZING, { workflowId, step: 'intent_analysis' });
    const intent = intentAnalyzer.analyzeIntent(input.prompt, input.voiceTranscript);

    // Step 2: Complexity Estimation
    socketManager.emit(SOCKET_EVENTS.BOSS_ANALYZING, { workflowId, step: 'complexity_estimation' });
    const complexity = complexityEngine.estimateComplexity(input.prompt, intent);

    // Step 3: Department Discovery
    socketManager.emit(SOCKET_EVENTS.BOSS_ANALYZING, { workflowId, step: 'department_discovery' });
    const departments = departmentDiscoveryEngine.discoverDepartments(input.prompt, intent);

    // Step 4: Workflow Graph Generation
    socketManager.emit(SOCKET_EVENTS.BOSS_PLANNING, { workflowId, step: 'graph_generation' });
    const graph = workflowPlanner.planGraph(departments);

    // Step 5: Self-Validation
    socketManager.emit(SOCKET_EVENTS.BOSS_PLANNING, { workflowId, step: 'self_validation' });
    const validation = bossValidationEngine.validateWorkflow(input.prompt, graph);

    const planningDurationMs = Date.now() - startTime;

    // Save to Database
    const workflow = await bossRepository.createWorkflow({
      workflowId,
      workflowName: `Strategy Blueprint: ${intent.primaryGoal.substring(0, 40)}`,
      conversationId,
      userId: userId as any,
      prompt: input.prompt,
      voiceTranscript: input.voiceTranscript,
      intent,
      complexity,
      departments,
      graph,
      bossDecision: validation.bossDecision,
      decisionRationale: validation.rationale,
      overallConfidence: validation.overallConfidence,
      status: 'planning',
      planningDurationMs,
    });

    await bossRepository.logDecision(workflowId, validation.bossDecision, validation.rationale, validation.overallConfidence);
    await bossRepository.addWorkflowToMemory(conversationId, workflowId);

    socketManager.emit(SOCKET_EVENTS.BOSS_STEP, {
      workflowId,
      status: 'planning',
      intent,
      complexity,
      departments,
      decision: validation.bossDecision,
    });

    return workflow;
  }

  /**
   * Finalize and approve workflow, hand off to Supervisor queue
   */
  public async approveAndHandOffToSupervisor(workflowId: string): Promise<IBossWorkflow> {
    const workflow = await bossRepository.findWorkflowById(workflowId);
    if (!workflow) {
      throw new Error(`Workflow ${workflowId} not found.`);
    }

    workflow.status = 'completed';
    workflow.bossDecision = 'ready_for_supervisor';
    await workflow.save();

    await bossRepository.logDecision(
      workflowId,
      'ready_for_supervisor',
      'CEO Boss Agent approved strategy blueprint and dispatched execution plan to Supervisor COO Queue.',
      workflow.overallConfidence
    );

    // Emit Socket Event
    socketManager.emit(SOCKET_EVENTS.BOSS_APPROVED, {
      workflowId,
      status: 'completed',
      bossDecision: 'ready_for_supervisor',
      departments: workflow.departments,
      stages: workflow.graph.stages,
    });

    // Delegate to Supervisor BullMQ Queue
    const supervisorJob = await queueManager.addJob(QUEUE_NAMES.SUPERVISOR, 'orchestrate_workflow', {
      workflowId: workflow.workflowId,
      conversationId: workflow.conversationId,
      prompt: workflow.prompt,
      departments: workflow.departments,
      graph: workflow.graph,
    });

    logger.info(`[BossService] Workflow ${workflowId} approved and delegated to Supervisor BullMQ Queue.`);
    return workflow;
  }

  public async getWorkflowById(workflowId: string): Promise<IBossWorkflow | null> {
    return bossRepository.findWorkflowById(workflowId);
  }

  public async getUserHistory(userId: string): Promise<IBossWorkflow[]> {
    return bossRepository.getWorkflowsByUser(userId);
  }
}

export const bossService = new BossService();
export default bossService;
