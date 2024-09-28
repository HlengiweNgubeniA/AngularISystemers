import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl  = 'https://localhost:7158/api/Review'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  getReview(id : number): Observable<Review> {
    return this.http.get<Review>(`https://localhost:7158/api/Review/${id}`);
  }
  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getReviewById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/review/${id}`);
  }

  createReview(review: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7158/api/Review`, review);
  }

  updateReview(id: number, review: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7158/api/Review/${id}`, review);
  }

  deleteReview(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7158/api/Review/${id}`);
  }


  private baseUrl5 = 'https://localhost:7158/api/Review/product/';
  // https://localhost:7158/api/Review/product/1
getReviewsByProductId(productId: number): Observable<any>{
  return this.http.get<any[]>(`${this.baseUrl5}${productId}`)
}

}
