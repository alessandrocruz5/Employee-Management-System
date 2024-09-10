import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { DatePipe } from '@angular/common';
import { LeaveRequest } from '../../../models/leave-request';
import { LeaveRequestService } from '../../../services/leave-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-request-list',
  standalone: true,
  imports: [HeaderComponent],
  providers: [DatePipe],
  templateUrl: './leave-request-list.component.html',
  styleUrl: './leave-request-list.component.scss',
})
export class LeaveRequestListComponent implements OnInit {
  requests: LeaveRequest[] = [];

  currPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(
    private leaveRequestService: LeaveRequestService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadLeaveRequests();
  }

  // loadLeaveRequests() {
  //   this.leaveTrackerService.getLeaveRequests().subscribe({
  //     next: (data) => {
  //       this.requests = data.map((request) => ({
  //         ...request,
  //         formattedStartDate: this.formatDate(request.startDate),
  //         formattedEndDate: this.formatDate(request.endDate),
  //       }));
  //     },
  //     error: (error) => {
  //       console.error('Error fetching leave requests:', error);
  //     },
  //   });
  // }

  loadLeaveRequests(): void {
    this.leaveRequestService
      .getLeaveRequests(this.currPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.requests = response.items.map((request) => ({
            ...request,
            formattedStartDate: this.formatDate(request.startDate),
            formattedEndDate: this.formatDate(request.endDate),
          }));
          this.totalItems = response.totalItems;
          this.totalPages = response.totalPages;
        },
        error: (error) => {
          console.error('Error fetching leave requests', error);
        },
      });
  }

  formatDate(date: Date): string {
    const dateString =
      this.datePipe.transform(date, 'mediumDate') || 'Invalid Date';
    console.log(dateString);
    return dateString;
  }

  editLeaveRequest(id: number) {
    this.router.navigate(['/leave-request-form', id]);
  }

  onDelete(id: number): void {
    this.leaveRequestService.deleteLeaveRequest(id).subscribe({
      next: () => {
        console.log(`Leave request with ID ${id} deleted successfully.`);
        this.loadLeaveRequests();
      },
      error: (error) => {
        console.error('Error deleting leave request:', error);
      },
    });
  }

  onPageChange(page: number) {
    this.currPage = page;
    this.loadLeaveRequests();
  }
}
