import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/list/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/form/employee-form/employee-form.component';
import { LeaveRequestListComponent } from './components/list/leave-request-list/leave-request-list.component';
import { LeaveRequestFormComponent } from './components/form/leave-request-form/leave-request-form.component';
import { DepartmentListComponent } from './components/list/department-list/department-list.component';

export const routes: Routes = [
  {
    path: 'department-list',
    component: DepartmentListComponent,
  },
  {
    path: 'leave-request-form',
    component: LeaveRequestFormComponent,
  },
  {
    path: 'leave-request-form/:id',
    component: LeaveRequestFormComponent,
  },
  {
    path: 'leave-request-list',
    component: LeaveRequestListComponent,
  },
  {
    path: 'employee-form',
    component: EmployeeFormComponent,
  },
  {
    path: 'employee-form/:id',
    component: EmployeeFormComponent,
  },
  {
    path: 'employee-list',
    component: EmployeeListComponent,
  },
  {
    path: '',
    redirectTo: 'employee-list',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: EmployeeListComponent,
  },
];
