"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const apiError_js_1 = require("../utils/apiError.js");
const logger_js_1 = __importDefault(require("../logger/logger.js"));
const errorHandler = (err, req, res, _next) => {
    logger_js_1.default.error(`[ErrorHandler] ${req.method} ${req.path} → ${err.message}`);
    if (err instanceof apiError_js_1.ApiError) {
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
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route [${req.method}] ${req.path} not found.`,
        timestamp: new Date().toISOString(),
    });
};
exports.notFoundHandler = notFoundHandler;
