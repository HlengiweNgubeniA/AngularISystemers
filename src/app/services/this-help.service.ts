import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Help } from '../models/help';

@Injectable({
  providedIn: 'root'
})
export class ThisHelpService {

  private apiUrl  = 'https://localhost:7158/api/Help'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getHelp(id : number): Observable<Help> {
    return this.http.get<Help>(`https://localhost:7158/api/Help/${id}`);
  }
  getHelps(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getHelpById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/help/${id}`);
  }

  updateHelp(id: number, help: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/Help/${id}`, help);
  }

  deleteHelp(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/Help/${id}`);
  }
}
