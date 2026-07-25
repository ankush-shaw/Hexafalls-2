import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../models/user.model.js';
export declare const authenticate: (req: Request, _res: Response, next: NextFunction) => void;
export declare const authorize: (...roles: UserRole[]) => (req: Request, _res: Response, next: NextFunction) => void;
