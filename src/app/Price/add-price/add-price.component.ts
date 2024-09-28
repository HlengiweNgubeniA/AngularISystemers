import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductPriceService } from '../../services/product-price.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-add-price',
  templateUrl: './add-price.component.html',
  styleUrl: './add-price.component.css'
})
export class AddPriceComponent {
priceform: FormGroup;

constructor(
  private fb: FormBuilder,
  private dialogRef: MatDialogRef<AddPriceComponent>,
  private productService: ProductPriceService,
  private snackBar: MatSnackBar,
  private authService: AuthService
){
  this.priceform = this.fb.group(
    {
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    }
  );
}


onCancel(){
  this.priceform.reset();
  this.dialogRef.close(false)
}

// onSubmit(): void {
//   if(this.priceform.valid){

//     const productPrice = this.priceform.value;

//     this.productService.createproductPrice(productPrice).subscribe({
//       next: (response) => {
//         this.dialogRef.close(response);
//         this.snackBar.open('Price successfully added.','',{
//           duration: 3000,
//           verticalPosition: 'top',
//           horizontalPosition: 'center'
//         })
//         console.log('Price data', productPrice)
//       }, error: (err) => {
//         console.error('Error adding product price:', err);
//         this.snackBar.open('Failed to add product price.', 'Close', {
//           duration: 3000,
//         }); }

//     })



//   }
// }

onSubmit(): void {
  if (this.priceform.valid) {
    const user = this.authService.getUserProfile() || ''
    const productPrice = {
      price: this.priceform.value.price,
      description: this.priceform.value.description,
      manager: user
    }

    //console.log("Check", productPrice)

    this.productService.createproductPrice(productPrice).subscribe({
      next: (response) => {
        // If the request is successful, close the dialog and show a success message
        this.dialogRef.close(response);
        this.snackBar.open('Price successfully added.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
       // console.log('Price data', productPrice);
      },
      error: (err) => {
        // Catch specific errors and show appropriate messages
        if (err.status === 400) {
          this.snackBar.open(err.error.message || 'Invalid price input.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        } else if (err.status === 409) {
          this.snackBar.open('This price already exists! No duplicates allowed.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        } else {
          this.snackBar.open('Failed to add product price.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
        console.error('Error adding product price:', err);
      }
    });
  }
}


}
