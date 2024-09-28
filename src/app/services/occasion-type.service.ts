import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OccasionType } from '../models/occasion-type';

@Injectable({
  providedIn: 'root'
})
export class OccasionTypeService {

  private apiUrl  = 'https://localhost:7158/api/OccasionType'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getOccasionType(id : number): Observable<OccasionType> {
    return this.http.get<OccasionType>(`https://localhost:7158/api/OccasionType/${id}`);
  }
  getOccasionTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getOccasionTypeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/occasionTypes/${id}`);
  }

  createOccasionType(occasionType: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7158/api/OccasionType`, occasionType);
  }

  updateOccasionType(id: number, occasionType: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/OccasionType/${id}`, occasionType);
  }

  deleteOccasionType(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/OccasionType/${id}`);
  }
}
