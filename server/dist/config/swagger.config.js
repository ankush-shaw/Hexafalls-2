"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AegisOS — Enterprise Multi-Agent AI Platform API',
            version: '1.0.0',
            description: 'Comprehensive API documentation for the Enterprise Multi-Agent AI Operating System. Includes authentication, Boss Agent, Supervisor AI, Worker Agents, Workflows, Analytics, and Reports.',
            contact: {
                name: 'AegisOS Engineering',
                email: 'engineering@aegisos.ai',
            },
        },
        servers: [
            { url: 'http://localhost:5000', description: 'Local Development' },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ BearerAuth: [] }],
        tags: [
            { name: 'Auth', description: 'Authentication and session management' },
            { name: 'Health', description: 'Service health and readiness checks' },
            { name: 'Boss', description: 'Boss Agent CEO planning & strategy' },
            { name: 'Supervisor', description: 'Supervisor AI COO orchestration' },
            { name: 'Workers', description: 'Dynamic Worker Agent execution' },
            { name: 'Workflows', description: 'Enterprise workflow engine' },
            { name: 'Reports', description: 'Executive report generation' },
            { name: 'Analytics', description: 'Platform telemetry and analytics' },
            { name: 'Notifications', description: 'Platform notification center' },
        ],
    },
    apis: ['./src/controllers/**/*.ts', './src/routes/**/*.ts'],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.default = exports.swaggerSpec;
