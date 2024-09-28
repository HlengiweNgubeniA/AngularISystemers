import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductPriceService } from '../../services/product-price.service';
import { ProductPrice } from '../../models/product-price';

@Component({
  selector: 'app-create-product-price',
  templateUrl: './create-product-price.component.html',
  styleUrl: './create-product-price.component.css'
})
export class CreateProductPriceComponent {
  priceForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productPriceService: ProductPriceService
  ) {
    this.priceForm = this.fb.group({
      price: ['', Validators.required],
      description: ['', Validators.required],
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
        this.priceForm.patchValue({ catImage: this.selectedImage });
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
        this.priceForm.patchValue({ catImage: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit(): void {
    if (this.priceForm.valid) {
      const newPrice: ProductPrice = this.priceForm.value;
      console.log('New price', newPrice);
      this.productPriceService.createproductPrice(newPrice).subscribe({
        next:(value) => {
          console.log('Price created successfully', value);
        },
        complete:() => {
        this.router.navigate(['/product-prices']);
        },
        error:(err) => {
          console.error('Error creating price', err);
        },
      }
       
      );
    }
  } 
}
