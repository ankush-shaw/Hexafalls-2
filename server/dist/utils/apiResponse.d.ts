import { Response } from 'express';
export interface ApiResponsePayload<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    meta?: Record<string, unknown>;
    timestamp: string;
}
export declare class ApiResponse {
    static success<T>(res: Response, message?: string, data?: T, statusCode?: number, meta?: Record<string, unknown>): Response<any, Record<string, any>>;
    static error(res: Response, message?: string, statusCode?: number, errors?: unknown): Response<any, Record<string, any>>;
}
export default ApiResponse;
