import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock';
import { StockType } from '../models/stock-type';
import { StockTake } from '../models/stock-take';
import { StockWriteOff } from '../models/stock-writeoff';

@Injectable({
    providedIn: 'root'
})
export class StockService {
    private apiUrl = 'https://localhost:7158/api/Stock';

    constructor(private http: HttpClient) { }

    getStockTypes(): Observable<StockType[]> {
      return this.http.get<StockType[]>(`https://localhost:7158/api/StockType`);
    }
  
    getStockTakes(): Observable<StockTake[]> {
      return this.http.get<StockTake[]>(`https://localhost:7158/api/StockTake`);
    }

    getStockWriteOffs(): Observable<StockWriteOff[]> {
      return this.http.get<StockWriteOff[]>(`https://localhost:7158/api/StockWriteOff`);
    }

    getStocks(): Observable<Stock[]> {
        return this.http.get<Stock[]>(this.apiUrl);
    }

    getStock(id: number): Observable<Stock> {
        return this.http.get<Stock>(`${this.apiUrl}/${id}`);
    }

    createStock(stock: Stock): Observable<Stock> {
        return this.http.post<Stock>(this.apiUrl, stock);
    }

    updateStock(id: number, stock: Stock): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}`, stock);
    }

    deleteStock(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}

