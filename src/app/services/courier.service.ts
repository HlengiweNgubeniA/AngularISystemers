import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Courier } from '../models/courier';

@Injectable({
  providedIn: 'root'
})
export class CourierService {
  private apiUrl  = 'https://localhost:7158/api/Couriers'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getCourier(id : number): Observable<Courier> {
    return this.http.get<Courier>(`https://localhost:7158/api/Couriers/${id}`);
  }
  getCouriers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getCourierById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/courier/${id}`);
  }

  createCourier(courier: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7158/api/Couriers`, courier);
  }

  updateCourier(id: number, courier: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/Couriers/${id}`, courier);
  }

  deleteCourier(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/Couriers/${id}`);
  }
}
