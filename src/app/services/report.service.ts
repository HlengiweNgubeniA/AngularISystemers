import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl  = 'https://localhost:7158/api/Reports'; // Update with your actual API URL

  constructor(private http: HttpClient) { }

  getClientReport(): Observable<any> {
    return this.http.get(`${this.apiUrl}/client-report`);
  }

  getMonthlySalesReport(): Observable<any> {
    return this.http.get(`${this.apiUrl}/monthly-sales-report`);
  }

  getIncomeVsExpenseReport(): Observable<any> {
    return this.http.get(`${this.apiUrl}/income-vs-expense-report`);
  }

  getPeakSeasonSalesReport(): Observable<any> {
    return this.http.get(`${this.apiUrl}/peak-season-sales-report`);
  }

  getReviewsReport(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reviews-report`);
  }

  getCurrentStockCountReport(): Observable<any> {
    return this.http.get(`${this.apiUrl}/current-stock-count-report`);
  }

  getSupplierDeliveryReport(): Observable<any> {
    return this.http.get(`${this.apiUrl}/supplier-delivery-report`);
  }

  getAuditTrailReport(): Observable<any> {
    return this.http.get(`${this.apiUrl}/audit-trail-report`);
  }
}
