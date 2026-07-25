import { Router } from 'express';
import authRoutes from './auth.routes.js';
import bossRoutes from '../agents/boss/routes/boss.routes.js';
import supervisorRoutes from '../agents/supervisor/routes/supervisor.routes.js';
import workerRoutes from '../agents/worker/routes/worker.routes.js';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/boss', bossRoutes);
apiRouter.use('/supervisor', supervisorRoutes);
apiRouter.use('/workers', workerRoutes);

// Future phase routes:
// apiRouter.use('/reports',   reportRoutes);

export default apiRouter;



