import { Department } from './department';
import { LeaveRequest } from './leave-request';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  departmentId: number;
  department?: Department;
  leaveRequests?: LeaveRequest;
}
