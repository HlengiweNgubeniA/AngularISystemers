import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SendCatalogService } from '../../services/send-catalog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerEmails } from '../../models/customerEmail';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-send-catalog',
  templateUrl: './send-catalog.component.html',
  styleUrls: ['./send-catalog.component.css']  // Fixed the 'styleUrl' to 'styleUrls'
})
export class SendCatalogComponent implements OnInit {
  catalogueForm: FormGroup;
  customerEmails: CustomerEmails[] = [];
  files: File[] = [];
  attachmentIconVisible: boolean = true; 

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder, 
    private emailService: SendCatalogService, 
    private snackBar: MatSnackBar
  ) {
    this.catalogueForm = this.fb.group({
      toEmail: [[], [Validators.required]],
      subject: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCustomerEmails();
  }

  loadCustomerEmails(): void {
    this.emailService.getCustomerEmail().subscribe(data => {
      this.customerEmails = data;
    });
  }

  onSubmit(): void {
    if (this.catalogueForm.valid) {
      const toEmail = this.catalogueForm.get('toEmail')?.value.join(',');  // Join selected emails
      const subject = this.catalogueForm.get('subject')?.value;
      const body = this.catalogueForm.get('body')?.value;

      this.emailService.sendCatalogue(toEmail, subject, body, this.files).subscribe(
        () => {
          this.snackBar.open('Catalogue sent.', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        },
        (error: HttpErrorResponse) => {
          console.error('Error sending email:', error);
          this.snackBar.open('Failed to send catalogue.', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        }
      );
    }
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.files = Array.from(event.target.files);
    } else {
      this.files = [];
    }
  }

  getFilePreview(file: File): Observable<string | ArrayBuffer | null> {
    return new Observable(observer => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        observer.next(e.target.result);
        observer.complete();
      };
      reader.onerror = (error) => {
        observer.error(error);
      };

      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        reader.readAsDataURL(file); // Read image and PDF files
      } else {
        observer.next(null); // No preview for other file types
        observer.complete();
      }
    });
  }

  getFileIcon(file: File): string {
    const fileType = file.type;
    if (fileType.startsWith('image/')) return 'image'; // Image icon
    if (fileType === 'application/pdf') return 'picture_as_pdf'; // PDF icon
    if (fileType.startsWith('application/msword') || fileType.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) return 'description'; // Word icon
    if (fileType.startsWith('application/vnd.ms-powerpoint') || fileType.startsWith('application/vnd.openxmlformats-officedocument.presentationml.presentation')) return 'slideshow'; // PowerPoint icon
    return 'attach_file'; // Default icon
  }
}
