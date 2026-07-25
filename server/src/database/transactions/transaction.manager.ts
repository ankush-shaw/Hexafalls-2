import mongoose, { ClientSession } from 'mongoose';
import logger from '../../logger/logger.js';

export class TransactionManager {
  /**
   * Execute callback within a MongoDB ACID Session Transaction
   */
  public static async runTransaction<T>(
    fn: (session: ClientSession) => Promise<T>
  ): Promise<T> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const result = await fn(session);
      await session.commitTransaction();
      logger.info('[TransactionManager] Transaction committed successfully.');
      return result;
    } catch (err: any) {
      await session.abortTransaction();
      logger.error(`[TransactionManager] Transaction aborted due to error: ${err.message}`);
      throw err;
    } finally {
      session.endSession();
    }
  }
}
