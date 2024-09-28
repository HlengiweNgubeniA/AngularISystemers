import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DiscountService } from '../../services/discount.service';
import { Discount } from '../../models/discount';

@Component({
  selector: 'app-create-discount',
  templateUrl: './create-discount.component.html',
  styleUrl: './create-discount.component.css'
})
export class CreateDiscountComponent {
  discountForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private discountService: DiscountService
  ) {
    this.discountForm = this.fb.group({
      disName: ['', Validators.required],
      disDescription: ['', Validators.required],
      discountPercentage: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
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
        this.discountForm.patchValue({ catImage: this.selectedImage });
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
        this.discountForm.patchValue({ catImage: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit(): void {
    if (this.discountForm.valid) {
      const newDiscount: Discount = this.discountForm.value;
      console.log('New discount', newDiscount);
      this.discountService.createDiscount(newDiscount).subscribe({
        next:(value) => {
          console.log('Discount created successfully', value);
        },
        complete:() => {
        this.router.navigate(['/discounts']);
        },
        error:(err) => {
          console.error('Error creating discount', err);
        },
      }
       
      );
    }
  } 
}
