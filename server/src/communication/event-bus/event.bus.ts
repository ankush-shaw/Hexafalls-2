import { EventEmitter } from 'events';
import { SystemEventPayload } from '../types/communication.types.js';
import { communicationRepository } from '../repository/communication.repository.js';
import { socketManager } from '../../socket/socketManager.js';
import logger from '../../logger/logger.js';

class CentralEventBus extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(100);
  }

  /**
   * Publish an event into the central event bus
   */
  public async publish<T = Record<string, unknown>>(
    eventName: string,
    source: SystemEventPayload['source'],
    target: SystemEventPayload['target'],
    payload: T,
    options?: { workflowId?: string; executionId?: string; priority?: number; metadata?: Record<string, unknown> }
  ): Promise<SystemEventPayload<T>> {
    const eventId = `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const event: SystemEventPayload<T> = {
      eventId,
      eventName,
      source,
      target,
      timestamp: new Date(),
      workflowId: options?.workflowId,
      executionId: options?.executionId,
      priority: options?.priority || 5,
      payload,
      metadata: options?.metadata,
      version: '1.0',
    };

    logger.debug(`[EventBus] Published [${eventName}] from ${source} -> ${target} (ID: ${eventId})`);

    // Emit internally to node listeners
    this.emit(eventName, event);
    this.emit('*', event);

    // Save to MongoDB Event Log async (guarded for offline unit tests)
    try {
      await communicationRepository.logEvent(event as any);
    } catch {
      // Offline fallback
    }

    // Broadcast over Socket.IO to frontend clients
    if (socketManager) {
      socketManager.emit(eventName, event);
      if (options?.workflowId) {
        socketManager.emitToRoom(`workflow:${options.workflowId}`, eventName, event);
      }
    }

    return event;
  }

  /**
   * Subscribe to a specific event or all events ('*')
   */
  public subscribe<T = Record<string, unknown>>(
    eventName: string,
    handler: (event: SystemEventPayload<T>) => void
  ): void {
    this.on(eventName, handler as any);
  }
}

export const eventBus = new CentralEventBus();
export default eventBus;
