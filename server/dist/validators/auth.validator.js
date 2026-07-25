"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters.'),
    email: zod_1.z.string().email('Invalid email address.'),
    password: zod_1.z.string().min(8, 'Password must be at least 8 characters.'),
    role: zod_1.z.enum(['admin', 'manager', 'operator', 'viewer', 'guest']).optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address.'),
    password: zod_1.z.string().min(1, 'Password is required.'),
});
exports.refreshTokenSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(1, 'Refresh token is required.'),
});
