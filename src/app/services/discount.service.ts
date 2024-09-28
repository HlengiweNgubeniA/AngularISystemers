import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Discount } from '../models/discount';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';



export interface Discounts {
  discountId: number;
  disName: string;
  disDescription: string;
  discountPercentage: number;
  startDate: Date; // Date type
  endDate: Date;   // Date type
  status?: string; // Optional status property
}

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private apiUrl  = 'https://localhost:7158/api/Discount'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}



  getDiscount(id : number): Observable<Discount> {
    return this.http.get<Discount>(`https://localhost:7158/api/Discount/${id}`);
  }
  getDiscounts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getDiscountById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/discounts/${id}`);
  }

  createDiscount(discount: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7158/api/Discount`, discount);
  }

  updateDiscount(id: number, discount: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/Discount/${id}`, discount);
  }

  deleteDiscount(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/Discount/${id}`);
  }




  private discountsSubject = new BehaviorSubject<Discount[]>([]);
  discount$ = this.discountsSubject.asObservable();

  // dataSource = new MatTableDataSource<Discount>([]);

  checkDiscountStatus(discounts: Discount[]) : Discount[] {
    return discounts.map(discount => {
      const discountStartDate = new Date(discount.startDate);
      const discountEndDate = new Date(discount.endDate);



      discount.status = this.isDiscountActive(discountStartDate, discountEndDate) ? 'Active' : 'Inactive';
      return discount;
    });
  }

  isDiscountActive(startDate: Date, endDate: Date): boolean {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset time to midnight
    startDate.setHours(0, 0, 0, 0);   // Reset time to midnight
    endDate.setHours(0, 0, 0, 0);     // Reset time to midnight

    return currentDate >= startDate && currentDate <= endDate;
  }

  loadDiscounts() {
    const discounts = this.getDiscounts().subscribe((d: any)=>{
      this.discountsSubject.next(this.checkDiscountStatus(d));
    return this.discount$
    })
  }


}
