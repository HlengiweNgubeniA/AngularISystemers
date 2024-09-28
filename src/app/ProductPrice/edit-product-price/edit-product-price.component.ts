import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductPrice } from '../../models/product-price';
import { ProductPriceService } from '../../services/product-price.service';

@Component({
  selector: 'app-edit-product-price',
  templateUrl: './edit-product-price.component.html',
  styleUrl: './edit-product-price.component.css'
})
export class EditProductPriceComponent {
  editForm: FormGroup;
  productPriceId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productPriceService:  ProductPriceService
  ) {
    this.editForm = this.fb.group({
      price: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.productPriceId = this.route.snapshot.params['id'];
    this.loadPrice();
  }

  loadPrice(): void {
    this.productPriceService.getProductPrice(this.productPriceId).subscribe(data => {
      console.log('load edit form',data);
      this.editForm.patchValue(data);
      this.editForm.patchValue({
        price: data.price,
        description: data.description,
      })
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editForm.patchValue({ catImage: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.productPriceService.updateProductPrice(this.productPriceId, this.editForm.value).subscribe(() => {
        this.router.navigate(['/product-prices']);
      });
    }
  }
}
