import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl  = 'https://localhost:7158/api/Role'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getRole(id : number): Observable<Role> {
    return this.http.get<Role>(`https://localhost:7158/api/Role/${id}`);
  }
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getRoleById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Role/${id}`);
  }

  createRole(roleData: {name: string, user: string}): Observable<any> {

    return this.http.post<any>(`https://localhost:7158/api/Role`, roleData);
  }

  updateRole(id: number, role: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/Role/${id}`, role);
  }

  deleteRole(id: string): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/Role/${id}`);
  }
}
