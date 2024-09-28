import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusService } from '../../services/status.service';
import { Status } from '../../models/status';

@Component({
  selector: 'app-create-status',
  templateUrl: './create-status.component.html',
  styleUrl: './create-status.component.css'
})
export class CreateStatusComponent {
  statusForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private statusService: StatusService
  ) {
    this.statusForm = this.fb.group({
      statusName: ['', Validators.required],
      statusDescription: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.statusForm.patchValue({ catImage: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.statusForm.patchValue({ catImage: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit(): void {
    if (this.statusForm.valid) {
      const newStatus: Status = this.statusForm.value;
      console.log('New Status', newStatus);
      this.statusService.createStatus(newStatus).subscribe({
        next:(value) => {
          console.log('Status created successfully', value);
        },
        complete:() => {
        this.router.navigate(['/statuses']);
        },
        error:(err) => {
          console.error('Error creating status', err);
        },
      }
       
      );
    }
  } 
}
