"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const user_repository_js_1 = require("../repositories/user.repository.js");
const jwt_js_1 = require("../utils/jwt.js");
const apiError_js_1 = require("../utils/apiError.js");
class AuthService {
    async register(input) {
        const existing = await user_repository_js_1.userRepository.findByEmail(input.email);
        if (existing)
            throw new apiError_js_1.BadRequestError('An account with this email already exists.');
        const user = await user_repository_js_1.userRepository.create({
            name: input.name,
            email: input.email,
            passwordHash: input.password,
            role: input.role ?? 'viewer',
        });
        return this.issueTokens(user);
    }
    async login(input) {
        const user = await user_repository_js_1.userRepository.findByEmail(input.email, true);
        if (!user)
            throw new apiError_js_1.UnauthorizedError('Invalid email or password.');
        const isPasswordValid = await user.comparePassword(input.password);
        if (!isPasswordValid)
            throw new apiError_js_1.UnauthorizedError('Invalid email or password.');
        await user_repository_js_1.userRepository.updateLastLogin(String(user._id));
        const tokens = this.issueTokens(user);
        await user_repository_js_1.userRepository.updateRefreshToken(String(user._id), tokens.refreshToken);
        return tokens;
    }
    async refresh(token) {
        let payload;
        try {
            payload = (0, jwt_js_1.verifyRefreshToken)(token);
        }
        catch {
            throw new apiError_js_1.UnauthorizedError('Invalid or expired refresh token.');
        }
        const user = await user_repository_js_1.userRepository.findById(payload.userId);
        if (!user)
            throw new apiError_js_1.UnauthorizedError('User not found.');
        const tokens = this.issueTokens(user);
        await user_repository_js_1.userRepository.updateRefreshToken(payload.userId, tokens.refreshToken);
        return tokens;
    }
    async logout(userId) {
        await user_repository_js_1.userRepository.updateRefreshToken(userId, null);
    }
    issueTokens(user) {
        const payload = { userId: String(user._id), role: user.role };
        return {
            accessToken: (0, jwt_js_1.generateAccessToken)(payload),
            refreshToken: (0, jwt_js_1.generateRefreshToken)(payload),
            user: {
                id: String(user._id),
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
}
exports.authService = new AuthService();
exports.default = exports.authService;
