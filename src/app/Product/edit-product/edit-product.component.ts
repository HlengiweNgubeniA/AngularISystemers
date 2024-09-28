import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from '../../models/product-category';
import { ProductType } from '../../models/product-type';
import { ProductPrice } from '../../models/product-price';
import { Size } from '../../models/productSize';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CapitalizeDirective } from '../../Cap/capitalize.directive';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent {
  editForm: FormGroup;
  productCategories: ProductCategory[] = [];
  productTypes: ProductType[] = [];
  productPrices: ProductPrice[] = [];
  productSizes: Size[] = [];
  productId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService:  ProductService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {
    this.editForm = this.fb.group({
      productCategoryId: ['', Validators.required],
      productTypeId: ['', Validators.required],
      productPriceId: ['', Validators.required],
      sizeId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      pictureUrl: ['']
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.loadProduct();
    this.loadProductCategories();
    this.loadProductTypes();
    this.loadProductPrices();
    this.loadProductSizes();
  }

  loadProduct(): void {
    this.productService.getProduct(this.productId).subscribe(data => {
     // console.log('load edit form',data);
      this.editForm.patchValue(data);
      this.editForm.patchValue({
        productCategoryId: data.productCategoryId,
        productTypeId: data.productTypeId,
        productPriceId: data.productPriceId,
        productSizeId: data.sizeId,
        name: data.name,
        description: data.description,
        pictureUrl: data.pictureUrl
      })
    });
  }

  loadProductCategories(): void {
    this.productService.getProductCategories().subscribe(data => {
      this.productCategories = data;
    });
  }

  loadProductTypes(): void {
    this.productService.getProductTypes().subscribe(data => {
      this.productTypes = data;
    });
  }

  loadProductPrices(): void {
    this.productService.getProductPrices().subscribe(data => {
      this.productPrices = data;
    });
  }

  loadProductSizes(): void {
    this.productService.getProductSizes().subscribe(data => {
      this.productSizes = data;
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {   
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editForm.patchValue({ pictureUrl: e.target.result });
        //console.log('Updated pictureUrl:',pictureUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  // onSubmit(): void {
  //   if (this.editForm.valid) {
  //    // console.log('',this.editForm.value.pictureUrl)
  //     const user = this.authService.getUserProfile() || 'Default manager';
  //  const newdetails = {
  //   productCategoryId: this.editForm.value.productCategoryId,
  //   productTypeId: this.editForm.value.productTypeId,
  //   productPriceId: this.editForm.value.productPriceId,
  //   sizeid: this.editForm.value.sizeId,
  //   name: this.editForm.value.name,
  //   description: this.editForm.value.description,
  //   pictureUrl: this.editForm.value.pictureUrl,
  //   manager: user
  //  }
  //  console.log('New data',newdetails)
  //     this.productService.updateProduct(this.productId, newdetails).subscribe(() => {
  //       this.router.navigate(['admin/products']);
  //     });
  //   }
  // }

  onSubmit(): void {
    if (this.editForm.valid) {
      const user = this.authService.getUserProfile() || 'Default manager';
  
      const newDetails = {
        productCategoryId: this.editForm.value.productCategoryId,
        productTypeId: this.editForm.value.productTypeId,
        productPriceId: this.editForm.value.productPriceId,
        sizeId: this.editForm.value.sizeId,
        name: this.editForm.value.name,
        description: this.editForm.value.description,
        pictureUrl: this.editForm.value.pictureUrl,
        manager: user
      };
  
      //console.log('New data', newDetails);
  
      this.productService.updateProduct(this.productId, newDetails).subscribe(
        (response) => {
          // Successfully updated product, navigate to products page
          this.router.navigate(['admin/products']);
          this.snackBar.open('Product updated successfully!', 'Close', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
        },
        (error) => {
          // Handle errors from the API
          if (error.status === 400) {
            // Bad request, possibly validation error
            this.snackBar.open(' Product ID mismatch or invalid data.', 'Close', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
          } else if (error.status === 404) {
            // Product not found
            this.snackBar.open('Product not found.', 'Close', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center'});
          } else if (error.status === 409) {
            // Conflict error (duplicate product)
            this.snackBar.open(' A product with the same name already exists.', 'Close', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
          } else {
            // General error
            this.snackBar.open('An error occurred while updating the product.', 'Close', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
          }
        }
      );
    } else {
      // Form is invalid, show a validation error
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
    }
  }
  



  
}
