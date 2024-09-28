import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpecialOccasionCatalogue } from '../models/special-occasion-catalogue';
import { PackageType } from '../models/package-type';
import { Package } from '../models/package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private apiUrl  = 'https://localhost:7158/api/Package'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getPackageTypes(): Observable<PackageType[]> {
    return this.http.get<PackageType[]>(`https://localhost:7158/api/PackageType`);
  }

  getCatalogues(): Observable<SpecialOccasionCatalogue[]> {
    return this.http.get<SpecialOccasionCatalogue[]>(`https://localhost:7158/api/SpecialOccasionCatalogue`);
  }

  getPackage(id : number): Observable<Package> {
    return this.http.get<Package>(`https://localhost:7158/api/Package/${id}`);
  }
  getPackages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getPackageById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/packages/${id}`);
  }

  createPackage(_package: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7158/api/Package`, _package);
  }

  updatePackage(id: number, _package: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/Package/${id}`, _package);
  }

  deletePackage(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/Package/${id}`);
  }
}
