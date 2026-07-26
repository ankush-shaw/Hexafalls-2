import { Router } from 'express';
import authRoutes from './auth.routes.js';
import bossRoutes from '../agents/boss/routes/boss.routes.js';
import supervisorRoutes from '../agents/supervisor/routes/supervisor.routes.js';
import workerRoutes from '../agents/worker/routes/worker.routes.js';
import workflowEngineRoutes from '../workflow/routes/workflow.routes.js';
import communicationRoutes from '../communication/routes/communication.routes.js';
import databaseRoutes from '../database/routes/database.routes.js';
import aiRoutes from '../ai/routes/ai.routes.js';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/boss', bossRoutes);
apiRouter.use('/supervisor', supervisorRoutes);
apiRouter.use('/workers', workerRoutes);
apiRouter.use('/workflows', workflowEngineRoutes);
apiRouter.use('/database', databaseRoutes);
apiRouter.use('/ai', aiRoutes);
apiRouter.use('/reports', aiRoutes);
apiRouter.use('/', communicationRoutes);

export default apiRouter;







