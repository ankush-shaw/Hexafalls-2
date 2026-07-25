"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisManager = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const app_config_js_1 = require("../config/app.config.js");
const logger_js_1 = __importDefault(require("../logger/logger.js"));
class RedisManager {
    client = null;
    connect() {
        this.client = new ioredis_1.default({
            host: app_config_js_1.redisConfig.host,
            port: app_config_js_1.redisConfig.port,
            password: app_config_js_1.redisConfig.password || undefined,
            maxRetriesPerRequest: null,
            enableReadyCheck: false,
            lazyConnect: true,
        });
        this.client.on('connect', () => logger_js_1.default.info('Redis connected successfully.'));
        this.client.on('ready', () => logger_js_1.default.info('Redis client ready.'));
        this.client.on('error', (err) => logger_js_1.default.error(`Redis error: ${err.message}`));
        this.client.on('close', () => logger_js_1.default.warn('Redis connection closed.'));
        this.client.on('reconnecting', () => logger_js_1.default.warn('Redis reconnecting...'));
        this.client.connect().catch((err) => logger_js_1.default.error(`Redis initial connect error: ${err}`));
    }
    getClient() {
        if (!this.client) {
            throw new Error('Redis client is not initialized. Call connect() first.');
        }
        return this.client;
    }
    async disconnect() {
        if (this.client) {
            await this.client.quit();
            logger_js_1.default.info('Redis disconnected gracefully.');
        }
    }
    getHealth() {
        if (!this.client) {
            return { status: 'unhealthy', info: 'Client not initialized' };
        }
        const statusString = this.client.status;
        return {
            status: statusString === 'ready' ? 'healthy' : 'unhealthy',
            info: statusString,
        };
    }
}
exports.redisManager = new RedisManager();
exports.default = exports.redisManager;
