import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'https://localhost:7002/api/Payment/pay';

  constructor(private http: HttpClient) { }

  makePayment(paymentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pay`, paymentData);
  }


 



}
