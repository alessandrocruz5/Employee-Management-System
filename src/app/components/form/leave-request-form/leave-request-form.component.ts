import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { LeaveRequestService } from '../../../services/leave-request.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LeaveRequest } from '../../../models/leave-request';

@Component({
  selector: 'app-leave-request-form',
  standalone: true,
  imports: [HeaderComponent, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './leave-request-form.component.html',
  styleUrl: './leave-request-form.component.scss',
})
export class LeaveRequestFormComponent implements OnInit {
  leaveRequestForm!: FormGroup;
  leaveTypes: string[] = ['Vacation', 'Sick', 'Personal', 'Other'];
  employees: Employee[] = [];
  isEditMode = false;
  leaveRequestId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private leaveRequestService: LeaveRequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.leaveRequestForm = this.fb.group({
      employeeId: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      leaveType: ['', Validators.required],
      status: ['Pending', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.leaveRequestId = +id;
        this.isEditMode = true;
        this.loadLeaveRequest(this.leaveRequestId);
      } else {
        this.isEditMode = false;
        this.leaveRequestForm.patchValue({ status: 'Pending' });
      }
    });
  }

  loadEmployees(): void {
    this.employeeService.getEmployeesPaged(1, 100).subscribe({
      next: (employees) => {
        this.employees = employees.items;
        console.log(employees);
      },
      error: (error) => {
        console.error('Error loading employees', error);
      },
    });
  }

  loadLeaveRequest(id: number): void {
    this.leaveRequestService.getLeaveRequest(id).subscribe({
      next: (leaveRequest) => {
        const formattedLeaveRequest = {
          ...leaveRequest,
          startDate: this.formatDateForInput(new Date(leaveRequest.startDate)),
          endDate: this.formatDateForInput(new Date(leaveRequest.endDate)),
        };
        this.leaveRequestForm.patchValue(formattedLeaveRequest);
      },
      error: (error) => {
        console.error('Error loading leave request', error);
      },
    });
  }

  formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  onSubmit() {
    if (this.leaveRequestForm.valid) {
      const leaveRequest: LeaveRequest = {
        ...this.leaveRequestForm.value,
        startDate: new Date(this.leaveRequestForm.value.startDate),
        endDate: new Date(this.leaveRequestForm.value.endDate),
      };
      console.log('Leave Request:', leaveRequest);

      if (this.isEditMode && this.leaveRequestId) {
        leaveRequest.id = this.leaveRequestId;
        this.leaveRequestService
          .updateLeaveRequest(this.leaveRequestId, leaveRequest)
          .subscribe({
            next: (response) => {
              console.log('Leave Request Updated!', response);
              alert('Leave Request Updated!');
              this.router.navigate(['/leave-request-list']);
            },
            error: (error) => {
              console.error('Error updating leave request', error);
            },
          });
      } else {
        this.leaveRequestService.createLeaveRequest(leaveRequest).subscribe({
          next: (response) => {
            console.log('Leave Request Submitted!', response);
            alert('Leave Request Submitted!');
            this.router.navigate(['/leave-request-list']);
          },
          error: (error) => {
            console.error('Error creating leave request', error);
          },
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
