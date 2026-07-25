import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError.js';
import logger from '../logger/logger.js';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error(`[ErrorHandler] ${req.method} ${req.path} → ${err.message}`);

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // Unhandled error fallback
  res.status(500).json({
    success: false,
    message: 'An unexpected internal server error occurred.',
    timestamp: new Date().toISOString(),
  });
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `Route [${req.method}] ${req.path} not found.`,
    timestamp: new Date().toISOString(),
  });
};
