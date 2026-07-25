import { Request, Response } from 'express';
import { authService } from '../services/auth.service.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user account
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const tokens = await authService.register(req.body);
  ApiResponse.success(res, 'Registration successful.', tokens, 201);
});

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login with email and password
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const tokens = await authService.login(req.body);
  ApiResponse.success(res, 'Login successful.', tokens);
});

/**
 * @openapi
 * /api/v1/auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Refresh access token using refresh token
 */
export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const tokens = await authService.refresh(refreshToken);
  ApiResponse.success(res, 'Token refreshed successfully.', tokens);
});

/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Logout and invalidate refresh token
 */
export const logout = asyncHandler(async (req: Request, res: Response) => {
  if (req.user?.userId) {
    await authService.logout(req.user.userId);
  }
  ApiResponse.success(res, 'Logged out successfully.');
});

/**
 * @openapi
 * /api/v1/auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get current authenticated user info
 */
export const getMe = asyncHandler(async (req: Request, res: Response) => {
  ApiResponse.success(res, 'Current user retrieved.', req.user);
});
