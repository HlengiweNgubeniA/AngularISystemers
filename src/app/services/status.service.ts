import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private apiUrl  = 'https://localhost:7158/api/Status'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getStatus(id : number): Observable<Status> {
    return this.http.get<Status>(`https://localhost:7158/api/Status/${id}`);
  }
  getStatuses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getStatusById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/statuses/${id}`);
  }

  createStatus(status: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7158/api/Status`, status);
  }

  updateStatus(id: number, status: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/Status/${id}`, status);
  }

  deleteStatus(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/Status/${id}`);
  }
}
