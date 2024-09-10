import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaveRequest } from '../models/leave-request';
import { PagedResponse } from '../models/paged-response';

@Injectable({
  providedIn: 'root',
})
export class LeaveRequestService {
  private apiUrl = 'https://localhost:7102/api/leave-requests';

  constructor(private http: HttpClient) {}

  // getLeaveRequests(): Observable<LeaveRequest[]> {
  //   return this.http.get<LeaveRequest[]>(`${this.apiUrl}`);
  // }

  getLeaveRequests(
    page: number,
    pageSize: number
  ): Observable<PagedResponse<LeaveRequest>> {
    return this.http.get<PagedResponse<LeaveRequest>>(
      `${this.apiUrl}?pageNumber=${page}&pageSize=${pageSize}`
    );
  }

  getLeaveRequest(id: number): Observable<LeaveRequest> {
    return this.http.get<LeaveRequest>(`${this.apiUrl}/${id}`);
  }

  createLeaveRequest(leaveRequest: LeaveRequest): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(`${this.apiUrl}`, leaveRequest);
  }

  updateLeaveRequest(
    id: number,
    leaveRequest: LeaveRequest
  ): Observable<LeaveRequest> {
    return this.http.put<LeaveRequest>(`${this.apiUrl}/${id}`, leaveRequest);
  }

  deleteLeaveRequest(id: number): Observable<LeaveRequest> {
    return this.http.delete<LeaveRequest>(`${this.apiUrl}/${id}`);
  }
}
