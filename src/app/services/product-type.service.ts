import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductType } from '../models/product-type';
import { ProductCategory } from '../models/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
 
  private apiUrl  = 'https://localhost:7158/api/ProductType'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getProductCategoriesWithTypes(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`https://localhost:7158/api/ProductCategory/with-types`); // Adjust the endpoint accordingly
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`https://localhost:7158/api/ProductCategory`);
  }

  getProductType(id : number): Observable<ProductType> {
    return this.http.get<ProductType>(`https://localhost:7158/api/ProductType/${id}`);
  }
  getProdutTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getProductTypeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/productTypes/${id}`);
  }

  createProductType(productType: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7158/api/ProductType`, productType);
  }

  updateProductType(id: number, productType: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/ProductType/${id}`, productType);
  }

  deleteProductType(id: number, manager: string): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/ProductType/${id}?manager=${manager}`);
  }
}
