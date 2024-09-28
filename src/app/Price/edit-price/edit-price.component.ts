import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductPriceService } from '../../services/product-price.service';


@Component({
  selector: 'app-edit-price',
  templateUrl: './edit-price.component.html',
  styleUrl: './edit-price.component.css'
})
export class EditPriceComponent {
priceform: FormGroup;

constructor(
  private fb: FormBuilder,
  private dialogRef: MatDialogRef<EditPriceComponent>,
  private productService: ProductPriceService,
  private snackBar: MatSnackBar,
  @Inject(MAT_DIALOG_DATA) public data: any ,
  private authService: AuthService
){
  this.priceform = this.fb.group({
    productPriceId: [data.productPriceId, Validators.required],
    price: [data.price, [Validators.required, Validators.min(0)]],
    description: [data.description, Validators.required]
  });
}


onCancel(){
  this.dialogRef.close(false);
}


// Method to handle form submission
onSubmit(): void {
  if (this.priceform.valid) {
    const user = this.authService.getUserProfile() || '';
    const productPriceId = this.priceform.value.productPriceId;
    const updatedPrice = {
      price: this.priceform.value.price,
      description: this.priceform.value.description,
      manager: user
    };

   // console.log("Update details", updatedPrice);
   // console.log("Price id", productPriceId);

    this.productService.updateProductPrice(productPriceId, updatedPrice).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
        this.snackBar.open('Price successfully updated.', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      },
      error: (err) => {
       // console.error('Error updating product price:', err);
        let message = 'Failed to update product price.';

        if (err.status === 400) {
          message = err.error.message; // Show specific error message for BadRequest
        } else if (err.status === 404) {
          message = err.error.message; // Show specific error message for NotFound
        } else if (err.status === 409) {
          message = err.error.message; // Show specific error message for Conflict
        } else if (err.status === 500) {
          message = 'An unexpected error occurred. Please try again later.'; // General error message
        }

        this.snackBar.open(message, 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }
}




}
