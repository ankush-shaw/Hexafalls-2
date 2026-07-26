import { Router } from 'express';
import * as aiController from '../controller/ai.controller.js';
import validate from '../../middleware/validate.middleware.js';
import {
  chatRequestSchema,
  reportRequestSchema,
  summarizeRequestSchema,
  recommendRequestSchema,
} from '../validators/ai.validator.js';

const router = Router();

router.post('/chat',      validate(chatRequestSchema),      aiController.chat);
router.post('/report',    validate(reportRequestSchema),    aiController.generateReport);
router.post('/summarize', validate(summarizeRequestSchema), aiController.summarize);
router.post('/recommend', validate(recommendRequestSchema), aiController.recommend);
router.get('/models',     aiController.getModels);
router.get('/usage',      aiController.getUsage);
router.get('/status',     aiController.getStatus);

export default router;
