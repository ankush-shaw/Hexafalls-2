import { Router } from 'express';
import authRoutes from './auth.routes.js';
import bossRoutes from '../agents/boss/routes/boss.routes.js';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/boss', bossRoutes);

// Future phase routes:
// apiRouter.use('/supervisor', supervisorRoutes);
// apiRouter.use('/workers',   workerRoutes);
// apiRouter.use('/reports',   reportRoutes);

export default apiRouter;

