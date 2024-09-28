import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl  = 'https://localhost:7158/api/Inventory'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://localhost:7158/api/Product')
  }
  
  getInventory(id : number): Observable<Inventory> {
    return this.http.get<Inventory>(`https://localhost:7158/api/Inventory/${id}`);
  }
  getInventories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getInventoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/inventory/${id}`);
  }

  createInventory(inventory: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7158/api/Inventory`, inventory);
  }

  updateInventory(id: number, inventory: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/Inventory/${id}`, inventory);
  }

  deleteInventory(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/Inventory/${id}`);
  }
}
