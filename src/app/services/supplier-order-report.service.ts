import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierOrder } from '../models/supplier-order';

@Injectable({
  providedIn: 'root'
})
export class SupplierOrderReportService {
  private baseUrl = 'https://localhost:7158/api/SupplierOrderReport';

  constructor(private http: HttpClient) {}

  getSupplierOrderReport(): Observable<SupplierOrder[]> {
    return this.http.get<SupplierOrder[]>(`${this.baseUrl}/GetSupplierOrderReport`);
  }
}
