"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUS = exports.JWT_COOKIE_NAME = exports.PAGINATION_DEFAULTS = exports.ROLES = void 0;
exports.ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    OPERATOR: 'operator',
    VIEWER: 'viewer',
    GUEST: 'guest',
};
exports.PAGINATION_DEFAULTS = {
    PAGE: 1,
    LIMIT: 20,
    MAX_LIMIT: 100,
};
exports.JWT_COOKIE_NAME = 'aegisos_rt';
exports.HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE: 422,
    TOO_MANY: 429,
    INTERNAL: 500,
    SERVICE_UNAVAILABLE: 503,
};
