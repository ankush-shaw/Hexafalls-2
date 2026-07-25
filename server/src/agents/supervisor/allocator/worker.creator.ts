import { WorkerNode, ExecutableTask } from '../types/supervisor.types.js';

export class WorkerCreator {
  public createWorkersForTasks(tasks: ExecutableTask[]): WorkerNode[] {
    const departments = Array.from(new Set(tasks.map((t) => t.department)));
    const workers: WorkerNode[] = [];

    departments.forEach((dept, index) => {
      const workerId = `wrk-${index + 1}-${dept.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      workers.push({
        workerId,
        workerName: `Worker ${dept.split(' ')[0]}-${String.fromCharCode(65 + index)}`,
        department: dept,
        capabilities: [dept, 'Data Processing', 'Payload Anonymization'],
        status: 'idle',
        completedTaskCount: 0,
        failedTaskCount: 0,
        lastHeartbeat: new Date(),
        cpuLoadPercent: 12 + index * 5,
        memoryUsageMB: 128 + index * 32,
      });
    });

    return workers;
  }
}

export const workerCreator = new WorkerCreator();
export default workerCreator;
