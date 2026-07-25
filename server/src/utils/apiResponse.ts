import { Response } from 'express';

export interface ApiResponsePayload<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta?: Record<string, unknown>;
  timestamp: string;
}

export class ApiResponse {
  static success<T>(
    res: Response,
    message: string = 'Success',
    data?: T,
    statusCode: number = 200,
    meta?: Record<string, unknown>
  ) {
    const responsePayload: ApiResponsePayload<T> = {
      success: true,
      message,
      data,
      meta,
      timestamp: new Date().toISOString(),
    };
    return res.status(statusCode).json(responsePayload);
  }

  static error(
    res: Response,
    message: string = 'Internal Server Error',
    statusCode: number = 500,
    errors?: unknown
  ) {
    const responsePayload = {
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString(),
    };
    return res.status(statusCode).json(responsePayload);
  }
}

export default ApiResponse;
