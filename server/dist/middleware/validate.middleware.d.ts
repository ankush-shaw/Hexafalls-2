import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
export type ValidationTarget = 'body' | 'query' | 'params';
export declare const validate: (schema: ZodSchema, target?: ValidationTarget) => (req: Request, _res: Response, next: NextFunction) => void;
export default validate;
