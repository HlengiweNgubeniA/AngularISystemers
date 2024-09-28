import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl  = 'https://localhost:7158/api/Customer'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getCustomer(id : number): Observable<Customer> {
    return this.http.get<Customer>(`https://localhost:7158/api/Customer/${id}`);
  }
  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getCustomerById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/customers/${id}`);
  }

  createCustomer(customer: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7158/api/Customer`, customer);
  }

  updateCustomer(id: number, customer: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/Customer/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/Customer/${id}`);
  }
}