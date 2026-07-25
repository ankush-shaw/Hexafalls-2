import { Queue } from 'bullmq';
export declare const QUEUE_NAMES: {
    readonly BOSS_AGENT: "boss-agent";
    readonly SUPERVISOR: "supervisor";
    readonly WORKER_AGENT: "worker-agent";
    readonly NOTIFICATIONS: "notifications";
    readonly REPORTS: "reports";
};
export type QueueName = typeof QUEUE_NAMES[keyof typeof QUEUE_NAMES];
declare class QueueManager {
    private queues;
    private queueEvents;
    private getConnection;
    createQueue(name: QueueName): Queue;
    getQueue(name: QueueName): Queue;
    addJob<T>(queueName: QueueName, jobName: string, data: T, opts?: object): Promise<void>;
    closeAll(): Promise<void>;
}
export declare const queueManager: QueueManager;
export default queueManager;
