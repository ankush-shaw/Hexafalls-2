import { eventBus } from '../event-bus/event.bus.js';
import { communicationRepository } from '../repository/communication.repository.js';
import { socketManager } from '../../socket/socketManager.js';
import { PublishEventInput, ReplayEventsInput } from '../validators/communication.validator.js';
import { SystemEventPayload, PresenceInfo, NotificationPayload } from '../types/communication.types.js';
import logger from '../../logger/logger.js';

export class CommunicationService {
  /**
   * Publish custom system event
   */
  public async publishCustomEvent(input: PublishEventInput): Promise<SystemEventPayload> {
    return eventBus.publish(
      input.eventName,
      input.source,
      input.target,
      input.payload,
      {
        workflowId: input.workflowId,
        executionId: input.executionId,
        priority: input.priority,
        metadata: input.metadata,
      }
    );
  }

  /**
   * Replay past events for a given workflowId to Socket.IO clients
   */
  public async replayWorkflowEvents(input: ReplayEventsInput): Promise<{ replayedCount: number }> {
    const events = await communicationRepository.getEventsByWorkflow(input.workflowId);
    logger.info(`[CommunicationService] Replaying ${events.length} events for workflow ${input.workflowId}...`);

    let count = 0;
    for (const evt of events) {
      count++;
      socketManager.emit('event_replayed', {
        step: count,
        total: events.length,
        event: evt,
      });
      await new Promise((r) => setTimeout(r, Math.max(50, 300 / (input.speedMultiplier || 1))));
    }

    return { replayedCount: count };
  }

  /**
   * Dispatch real-time user notification
   */
  public async sendNotification(userId: string, title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info', workflowId?: string): Promise<NotificationPayload> {
    const notificationId = `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const notificationData: NotificationPayload = {
      notificationId,
      userId,
      title,
      message,
      type,
      workflowId,
      read: false,
      timestamp: new Date(),
    };

    try {
      await communicationRepository.createNotification(notificationData);
    } catch {
      // Offline fallback
    }

    socketManager.emit('notification_received', notificationData);
    return notificationData;
  }

  /**
   * Update agent presence
   */
  public async updateAgentPresence(presence: PresenceInfo) {
    try {
      await communicationRepository.updatePresence(presence);
    } catch {
      // Offline fallback
    }
    socketManager.emit('presence_updated', presence);
  }

  public async getRecentEventLogs(limit = 50) {
    return communicationRepository.getRecentEvents(limit);
  }

  public async getWorkflowEventHistory(workflowId: string) {
    return communicationRepository.getEventsByWorkflow(workflowId);
  }
}

export const communicationService = new CommunicationService();
export default communicationService;
