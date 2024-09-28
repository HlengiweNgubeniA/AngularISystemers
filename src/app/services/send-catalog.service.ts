import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailResponse } from '../models/catalogEmail';
import { CustomerEmails } from '../models/customerEmail';

@Injectable({
  providedIn: 'root'
})
export class SendCatalogService {
  private apiUrl = 'https://localhost:7158/api/CatalogueNotification'; // This should be your correct API endpoint

  constructor(private http: HttpClient) { }

  sendCatalogue(toEmail: string, subject: string, body: string, files: File[]): Observable<any> {
    const formData: FormData = new FormData();

    files.forEach(file => {
      formData.append('files', file, file.name);
    });

    formData.append('toEmailAddress', toEmail);
    formData.append('subject', subject);
    formData.append('body', body);

    // Send the POST request with the FormData
    return this.http.post(`${this.apiUrl}/send-catalogue`, formData, { responseType: 'text' });
  }

  getCustomerEmail(): Observable<CustomerEmails[]> {
    return this.http.get<CustomerEmails[]>(`https://localhost:7158/Get-Customer-Email`);
  }
}

