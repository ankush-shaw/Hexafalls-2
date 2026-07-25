import mongoose from 'mongoose';
import { dbConfig } from '../config/app.config.js';
import logger from '../logger/logger.js';

export class DatabaseManager {
  private static isConnected = false;

  public static async connect(): Promise<void> {
    if (this.isConnected) {
      logger.info('MongoDB is already connected.');
      return;
    }

    try {
      mongoose.set('strictQuery', true);
      await mongoose.connect(dbConfig.uri);

      this.isConnected = true;
      logger.info('Successfully connected to MongoDB Database.');

      mongoose.connection.on('error', (err) => {
        logger.error(`MongoDB connection error: ${err}`);
      });

      mongoose.connection.on('disconnected', () => {
        this.isConnected = false;
        logger.warn('MongoDB connection lost. Reconnecting...');
      });
    } catch (error) {
      logger.error(`Failed to connect to MongoDB: ${error}`);
    }
  }

  public static async disconnect(): Promise<void> {
    if (!this.isConnected) return;
    await mongoose.disconnect();
    this.isConnected = false;
    logger.info('MongoDB disconnected gracefully.');
  }

  public static getHealth(): { status: 'healthy' | 'unhealthy'; isConnected: boolean } {
    const state = mongoose.connection.readyState;
    return {
      status: state === 1 ? 'healthy' : 'unhealthy',
      isConnected: state === 1,
    };
  }
}

export default DatabaseManager;
