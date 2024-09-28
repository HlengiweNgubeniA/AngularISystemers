import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StockType } from '../models/stock-type';

@Injectable({
  providedIn: 'root'
})
export class StockTypeService {

  private apiUrl  = 'https://localhost:7158/api/StockType'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getStockType(id : number): Observable<StockType> {
    return this.http.get<StockType>(`https://localhost:7158/api/StockType/${id}`);
  }
  getStockTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getStockTypeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stock-types/${id}`);
  }

  createStockType(stockType: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7158/api/StockType`, stockType);
  }

  updateStockType(id: number, stockType: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/StockType/${id}`, stockType);
  }

  deleteStockType(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/StockType/${id}`);
  }
}
