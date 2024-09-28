import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HelpDocument } from '../models/help-document';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class HelpDocumentService {
  private apiUrl = 'api/helpdocument';

  constructor(private http: HttpClient) {}

  getHelpDocument(): Observable<HelpDocument> {
    return this.http.get<HelpDocument>(this.apiUrl);
  }

  updateHelpDocument(document: HelpDocument): Observable<void> {
    return this.http.put<void>(this.apiUrl, document);
  }

  getComments(documentId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/comments/${documentId}`);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/comments`, comment);
  }
}
