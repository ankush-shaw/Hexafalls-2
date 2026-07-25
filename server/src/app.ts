import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';

import { appConfig } from './config/app.config.js';
import { swaggerSpec } from './config/swagger.config.js';
import apiRouter from './routes/index.js';
import * as healthController from './controllers/health.controller.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';
import logger from './logger/logger.js';

const app: Application = express();

// ─── Security Middleware ──────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: appConfig.corsOrigin, credentials: true }));
app.use(compression());

// ─── Rate Limiter ─────────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { success: false, message: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// ─── Body Parsers ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── HTTP Request Logger ──────────────────────────────────────────────────────
app.use(
  morgan('combined', {
    stream: { write: (message) => logger.http(message.trim()) },
    skip: (req) => req.url === '/health' || req.url === '/live',
  })
);

// ─── Health Endpoints ─────────────────────────────────────────────────────────
app.get('/health', healthController.health);
app.get('/live',   healthController.live);
app.get('/ready',  healthController.ready);
app.get('/system', healthController.system);

// ─── Swagger Docs ─────────────────────────────────────────────────────────────
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ─── Versioned API Routes ─────────────────────────────────────────────────────
app.use(appConfig.apiPrefix, apiRouter);

// ─── 404 & Error Handlers ─────────────────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
