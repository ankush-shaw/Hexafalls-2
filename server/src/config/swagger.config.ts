import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AegisOS — Enterprise Multi-Agent AI Platform API',
      version: '1.0.0',
      description:
        'Comprehensive API documentation for the Enterprise Multi-Agent AI Operating System. Includes authentication, Boss Agent, Supervisor AI, Worker Agents, Workflows, Analytics, and Reports.',
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
      { name: 'Auth',        description: 'Authentication and session management' },
      { name: 'Health',      description: 'Service health and readiness checks' },
      { name: 'Boss',        description: 'Boss Agent CEO planning & strategy' },
      { name: 'Supervisor',  description: 'Supervisor AI COO orchestration' },
      { name: 'Workers',     description: 'Dynamic Worker Agent execution' },
      { name: 'Workflows',   description: 'Enterprise workflow engine' },
      { name: 'Reports',     description: 'Executive report generation' },
      { name: 'Analytics',   description: 'Platform telemetry and analytics' },
      { name: 'Notifications', description: 'Platform notification center' },
    ],
  },
  apis: ['./src/controllers/**/*.ts', './src/routes/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
export default swaggerSpec;
