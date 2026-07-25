import { Router } from 'express';
import * as bossController from '../controller/boss.controller.js';
import validate from '../../../middleware/validate.middleware.js';
import { authenticate } from '../../../middleware/auth.middleware.js';
import { analyzeRequestSchema } from '../validators/boss.validator.js';

const router = Router();

// Public / Authenticated Boss Agent REST endpoints
router.post('/analyze',      validate(analyzeRequestSchema), bossController.analyze);
router.post('/workflow',     bossController.createWorkflow);
router.get('/workflow/:id',  bossController.getWorkflow);
router.get('/context',       bossController.getContext);
router.get('/history',       bossController.getHistory);

export default router;
