"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.logout = exports.refresh = exports.login = exports.register = void 0;
const auth_service_js_1 = require("../services/auth.service.js");
const apiResponse_js_1 = require("../utils/apiResponse.js");
const asyncHandler_js_1 = require("../utils/asyncHandler.js");
/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user account
 */
exports.register = (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    const tokens = await auth_service_js_1.authService.register(req.body);
    apiResponse_js_1.ApiResponse.success(res, 'Registration successful.', tokens, 201);
});
/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login with email and password
 */
exports.login = (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    const tokens = await auth_service_js_1.authService.login(req.body);
    apiResponse_js_1.ApiResponse.success(res, 'Login successful.', tokens);
});
/**
 * @openapi
 * /api/v1/auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Refresh access token using refresh token
 */
exports.refresh = (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    const { refreshToken } = req.body;
    const tokens = await auth_service_js_1.authService.refresh(refreshToken);
    apiResponse_js_1.ApiResponse.success(res, 'Token refreshed successfully.', tokens);
});
/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Logout and invalidate refresh token
 */
exports.logout = (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    if (req.user?.userId) {
        await auth_service_js_1.authService.logout(req.user.userId);
    }
    apiResponse_js_1.ApiResponse.success(res, 'Logged out successfully.');
});
/**
 * @openapi
 * /api/v1/auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get current authenticated user info
 */
exports.getMe = (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    apiResponse_js_1.ApiResponse.success(res, 'Current user retrieved.', req.user);
});
