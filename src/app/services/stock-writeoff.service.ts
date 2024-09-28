import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockWriteOff } from '../models/stock-writeoff';

@Injectable({
    providedIn: 'root'
})
export class StockWriteOffService {
    private apiUrl = 'https://localhost:7158/api/StockWriteOff';

    constructor(private http: HttpClient) { }

    getStockWriteOffs(): Observable<StockWriteOff[]> {
        return this.http.get<StockWriteOff[]>(this.apiUrl);
    }

    getStockWriteOff(id: number): Observable<StockWriteOff> {
        return this.http.get<StockWriteOff>(`${this.apiUrl}/${id}`);
    }

    createStockWriteOff(stockWriteOff: StockWriteOff): Observable<StockWriteOff> {
        return this.http.post<StockWriteOff>(this.apiUrl, stockWriteOff);
    }

    deleteStockWriteOff(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
