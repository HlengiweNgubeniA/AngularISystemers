import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductReportService {
  private baseUrl = 'https://localhost:7158/api/ProductReport';

  constructor(private http: HttpClient) {}

  getProductReport(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/GetProductReport`);
  }
}
