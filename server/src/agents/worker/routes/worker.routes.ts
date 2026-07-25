import { Router } from 'express';
import * as workerController from '../controller/worker.controller.js';
import validate from '../../../middleware/validate.middleware.js';
import {
  createWorkerSchema,
  startWorkerTaskSchema,
  stopWorkerSchema,
} from '../validators/worker.validator.js';

const router = Router();

router.post('/create',                 validate(createWorkerSchema),    workerController.createWorker);
router.post('/start',                  validate(startWorkerTaskSchema), workerController.startWorkerTask);
router.post('/stop',                   validate(stopWorkerSchema),      workerController.stopWorker);
router.get('/:id',                     workerController.getWorker);
router.get('/execution/:executionId',  workerController.getWorkersByExecution);
router.get('/result/:taskId',          workerController.getTaskResult);

export default router;
