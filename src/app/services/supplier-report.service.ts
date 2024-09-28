import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier'; // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class SupplierReportService {
  private apiUrl = 'https://localhost:7158/api/SupplierReport'; 

  constructor(private http: HttpClient) { }

  getSupplierReport(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.apiUrl);
  }
}

