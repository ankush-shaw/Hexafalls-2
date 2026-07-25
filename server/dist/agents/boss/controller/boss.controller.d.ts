/**
 * @openapi
 * /api/v1/boss/analyze:
 *   post:
 *     tags: [Boss]
 *     summary: Boss Agent CEO analyzes user prompt and generates execution blueprint
 */
export declare const analyze: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
/**
 * @openapi
 * /api/v1/boss/workflow:
 *   post:
 *     tags: [Boss]
 *     summary: Boss Agent CEO approves strategy and dispatches to Supervisor COO
 */
export declare const createWorkflow: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
/**
 * @openapi
 * /api/v1/boss/workflow/{id}:
 *   get:
 *     tags: [Boss]
 *     summary: Get Boss Workflow details by ID
 */
export declare const getWorkflow: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
/**
 * @openapi
 * /api/v1/boss/context:
 *   get:
 *     tags: [Boss]
 *     summary: Get conversation context and memory
 */
export declare const getContext: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
/**
 * @openapi
 * /api/v1/boss/history:
 *   get:
 *     tags: [Boss]
 *     summary: Get Boss Agent workflow history for current user
 */
export declare const getHistory: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
