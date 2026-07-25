"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueManager = exports.QUEUE_NAMES = void 0;
const bullmq_1 = require("bullmq");
const redisManager_js_1 = require("../redis/redisManager.js");
const logger_js_1 = __importDefault(require("../logger/logger.js"));
exports.QUEUE_NAMES = {
    BOSS_AGENT: 'boss-agent',
    SUPERVISOR: 'supervisor',
    WORKER_AGENT: 'worker-agent',
    NOTIFICATIONS: 'notifications',
    REPORTS: 'reports',
};
class QueueManager {
    queues = new Map();
    queueEvents = new Map();
    getConnection() {
        return redisManager_js_1.redisManager.getClient();
    }
    createQueue(name) {
        if (this.queues.has(name)) {
            return this.queues.get(name);
        }
        const queue = new bullmq_1.Queue(name, {
            connection: this.getConnection(),
            defaultJobOptions: {
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 1000,
                },
                removeOnComplete: 50,
                removeOnFail: 100,
            },
        });
        const events = new bullmq_1.QueueEvents(name, { connection: this.getConnection() });
        events.on('completed', ({ jobId }) => logger_js_1.default.info(`[Queue:${name}] Job ${jobId} completed.`));
        events.on('failed', ({ jobId, failedReason }) => logger_js_1.default.error(`[Queue:${name}] Job ${jobId} failed: ${failedReason}`));
        this.queues.set(name, queue);
        this.queueEvents.set(name, events);
        logger_js_1.default.info(`[QueueManager] Queue "${name}" initialized.`);
        return queue;
    }
    getQueue(name) {
        if (!this.queues.has(name)) {
            return this.createQueue(name);
        }
        return this.queues.get(name);
    }
    async addJob(queueName, jobName, data, opts) {
        const queue = this.getQueue(queueName);
        await queue.add(jobName, data, opts);
        logger_js_1.default.debug(`[QueueManager] Job "${jobName}" added to queue "${queueName}".`);
    }
    async closeAll() {
        for (const [name, queue] of this.queues) {
            await queue.close();
            logger_js_1.default.info(`[QueueManager] Queue "${name}" closed.`);
        }
        for (const [name, events] of this.queueEvents) {
            await events.close();
        }
        this.queues.clear();
        this.queueEvents.clear();
    }
}
exports.queueManager = new QueueManager();
exports.default = exports.queueManager;
