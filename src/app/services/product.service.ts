import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductCategory } from '../models/product-category';
import { ProductType } from '../models/product-type';
import { ProductPrice } from '../models/product-price';
import { Size } from '../models/productSize';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl  = 'https://localhost:7158/api/Product'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getProductCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`https://localhost:7158/api/ProductCategory`);
  }

  getProductTypes(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(`https://localhost:7158/api/ProductType`);
  }

  getProductPrices(): Observable<ProductPrice[]> {
    return this.http.get<ProductPrice[]>(`https://localhost:7158/api/ProductPrice`);
  }

  getProductSizes(): Observable<Size[]> {
    return this.http.get<Size[]>(`https://localhost:7158/api/ProductSizes`);
  }

  getProduct(id : number): Observable<Product> {
    return this.http.get<Product>(`https://localhost:7158/api/Product/${id}`);
  }
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/${id}`);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7158/api/Product`, product);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/Product/${id}`, product);
  }

  deleteProduct(id: number, user: string): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/Product/${id}?user=${user}`);
  }
}
