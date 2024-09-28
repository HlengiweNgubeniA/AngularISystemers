import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierOrder } from '../models/supplier-order';
import { Employee } from '../models/employee';
import { Supplier } from '../models/supplier';
import { SupplierService } from './supplier.service';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierOrderService {

  private apiUrl  = 'https://localhost:7158/api/SupplierOrder'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`https://localhost:7158/api/Employee`);
  }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`https://localhost:7158/api/Supplier`);
  }

  getSupplierOrder(id : number): Observable<SupplierOrder> {
    return this.http.get<SupplierOrder>(`https://localhost:7158/api/SupplierOrder/${id}`);
  }
  getSupplierOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getSupplierOrderById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/supplier-orders/${id}`);
  }

  createSupplierOrder(supplierOrder: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7158/api/SupplierOrder`, supplierOrder);
  }

  updateSupplierOrder(id: number, supplierOrder: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/SupplierOrder/${id}`, supplierOrder);
  }

  deleteSupplierOrder(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/SupplierOrder/${id}`);
  }

  getSupplierOrdersReport(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7158/api/SupplierOrders')
  }

 /* getSupplierOrdersReport(
    supplierName: string = '',
    employeeName: string = '',
    startDate?: Date,
    endDate?: Date,
    sortBy: string = 'SupplierOrderDate',
    ascending: boolean = true,
    page: number = 1,
    pageSize: number = 10
  ): Observable<any> {
    let params = new HttpParams()
      .set('supplierName', supplierName)
      .set('employeeName', employeeName)
      .set('startDate', startDate ? startDate.toISOString() : '')
      .set('endDate', endDate ? endDate.toISOString() : '')
      .set('sortBy', sortBy)
      .set('ascending', ascending.toString())
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(this.apiUrl, { params });
  } */


    getOrders(
      supplierName: string = '',
      employeeName: string = '',
      startDate?: Date | null,
      endDate?: Date | null,
      sortBy: string = 'supplierOrderDate',
      ascending: boolean = true,
      currentPage: number = 1,
      pageSize: number = 10
    ): Observable<any> {
      let params = new HttpParams()
        .set('supplierName', supplierName)
        .set('employeeName', employeeName)
        .set('startDate', startDate ? startDate.toISOString() : '')
        .set('endDate', endDate ? endDate.toISOString() : '')
        .set('sortBy', sortBy)
        .set('ascending', ascending.toString())
        .set('currentPage', currentPage.toString())
        .set('pageSize', pageSize.toString());
    
      return this.http.get<any>(`https://localhost:7158/api/SupplierOrders`, { params });
    }
}
