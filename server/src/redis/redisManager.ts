import Redis from 'ioredis';
import { redisConfig } from '../config/app.config.js';
import logger from '../logger/logger.js';

class RedisManager {
  private client: Redis | null = null;

  public connect(): void {
    this.client = new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
      password: redisConfig.password || undefined,
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
      lazyConnect: true,
    });

    this.client.on('connect', () => logger.info('Redis connected successfully.'));
    this.client.on('ready', () => logger.info('Redis client ready.'));
    this.client.on('error', (err) => logger.error(`Redis error: ${err.message}`));
    this.client.on('close', () => logger.warn('Redis connection closed.'));
    this.client.on('reconnecting', () => logger.warn('Redis reconnecting...'));

    this.client.connect().catch((err) => logger.error(`Redis initial connect error: ${err}`));
  }

  public getClient(): Redis {
    if (!this.client) {
      throw new Error('Redis client is not initialized. Call connect() first.');
    }
    return this.client;
  }

  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.quit();
      logger.info('Redis disconnected gracefully.');
    }
  }

  public getHealth(): { status: 'healthy' | 'unhealthy'; info: string } {
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

export const redisManager = new RedisManager();
export default redisManager;
