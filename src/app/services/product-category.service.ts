import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategory } from '../models/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private apiUrl  = 'https://localhost:7158/api/ProductCategory'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getCategory(id : number): Observable<ProductCategory> {
    return this.http.get<ProductCategory>(`https://localhost:7158/api/ProductCategory/${id}`);
  }
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categories/${id}`);
  }

  createCategory(category: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7158/api/ProductCategory`, category);
  }

  updateCategory(id: number, category: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/ProductCategory/${id}`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/ProductCategory/${id}`);
  }
}
