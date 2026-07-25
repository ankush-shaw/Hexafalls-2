import { Router } from 'express';
import * as databaseController from '../controller/database.controller.js';

const router = Router();

router.get('/seed',      databaseController.runSeed);
router.get('/analytics', databaseController.getAnalytics);

export default router;
