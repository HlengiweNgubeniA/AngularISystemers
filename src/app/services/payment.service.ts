import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'https://localhost:7158/api/Payment'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  createPaymentIntent(amount: number, currency: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-payment-intent`, { amount, currency });
  }

  preparePayment(data: any, id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/prepare-payment/${id}`, data);
  }

  // for payfast
  makePayment(orderId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/make-payment/${orderId}`, {});
  }
}

