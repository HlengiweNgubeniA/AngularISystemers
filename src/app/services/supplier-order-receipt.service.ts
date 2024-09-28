import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierOrderReceipt } from '../models/supplier-order-receipt';

@Injectable({
  providedIn: 'root'
})
export class SupplierOrderReceiptService {

  private apiUrl = 'https://localhost:7158/api/SupplierOrderReceipt';

  constructor(private http: HttpClient) {}

  createReceipt(receipt: FormData): Observable<SupplierOrderReceipt> {
    return this.http.post<SupplierOrderReceipt>(this.apiUrl, receipt);
  }

  getAllReceipts(): Observable<SupplierOrderReceipt[]> {
    return this.http.get<SupplierOrderReceipt[]>(this.apiUrl);
  }
}
