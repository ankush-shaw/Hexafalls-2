"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    static success(res, message = 'Success', data, statusCode = 200, meta) {
        const responsePayload = {
            success: true,
            message,
            data,
            meta,
            timestamp: new Date().toISOString(),
        };
        return res.status(statusCode).json(responsePayload);
    }
    static error(res, message = 'Internal Server Error', statusCode = 500, errors) {
        const responsePayload = {
            success: false,
            message,
            errors,
            timestamp: new Date().toISOString(),
        };
        return res.status(statusCode).json(responsePayload);
    }
}
exports.ApiResponse = ApiResponse;
exports.default = ApiResponse;
