import { Employee } from './employee';

export interface LeaveRequest {
  id: number;
  employeeId: number;
  employee?: Employee;
  startDate: Date;
  endDate: Date;
  leaveType: string;
  status: string;
  formattedStartDate?: string;
  formattedEndDate?: string;
}
