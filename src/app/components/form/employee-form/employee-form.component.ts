import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Department } from '../../../models/department';
import { Employee } from '../../../models/employee';
import { DepartmentService } from '../../../services/department.service';
import { EmployeeService } from '../../../services/employee.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [HeaderComponent, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  departments: Department[] = [];
  isEditMode = false;
  employeeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      departmentId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.employeeId = +id;
        this.isEditMode = true;
        this.loadEmployee(this.employeeId);
      } else {
        this.isEditMode = false;
      }
    });
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe({
      next: (departments) => {
        this.departments = departments;
        console.log(this.departments);
      },
      error: (error) => console.error('Error fetching departments', error),
    });
  }

  loadEmployee(id: number): void {
    this.employeeService.getEmployee(id).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue(employee);
      },
      error: (error) => console.error('Error fetching employee', error),
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employee: Employee = this.employeeForm.value;
      console.log(employee);
      if (this.isEditMode && this.employeeId) {
        employee.id = this.employeeId;
        this.employeeService
          .updateEmployee(this.employeeId, employee)
          .subscribe({
            next: (response) => {
              console.log('Employee updated successfully!', response);
              alert('Employee updated successfully!');
              this.router.navigate(['/employee-list']);
            },
            error: (error) => {
              console.error('Error updating employee', error);
            },
          });
      } else {
        this.employeeService.createEmployee(employee).subscribe({
          next: (response) => {
            console.log('Employee created successfully!', response);
            alert('Employee created successfully!');
            this.router.navigate(['/employee-list']);
          },
          error: (error) => {
            console.error('Error creating employee', error);
          },
        });
      }
    } else {
      console.log('Invalid form.');
    }
  }
}
