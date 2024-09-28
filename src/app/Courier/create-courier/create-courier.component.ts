import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourierService } from '../../services/courier.service';
import { Courier } from '../../models/courier';

@Component({
  selector: 'app-create-courier',
  templateUrl: './create-courier.component.html',
  styleUrl: './create-courier.component.css'
})
export class CreateCourierComponent {
  courierForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courierService: CourierService
  ) {
    this.courierForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.courierForm.patchValue({ catImage: this.selectedImage });
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
        this.courierForm.patchValue({ catImage: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit(): void {
    if (this.courierForm.valid) {
      const newCourier: Courier = this.courierForm.value;
      console.log('New courier', newCourier);
      this.courierService.createCourier(newCourier).subscribe({
        next:(value) => {
          console.log('Courier created successfully', value);
        },
        complete:() => {
        this.router.navigate(['/couriers']);
        },
        error:(err) => {
          console.error('Error creating courier', err);
        },
      }
       
      );
    }
  } 
}
