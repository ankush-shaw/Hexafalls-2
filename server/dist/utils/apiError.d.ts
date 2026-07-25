export declare class ApiError extends Error {
    statusCode: number;
    errors?: unknown;
    constructor(message: string, statusCode?: number, errors?: unknown);
}
export declare class NotFoundError extends ApiError {
    constructor(message?: string);
}
export declare class BadRequestError extends ApiError {
    constructor(message?: string, errors?: unknown);
}
export declare class UnauthorizedError extends ApiError {
    constructor(message?: string);
}
export declare class ForbiddenError extends ApiError {
    constructor(message?: string);
}
