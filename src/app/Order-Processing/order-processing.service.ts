import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderProcessingService {

  private apiUrl = 'https://localhost:7002/api/Order/orderlines';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

   private apiUrlAccept = 'https://localhost:7002/api/Order/accept';

   //Method to accept an order
  //  acceptOrder(orderLineId: number, employeeName: string): Observable<any>{
  //   return this.http.put(`${this.apiUrl}/${orderLineId}`, { employeeName })
  //  }

  acceptOrder(orderLineId: number, employeeName: string): Observable<Order>{
    return this.http.put<Order>(`${this.apiUrl}/${orderLineId}`, employeeName);
   }

   private orderCountSubject = new BehaviorSubject<number>(0);
   orderCount$ = this.orderCountSubject.asObservable();
   


   setOrderCount(count: number){
    this.orderCountSubject.next(count)
   }



}

export interface Order {
  orderLineId: number;
  productName: string;
  quantity: number;
  totalPrice: number;
  orderStatus: string;
  responsibility: string;
}