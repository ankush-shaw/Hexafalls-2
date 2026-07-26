import { Router } from 'express';
import * as platformController from '../controller/platform.controller.js';

const router = Router();

router.get('/metrics',  platformController.getMetrics);
router.get('/audit',    platformController.getAuditLogs);
router.get('/security', platformController.getSecurityStatus);
router.post('/backup',  platformController.triggerBackup);

export default router;
