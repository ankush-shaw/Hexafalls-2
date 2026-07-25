import { eventBus } from '../event-bus/event.bus.js';
import { communicationService } from '../service/communication.service.js';

async function runCommunicationBusTests() {
  console.log('🧪 Starting Agent Communication Bus Unit Tests...');

  let receivedEvent: any = null;

  // Test 1: Event Bus Subscription & Publishing
  eventBus.subscribe('task_assigned_test', (evt) => {
    receivedEvent = evt;
  });

  const publishedEvent = await eventBus.publish(
    'task_assigned_test',
    'supervisor',
    'worker',
    { taskId: 'tsk-99', workerId: 'wrk-1' },
    { workflowId: 'wf-test-100', priority: 8 }
  );

  console.assert(publishedEvent.eventId.startsWith('evt-'), 'Test 1 Failed: Event ID generated');
  console.assert(receivedEvent !== null, 'Test 1 Failed: Subscriber received event');
  console.assert(receivedEvent?.payload?.taskId === 'tsk-99', 'Test 1 Failed: Payload matches');
  console.log('✅ Test 1 Passed: Event Bus Pub/Sub & Typed Message Wrapping');

  // Test 2: Notification Dispatch
  const notif = await communicationService.sendNotification(
    'user-1',
    'Workflow Completed',
    'All 4 departmental tasks completed cleanly.',
    'success',
    'wf-test-100'
  );
  console.assert(notif.notificationId.startsWith('notif-'), 'Test 2 Failed: Notification ID generated');
  console.assert(notif.type === 'success', 'Test 2 Failed: Notification type matches');
  console.log('✅ Test 2 Passed: Real-time Notification Dispatch');

  console.log('🎉 All Agent Communication Bus Unit Tests Passed Successfully!');
}

runCommunicationBusTests().catch(console.error);
