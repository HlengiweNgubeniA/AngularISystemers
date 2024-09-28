import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerReport } from '../models/customer-report';

@Injectable({
  providedIn: 'root'
})
export class CustomerReportService {

  private apiUrl = 'https://localhost:7158/api/CustomerReport'; 

  constructor(private http: HttpClient) { }

  getCustomerReport(): Observable<CustomerReport[]> {
    return this.http.get<CustomerReport[]>(this.apiUrl);
  }
}
