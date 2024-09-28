import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductCategory } from '../../models/product-category';
import { ProductType } from '../../models/product-type';
import { ProductPrice } from '../../models/product-price';
import { Size } from '../../models/productSize';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  productForm: FormGroup;
  productCategories: ProductCategory[] = [];
  productTypes: ProductType[] = [];
  productPrices: ProductPrice[] = [];
  productSizes: Size[] = [];
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.productForm = this.fb.group({
      productCategoryId: ['', Validators.required],
      productTypeId: ['', Validators.required],
      productPriceId: ['', Validators.required],
      sizeId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      pictureUrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.productService.getProductCategories().subscribe(data => {
      this.productCategories = data;
    });

    this.productService.getProductTypes().subscribe(data => {
      this.productTypes = data;
    });

    this.productService.getProductPrices().subscribe(data => {
      this.productPrices = data;
    });

    this.productService.getProductSizes().subscribe(data => {
      this.productSizes = data;
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.productForm.patchValue({ catImage: this.selectedImage });
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
        this.productForm.patchValue({ pictureUrl: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit(): void {
    if (this.productForm.valid) {
      const user = this.authService.getUserProfile() || 'Default manager';
      const newProduct = {
        productCategoryId: this.productForm.value.productCategoryId,
        productTypeId: this.productForm.value.productTypeId,
        productPriceId: this.productForm.value.productPriceId,
        sizeId: this.productForm.value.sizeId,
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        pictureUrl: this.productForm.value.pictureUrl,
        manager: user
      };
  
      this.productService.createProduct(newProduct).subscribe({
        next: (value) => {
          this.snackBar.open('Product successfully created!', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        },
        complete: () => {
          this.router.navigate(['admin/products']);
        },
        error: (err) => {
          console.error('Error creating product', err);
  
          if (err.status === 400) {
            this.snackBar.open('Invalid input fields.', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          } else if (err.status === 409) {
            this.snackBar.open('A product with this name already exists.', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          }  else {
            this.snackBar.open('Failed to create product. Please try again.', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          }
        }
      });
    }
  }
  
}
