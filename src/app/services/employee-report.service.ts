import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeReportService {
  private apiUrl = 'https://localhost:7158/api/EmployeeReport'; 

  constructor(private http: HttpClient) { }

  getEmployeeReport(): Observable<Employee[]> {
      return this.http.get<Employee[]>(this.apiUrl);
  }
}
