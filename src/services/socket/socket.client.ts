import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '../../constants/api.constants';
import { LOCAL_STORAGE_KEYS, SOCKET_RECONNECT_ATTEMPTS, SOCKET_RECONNECT_DELAY } from '../../constants/app.constants';
import { ServerToClientEvents, ClientToServerEvents } from '../../types/socket.types';
import { useAgentStore } from '../../store/agentStore';
import { useWorkflowStore } from '../../store/workflowStore';
import { useNotificationsStore } from '../../store/notificationsStore';
import { useChatStore } from '../../store/chatStore';

export class SocketClient {
  private static instance: SocketClient | null = null;
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;
  private isConnectingState = false;
  private reconnectCount = 0;
  private onStateChangeListeners: Set<(state: 'disconnected' | 'connecting' | 'connected') => void> = new Set();

  private constructor() {}

  public static getInstance(): SocketClient {
    if (!SocketClient.instance) {
      SocketClient.instance = new SocketClient();
    }
    return SocketClient.instance;
  }

  public connect(): void {
    if (this.socket?.connected || this.isConnectingState) return;

    this.isConnectingState = true;
    this.notifyStateChange('connecting');

    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

    this.socket = io(SOCKET_URL, {
      auth: { token },
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: SOCKET_RECONNECT_ATTEMPTS,
      reconnectionDelay: SOCKET_RECONNECT_DELAY,
      reconnectionDelayMax: 10000,
      timeout: 20000,
    });

    this.setupListeners();
    this.socket.connect();
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnectingState = false;
      this.notifyStateChange('disconnected');
    }
  }

  public emit<T extends keyof ClientToServerEvents>(
    event: T,
    ...args: Parameters<ClientToServerEvents[T]>
  ): void {
    if (this.socket?.connected) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.socket.emit(event, ...(args as any));
    } else {
      console.warn(`Socket not connected. Failed to emit event: ${event}`);
    }
  }

  public subscribeToState(callback: (state: 'disconnected' | 'connecting' | 'connected') => void): () => void {
    this.onStateChangeListeners.add(callback);
    // Emit initial status
    callback(this.getConnectionState());
    return () => {
      this.onStateChangeListeners.delete(callback);
    };
  }

  public getConnectionState(): 'disconnected' | 'connecting' | 'connected' {
    if (this.socket?.connected) return 'connected';
    if (this.isConnectingState) return 'connecting';
    return 'disconnected';
  }

  private notifyStateChange(state: 'disconnected' | 'connecting' | 'connected'): void {
    this.onStateChangeListeners.forEach((listener) => listener(state));
  }

  private setupListeners(): void {
    if (!this.socket) return;

    // Connection lifecycle
    this.socket.on('connect', () => {
      this.isConnectingState = false;
      this.reconnectCount = 0;
      this.notifyStateChange('connected');
      console.log('Socket.IO connection established');
    });

    this.socket.on('disconnect', (reason) => {
      this.isConnectingState = false;
      this.notifyStateChange('disconnected');
      console.log(`Socket.IO disconnected: ${reason}`);
      if (reason === 'io server disconnect') {
        // Server closed connection, try manual reconnection
        this.connect();
      }
    });

    this.socket.on('connect_error', (error) => {
      this.isConnectingState = false;
      this.notifyStateChange('disconnected');
      this.reconnectCount++;
      console.error(`Socket.IO connection error (attempt ${this.reconnectCount}):`, error.message);
    });

    // Agent Events
    this.socket.on('agent:status-changed', ({ agentId, status }) => {
      useAgentStore.getState().updateAgentStatus(agentId, status);
    });

    this.socket.on('agent:message', (message) => {
      // Add to relevant chat streams
      const activeStreamId = useChatStore.getState().activeStreamId;
      const targetStreamId = message.senderId === 'user' ? message.receiverId : message.senderId;
      useChatStore.getState().addMessage(targetStreamId, message);
      
      // If user is chatting with someone else, push a notification
      if (activeStreamId !== targetStreamId && message.senderRole !== 'user') {
        useNotificationsStore.getState().addNotification({
          id: message.id,
          title: `New message from ${message.senderRole}`,
          message: message.content.slice(0, 60) + (message.content.length > 60 ? '...' : ''),
          type: 'info',
          timestamp: message.timestamp,
        });
      }
    });

    this.socket.on('agent:metrics-updated', ({ agentId, metrics }) => {
      useAgentStore.getState().updateAgentMetrics(agentId, metrics);
    });

    // Workflow Events
    this.socket.on('workflow:status-changed', ({ executionId, status }) => {
      useWorkflowStore.getState().updateExecutionStatus(executionId, status);
    });

    this.socket.on('workflow:log', ({ executionId, log }) => {
      useWorkflowStore.getState().addExecutionLog(executionId, log);
    });

    // System Events
    this.socket.on('system:notification', (notification) => {
      useNotificationsStore.getState().addNotification(notification);
    });

    this.socket.on('system:error', (error) => {
      console.error('System error received via socket:', error);
      useNotificationsStore.getState().addNotification({
        id: `sys-err-${Date.now()}`,
        title: `System Error (${error.code})`,
        message: error.message,
        type: 'error',
        timestamp: new Date().toISOString(),
      });
    });
  }
}

export const socketClient = SocketClient.getInstance();
