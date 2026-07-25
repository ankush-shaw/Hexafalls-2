import { Queue, QueueEvents, Worker } from 'bullmq';
import { redisManager } from '../redis/redisManager.js';
import logger from '../logger/logger.js';

export const QUEUE_NAMES = {
  BOSS_AGENT: 'boss-agent',
  SUPERVISOR: 'supervisor',
  WORKER_AGENT: 'worker-agent',
  NOTIFICATIONS: 'notifications',
  REPORTS: 'reports',
} as const;

export type QueueName = typeof QUEUE_NAMES[keyof typeof QUEUE_NAMES];

class QueueManager {
  private queues: Map<string, Queue> = new Map();
  private queueEvents: Map<string, QueueEvents> = new Map();

  private getConnection() {
    return redisManager.getClient();
  }

  public createQueue(name: QueueName): Queue {
    if (this.queues.has(name)) {
      return this.queues.get(name)!;
    }

    const queue = new Queue(name, {
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

    const events = new QueueEvents(name, { connection: this.getConnection() });

    events.on('completed', ({ jobId }) => logger.info(`[Queue:${name}] Job ${jobId} completed.`));
    events.on('failed', ({ jobId, failedReason }) => logger.error(`[Queue:${name}] Job ${jobId} failed: ${failedReason}`));

    this.queues.set(name, queue);
    this.queueEvents.set(name, events);

    logger.info(`[QueueManager] Queue "${name}" initialized.`);
    return queue;
  }

  public getQueue(name: QueueName): Queue {
    if (!this.queues.has(name)) {
      return this.createQueue(name);
    }
    return this.queues.get(name)!;
  }

  public async addJob<T>(queueName: QueueName, jobName: string, data: T, opts?: object): Promise<void> {
    const queue = this.getQueue(queueName);
    await queue.add(jobName, data, opts);
    logger.debug(`[QueueManager] Job "${jobName}" added to queue "${queueName}".`);
  }

  public async closeAll(): Promise<void> {
    for (const [name, queue] of this.queues) {
      await queue.close();
      logger.info(`[QueueManager] Queue "${name}" closed.`);
    }
    for (const [name, events] of this.queueEvents) {
      await events.close();
    }
    this.queues.clear();
    this.queueEvents.clear();
  }
}

export const queueManager = new QueueManager();
export default queueManager;
