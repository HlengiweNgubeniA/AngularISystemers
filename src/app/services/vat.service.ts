import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, Subject} from 'rxjs';
import { VAT } from '../models/vat';

@Injectable({
  providedIn: 'root'
})
export class VATService {

  private apiUrl  = 'https://localhost:7158/api/VAT'; 


  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private http: HttpClient) {}

  getVatById(id: number): Observable<VAT> {
    return this.http.get<VAT>(`${this.apiUrl}/${id}`);
  }


  getVat(): Observable<VAT[]> {
    return this.http.get<VAT[]>(`${this.apiUrl}`)
  }


  createVat(vat: any) {
    return this.http.post<any>(`https://localhost:7158/api/VAT`, vat)
    .pipe(map(result => result))
  }

  updateVat(id: number, vat: {percentage: number, user: string}): Observable<any> {
    return this.http.put(`https://localhost:7158/api/VAT/update/vat/${id}`, vat)
  }

  deleteVat(id: number, user: any): Observable<any> {
    return this.http.delete(`https://localhost:7158/api/VAT/${id}?user=${user}`);
  }






}
