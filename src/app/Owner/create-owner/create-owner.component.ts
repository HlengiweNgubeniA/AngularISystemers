import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwnerService } from '../../services/owner.service';
import { Owner } from '../../models/owner';

@Component({
  selector: 'app-create-owner',
  templateUrl: './create-owner.component.html',
  styleUrl: './create-owner.component.css'
})
export class CreateOwnerComponent {
  ownerForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ownerService: OwnerService
  ) {
    this.ownerForm = this.fb.group({
      userId: ['', Validators.required],
      name: ['', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
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
        this.ownerForm.patchValue({ catImage: this.selectedImage });
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
        this.ownerForm.patchValue({ catImage: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.ownerForm.valid) {
      const newOwner: Owner = this.ownerForm.value;
      console.log('New owner', newOwner);
      this.ownerService.createOwner(newOwner).subscribe({
        next:(value) => {
          console.log('Owner created successfully', value);
        },
        complete:() => {
        this.router.navigate(['/owners']);
        },
        error:(err) => {
          console.error('Error creating owner', err);
        },
      }
       
      );
    }
  } 
}
