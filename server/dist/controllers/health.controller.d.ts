import { Request, Response } from 'express';
/**
 * @openapi
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: General health check
 */
export declare const health: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
/**
 * @openapi
 * /live:
 *   get:
 *     tags: [Health]
 *     summary: Liveness check - is the process alive?
 */
export declare const live: (_req: Request, res: Response) => void;
/**
 * @openapi
 * /ready:
 *   get:
 *     tags: [Health]
 *     summary: Readiness check - is the server ready to serve traffic?
 */
export declare const ready: (_req: Request, res: Response) => void;
/**
 * @openapi
 * /system:
 *   get:
 *     tags: [Health]
 *     summary: Full system telemetry
 */
export declare const system: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
