import { Router } from 'express';
import * as supervisorController from '../controller/supervisor.controller.js';
import validate from '../../../middleware/validate.middleware.js';
import {
  startExecutionSchema,
  retryTaskSchema,
  cancelExecutionSchema,
} from '../validators/supervisor.validator.js';

const router = Router();

router.post('/start',          validate(startExecutionSchema),  supervisorController.start);
router.get('/execution/:id',   supervisorController.getExecution);
router.get('/workers',         supervisorController.getWorkers);
router.post('/retry',          validate(retryTaskSchema),       supervisorController.retry);
router.post('/cancel',         validate(cancelExecutionSchema),  supervisorController.cancel);

export default router;
