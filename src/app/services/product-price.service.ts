import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductPrice } from '../models/product-price';

@Injectable({
  providedIn: 'root'
})
export class ProductPriceService {

  private apiUrl  = 'https://localhost:7158/api/ProductPrice'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getProductPrice(id : number): Observable<ProductPrice> {
    return this.http.get<ProductPrice>(`https://localhost:7158/api/ProductPrice/${id}`);
  }
  getProductPrices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getProductPriceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/productPrices/${id}`);
  }

  createproductPrice(productPrice: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7158/api/ProductPrice`, productPrice);
  }

  updateProductPrice(id: number, productPrice: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/ProductPrice/${id}`, productPrice);
  }

  deleteProductPrice(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/ProductPrice/${id}`);
  }


deleteThisProduct(id: number, manager: string): Observable<any>{
  return this.http.delete<any>(`https://localhost:7158/api/ProductPrice/${id}?manager=${manager}`)
}


}
