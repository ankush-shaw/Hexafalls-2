export declare const appConfig: {
    env: string;
    port: number;
    apiPrefix: string;
    corsOrigin: string;
};
export declare const dbConfig: {
    uri: string;
};
export declare const redisConfig: {
    host: string;
    port: number;
    password: string | undefined;
};
export declare const jwtConfig: {
    secret: string;
    expiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
};
