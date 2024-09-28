import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchAuditDto } from './SearchAuditDto';
import { AuditTrail } from './AuditTrailReport';

@Injectable({
  providedIn: 'root'
})
export class AuditTrailService {


api = 'https://localhost:7158/api/AuditTial'
api2 = 'https://localhost:7158/api/AuditTial/search'

  constructor(private http: HttpClient) { }



getAllAuditTrails(): Observable<AuditTrail[]>{
  return this.http.get<AuditTrail[]>(`${this.api}`)
}


searchAuditTrails(user: string,transactionType: string, date: string ): Observable<AuditTrail[]> {
  return this.http.get<AuditTrail[]>(`${this.api2}?user=${user}?transactionType=${transactionType}?date=${date}`);
}


}
