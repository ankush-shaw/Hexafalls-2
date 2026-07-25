import { Router } from 'express';
import * as workflowController from '../controller/workflow.controller.js';
import validate from '../../middleware/validate.middleware.js';
import {
  createWorkflowEngineSchema,
  startWorkflowEngineSchema,
  workflowActionSchema,
} from '../validators/workflow.validator.js';

const router = Router();

router.post('/create',   validate(createWorkflowEngineSchema), workflowController.createWorkflow);
router.post('/start',    validate(startWorkflowEngineSchema),  workflowController.startWorkflow);
router.post('/pause',    validate(workflowActionSchema),       workflowController.pauseWorkflow);
router.post('/resume',   validate(workflowActionSchema),       workflowController.resumeWorkflow);
router.post('/cancel',   validate(workflowActionSchema),       workflowController.cancelWorkflow);
router.post('/retry',    validate(workflowActionSchema),       workflowController.retryWorkflow);
router.get('/history',   workflowController.getHistory);
router.get('/:id',       workflowController.getWorkflow);

export default router;
