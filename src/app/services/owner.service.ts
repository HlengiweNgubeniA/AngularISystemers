import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owner } from '../models/owner';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private apiUrl  = 'https://localhost:7158/api/Owners'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getOwner(id : number): Observable<Owner> {
    return this.http.get<Owner>(`https://localhost:7158/api/Owners/${id}`);
  }
  getOwners(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getOwnerById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/owners/${id}`);
  }

  createOwner(owner: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7158/api/Owners`, owner);
  }

  updateOwner(id: number, owner: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/Owners/${id}`, owner);
  }

  deleteOwner(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/Owners/${id}`);
  }
}
