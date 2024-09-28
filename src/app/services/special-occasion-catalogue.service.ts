import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpecialOccasionCatalogue } from '../models/special-occasion-catalogue';
import { OccasionType } from '../models/occasion-type';
import { Discount } from '../models/discount';

@Injectable({
  providedIn: 'root'
})
export class SpecialOccasionCatalogueService {

  private apiUrl  = 'https://localhost:7158/api/SpecialOccasionCatalogue'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getDiscounts(): Observable<Discount[]> {
    return this.http.get<Discount[]>(`https://localhost:7158/api/Discount`);
  }

  getOccasionTypes(): Observable<OccasionType[]> {
    return this.http.get<OccasionType[]>(`https://localhost:7158/api/OccasionType`);
  }

  getCatalogue(id : number): Observable<SpecialOccasionCatalogue> {
    return this.http.get<SpecialOccasionCatalogue>(`https://localhost:7158/api/SpecialOccasionCatalogue/${id}`);
  }
  getCatalogues(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getCatalogueById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/catalogues/${id}`);
  }

  createCatalogue(catalogue: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7158/api/SpecialOccasionCatalogue`, catalogue);
  }

  updateCatalogue(id: number, catalogue: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/SpecialOccasionCatalogue/${id}`, catalogue);
  }

  deleteCatalogue(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/SpecialOccasionCatalogue/${id}`);
  }
}
