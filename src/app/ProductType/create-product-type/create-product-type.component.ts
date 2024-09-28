import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductTypeService } from '../../services/product-type.service';
import { ProductCategory } from '../../models/product-category';
import { ProductType } from '../../models/product-type';
import { CapitalizeDirective } from '../../Cap/capitalize.directive';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-product-type',
  templateUrl: './create-product-type.component.html',
  styleUrl: './create-product-type.component.css'
})
export class CreateProductTypeComponent {
  productTypeForm: FormGroup;
  categories: ProductCategory[] = [];
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productTypeService: ProductTypeService,
    private snackBar: MatSnackBar,
    private authService: AuthService

  ) {
    this.productTypeForm = this.fb.group({
      productCategoryId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.productTypeService.getProductCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.productTypeForm.patchValue({ catImage: this.selectedImage });
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
        this.productTypeForm.patchValue({ catImage: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }


  // onSubmit(): void {
  //   if (this.productTypeForm.valid) {
  //     const user = this.authService.getUserProfile() || 'Default manager';
  //     const newProductType = {
  //       productCategoryId: this.productTypeForm.value.productCategoryId,
  //       name: this.productTypeForm.value.name,
  //       description: this.productTypeForm.value.description,
  //       manager: user
  //     }
  //     console.log('New product type', newProductType);
  //     this.productTypeService.createProductType(newProductType).subscribe({
  //       next:(value) => {
  //         this.snackBar.open('Product type created.','',{
  //           duration: 3000,
  //           verticalPosition: 'top',
  //           horizontalPosition: 'center'
  //         })
  //       },
  //       complete:() => {
  //       this.router.navigate(['admin/product-types']);
  //       },
  //       error:(err) => {
  //         console.error('Error creating product type', err);
  //       },
  //     }
       
  //     );
  //   }
  // } 


  onSubmit(): void {
    if (this.productTypeForm.valid) {
      const user = this.authService.getUserProfile() || 'Default manager';
      const newProductType = {
        productCategoryId: this.productTypeForm.value.productCategoryId,
        name: this.productTypeForm.value.name,
        description: this.productTypeForm.value.description,
        manager: user
      };
  
      console.log('New product type', newProductType);
  
      this.productTypeService.createProductType(newProductType).subscribe({
        next: (value) => {
          this.snackBar.open('Product type created.', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        },
        complete: () => {
          this.router.navigate(['admin/product-types']);
        },
        error: (err) => {
          if (err.status === 409 && err.error?.message) {
            // If there's a conflict (409), show a specific message to the user
            this.snackBar.open(err.error.message, '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          } else {
            // Handle other errors
            //console.error('Error creating product type', err);
            this.snackBar.open('An error occurred while creating the product type.', '', {
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
