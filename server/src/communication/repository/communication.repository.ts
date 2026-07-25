import {
  EventLogRecord,
  NotificationRecord,
  PresenceRecord,
  IEventLogRecord,
  INotificationRecord,
  IPresenceRecord,
} from '../models/communication.model.js';
import { SystemEventPayload, PresenceInfo, NotificationPayload } from '../types/communication.types.js';

export class CommunicationRepository {
  async logEvent(event: SystemEventPayload): Promise<IEventLogRecord> {
    const record = new EventLogRecord(event);
    return record.save();
  }

  async getRecentEvents(limit = 50): Promise<IEventLogRecord[]> {
    return EventLogRecord.find().sort({ timestamp: -1 }).limit(limit).exec();
  }

  async getEventsByWorkflow(workflowId: string): Promise<IEventLogRecord[]> {
    return EventLogRecord.find({ workflowId }).sort({ timestamp: 1 }).exec();
  }

  async createNotification(data: Partial<NotificationPayload>): Promise<INotificationRecord> {
    const notification = new NotificationRecord(data);
    return notification.save();
  }

  async getUserNotifications(userId: string): Promise<INotificationRecord[]> {
    return NotificationRecord.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async updatePresence(info: PresenceInfo): Promise<IPresenceRecord> {
    return PresenceRecord.findOneAndUpdate(
      { agentId: info.agentId },
      { $set: { status: info.status, type: info.type, lastHeartbeat: new Date(), metadata: info.metadata } },
      { upsert: true, new: true }
    ).exec();
  }

  async getAllPresence(): Promise<IPresenceRecord[]> {
    return PresenceRecord.find().exec();
  }
}

export const communicationRepository = new CommunicationRepository();
export default communicationRepository;
