import dotenv from 'dotenv';
dotenv.config();

export const appConfig = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
};


export const dbConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/hexafalls_multiagent',
};

export const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD || undefined,
};

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'super_secret_enterprise_jwt_key_2026_aegisos',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'super_secret_refresh_jwt_key_2026_aegisos',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
};
