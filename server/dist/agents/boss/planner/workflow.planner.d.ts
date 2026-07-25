import { DepartmentNode, WorkflowGraph } from '../types/boss.types.js';
export declare class WorkflowPlanner {
    planGraph(departments: DepartmentNode[]): WorkflowGraph;
}
export declare const workflowPlanner: WorkflowPlanner;
export default workflowPlanner;
