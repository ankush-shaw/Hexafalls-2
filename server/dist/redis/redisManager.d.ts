import Redis from 'ioredis';
declare class RedisManager {
    private client;
    connect(): void;
    getClient(): Redis;
    disconnect(): Promise<void>;
    getHealth(): {
        status: 'healthy' | 'unhealthy';
        info: string;
    };
}
export declare const redisManager: RedisManager;
export default redisManager;
