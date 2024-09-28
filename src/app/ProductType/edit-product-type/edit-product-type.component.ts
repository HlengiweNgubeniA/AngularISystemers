import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from '../../models/product-category';
import { ProductType } from '../../models/product-type';
import { ProductTypeService } from '../../services/product-type.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CapitalizeDirective } from '../../Cap/capitalize.directive';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-product-type',
  templateUrl: './edit-product-type.component.html',
  styleUrl: './edit-product-type.component.css'
})
export class EditProductTypeComponent {
  editForm: FormGroup;
  productCategories: ProductCategory[] = [];
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productTypeService:  ProductTypeService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.editForm = this.fb.group({
      productCategoryId: ['', Validators.required],
      name: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadProductType();
    this.loadProductCategories();
  }

  loadProductType(): void {
    this.productTypeService.getProductType(this.id).subscribe(data => {
     // console.log('load edit form',data);
      this.editForm.patchValue(data);
      this.editForm.patchValue({
        productCategoryId: data.productCategoryId,
        id: data.id,
        name: data.name,
        description: data.description
      })
    });
  }

  loadProductCategories(): void {
    this.productTypeService.getProductCategories().subscribe(data => {
      this.productCategories = data;
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

  // onSubmit(): void {
  //   if (this.editForm.valid) {
  //     const user = this.authService.getUserProfile() || 'Default manager';
  //  const newData = {
  //   productCategoryId: this.editForm.value.productCategoryId,
  //   name: this.editForm.value.name,
  //   description: this.editForm.value.description,
  //   manager: user
  //  }

  //     this.productTypeService.updateProductType(this.id, user).subscribe(() => {
  //       this.router.navigate(['/product-types']);
  //     });
  //   }
  // }


  onSubmit(): void {
    if (this.editForm.valid) {
        const user = this.authService.getUserProfile() || 'Default manager';
        const newData = {
            productCategoryId: this.editForm.value.productCategoryId,
            name: this.editForm.value.name.trim(),
            description: this.editForm.value.description.trim(),
            manager: user
        };

        this.productTypeService.updateProductType(this.id, newData).subscribe({
            next: () => {
              error: (errorResponse: HttpErrorResponse) => {
                console.error("Full error response:", errorResponse);
                
                const serverErrorMessage = errorResponse?.error?.message || "Invalid input data.";
                this.showErrorMessage(serverErrorMessage);
            }
            
                this.router.navigate(['/product-types']);
            },
            error: (errorResponse) => {
                // Handle different error responses based on the server's response status
                if (errorResponse.status === 409) {
                    // Conflict: A product type with the same name already exists
                    this.showErrorMessage("A product type with the same name already exists.");
                } else if (errorResponse.status === 404) {
                    // Not Found: The product type to update doesn't exist
                    this.showErrorMessage("Product type not found.");
                } else if (errorResponse.status === 400) {
                    // Bad Request: Generic error or validation error from the server
                    this.showErrorMessage("Invalid input data.");
                } else {
                    // Other server errors
                    this.showErrorMessage("An unexpected error occurred. Please try again.");
                }
            }
        });
    }
}

// Method to display error messages to the user
showErrorMessage(message: string): void {
    // Use Angular Material Snackbar or other UI notifications to show the error
    this.snackBar.open(message, 'Close', {
        duration: 5000, // Duration of the message in milliseconds
        verticalPosition: 'top',
        panelClass: ['error-snackbar'] // Custom class for styling the Snackbar
    });
}



}
