import { DepartmentNode, IntentAnalysis } from '../types/boss.types.js';
export declare class DepartmentDiscoveryEngine {
    discoverDepartments(prompt: string, intent: IntentAnalysis): DepartmentNode[];
}
export declare const departmentDiscoveryEngine: DepartmentDiscoveryEngine;
export default departmentDiscoveryEngine;
