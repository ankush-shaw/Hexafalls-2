"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jwt_js_1 = require("../utils/jwt.js");
const apiError_js_1 = require("../utils/apiError.js");
const authenticate = (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new apiError_js_1.UnauthorizedError('No authentication token provided.'));
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = (0, jwt_js_1.verifyAccessToken)(token);
        req.user = payload;
        next();
    }
    catch {
        next(new apiError_js_1.UnauthorizedError('Invalid or expired access token.'));
    }
};
exports.authenticate = authenticate;
const authorize = (...roles) => {
    return (req, _res, next) => {
        if (!req.user) {
            return next(new apiError_js_1.UnauthorizedError('User not authenticated.'));
        }
        if (!roles.includes(req.user.role)) {
            return next(new apiError_js_1.ForbiddenError('You do not have permission to perform this action.'));
        }
        next();
    };
};
exports.authorize = authorize;
