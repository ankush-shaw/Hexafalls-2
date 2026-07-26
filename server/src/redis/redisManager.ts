import Redis from 'ioredis';
import { redisConfig } from '../config/app.config.js';
import logger from '../logger/logger.js';

class RedisManager {
  private client: Redis | null = null;

  public connect(): void {
    let errorLogged = false;
    this.client = new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
      password: redisConfig.password || undefined,
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
      lazyConnect: true,
      retryStrategy: (times) => {
        if (times > 3) {
          if (!errorLogged) {
            logger.info('Redis container not detected locally. Operating in standalone in-memory mode.');
            errorLogged = true;
          }
          return null; // Stop reconnecting to prevent log spam
        }
        return Math.min(times * 500, 2000);
      },
    });

    this.client.on('connect', () => logger.info('Redis connected successfully.'));
    this.client.on('ready', () => logger.info('Redis client ready.'));
    this.client.on('error', (err) => {
      if (!errorLogged) logger.debug(`Redis offline: ${err.message}`);
    });
    this.client.on('close', () => {});
    this.client.on('reconnecting', () => {});

    this.client.connect().catch(() => {
      logger.info('Redis offline. Platform fallback mode active.');
    });
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
