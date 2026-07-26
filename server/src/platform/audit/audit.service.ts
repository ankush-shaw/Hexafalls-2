import { AuditLog } from '../../database/schemas/domain.models.js';
import logger from '../../logger/logger.js';

export class AuditService {
  public async logAction(
    action: string,
    moduleName: string,
    userId?: string,
    ipAddress?: string,
    metadata?: Record<string, unknown>
  ) {
    const auditId = `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    try {
      const record = new AuditLog({
        auditId,
        userId: userId as any,
        action,
        module: moduleName,
        ipAddress,
        metadata,
      });
      await record.save();
    } catch {
      // Offline fallback
    }

    logger.info(`[AuditService] Logged action [${action}] in module [${moduleName}].`);
  }

  public async getRecentLogs(limit = 50) {
    return AuditLog.find().sort({ createdAt: -1 }).limit(limit).exec();
  }
}

export const auditService = new AuditService();
export default auditService;
