import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockTake } from '../models/stock-take';

@Injectable({
  providedIn: 'root'
})
export class StockTakeService {

  private apiUrl  = 'https://localhost:7158/api/StockTake'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getStockTake(id : number): Observable<StockTake> {
    return this.http.get<StockTake>(`https://localhost:7158/api/StockTake/${id}`);
  }
  getStockTakes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getStockTakeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stock-takes/${id}`);
  }

  createStockTake(stockTake: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7158/api/StockTake`, stockTake);
  }

  updateStockTake(id: number, stockTake: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/StockTake/${id}`, stockTake);
  }

  deleteStockTake(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/StockTake/${id}`);
  }
}
