"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const app_config_js_1 = require("./config/app.config.js");
const swagger_config_js_1 = require("./config/swagger.config.js");
const index_js_1 = __importDefault(require("./routes/index.js"));
const healthController = __importStar(require("./controllers/health.controller.js"));
const error_middleware_js_1 = require("./middleware/error.middleware.js");
const logger_js_1 = __importDefault(require("./logger/logger.js"));
const app = (0, express_1.default)();
// ─── Security Middleware ──────────────────────────────────────────────────────
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: app_config_js_1.appConfig.corsOrigin, credentials: true }));
app.use((0, compression_1.default)());
// ─── Rate Limiter ─────────────────────────────────────────────────────────────
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200,
    message: { success: false, message: 'Too many requests. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);
// ─── Body Parsers ─────────────────────────────────────────────────────────────
app.use(express_1.default.json({ limit: '1mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// ─── HTTP Request Logger ──────────────────────────────────────────────────────
app.use((0, morgan_1.default)('combined', {
    stream: { write: (message) => logger_js_1.default.http(message.trim()) },
    skip: (req) => req.url === '/health' || req.url === '/live',
}));
// ─── Health Endpoints ─────────────────────────────────────────────────────────
app.get('/health', healthController.health);
app.get('/live', healthController.live);
app.get('/ready', healthController.ready);
app.get('/system', healthController.system);
// ─── Swagger Docs ─────────────────────────────────────────────────────────────
app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_js_1.swaggerSpec));
// ─── Versioned API Routes ─────────────────────────────────────────────────────
app.use(app_config_js_1.appConfig.apiPrefix, index_js_1.default);
// ─── 404 & Error Handlers ─────────────────────────────────────────────────────
app.use(error_middleware_js_1.notFoundHandler);
app.use(error_middleware_js_1.errorHandler);
exports.default = app;
