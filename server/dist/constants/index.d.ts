export declare const ROLES: {
    readonly ADMIN: "admin";
    readonly MANAGER: "manager";
    readonly OPERATOR: "operator";
    readonly VIEWER: "viewer";
    readonly GUEST: "guest";
};
export declare const PAGINATION_DEFAULTS: {
    PAGE: number;
    LIMIT: number;
    MAX_LIMIT: number;
};
export declare const JWT_COOKIE_NAME = "aegisos_rt";
export declare const HTTP_STATUS: {
    readonly OK: 200;
    readonly CREATED: 201;
    readonly NO_CONTENT: 204;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly CONFLICT: 409;
    readonly UNPROCESSABLE: 422;
    readonly TOO_MANY: 429;
    readonly INTERNAL: 500;
    readonly SERVICE_UNAVAILABLE: 503;
};
