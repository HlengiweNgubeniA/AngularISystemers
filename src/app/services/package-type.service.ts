import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpecialOccasionCatalogue } from '../models/special-occasion-catalogue';
import { OccasionType } from '../models/occasion-type';
import { Discount } from '../models/discount';
import { PackageType } from '../models/package-type';

@Injectable({
  providedIn: 'root'
})
export class PackageTypeService {

  private apiUrl  = 'https://localhost:7158/api/PackageType'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}


  getPackagType(id : number): Observable<PackageType> {
    return this.http.get<PackageType>(`https://localhost:7158/api/PackageType/${id}`);
  }
  getPackageTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getPackageTypeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/packageType/${id}`);
  }

  createPackageType(packageType: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7158/api/PackageType`, packageType);
  }

  updatePackageType(id: number, packageType: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/PackageType/${id}`, packageType);
  }

  deletePackageType(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/PackageType/${id}`);
  }
}
