import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewReportService {
  private baseUrl = 'https://localhost:7158/api/ReviewReport';

  constructor(private http: HttpClient) {}

  getReviewReport(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/GetReviewReport`);
  }
}
