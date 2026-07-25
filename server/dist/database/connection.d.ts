export declare class DatabaseManager {
    private static isConnected;
    static connect(): Promise<void>;
    static disconnect(): Promise<void>;
    static getHealth(): {
        status: 'healthy' | 'unhealthy';
        isConnected: boolean;
    };
}
export default DatabaseManager;
