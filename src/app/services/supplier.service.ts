import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private apiUrl  = 'https://localhost:7158/api/Supplier'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getSupplier(id : number): Observable<Supplier> {
    return this.http.get<Supplier>(`https://localhost:7158/api/Supplier/${id}`);
  }
  getSuppliers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getSupplierById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/suppliers/${id}`);
  }

  createSupplier(supplier: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7158/api/Supplier`, supplier);
  }

  updateSupplier(id: number, supplier: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/Supplier/${id}`, supplier);
  }

  deleteSupplier(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/Supplier/${id}`);
  }
}

