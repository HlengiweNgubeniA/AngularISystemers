import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Size } from '../models/productSize';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  private apiUrl  = 'https://localhost:7158/api/ProductSizes'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getSize(id : number): Observable<Size> {
    return this.http.get<Size>(`https://localhost:7158/api/ProductSizes/${id}`);
  }
  getSizes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getSizeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sizes/${id}`);
  }

  createSize(size: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7158/api/ProductSizes`, size);
  }

  updateSize(id: number, size: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/ProductSizes/${id}`, size);
  }

  deleteSize(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/ProductSizes/${id}`);
  }
}
