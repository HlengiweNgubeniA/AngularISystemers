import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-price-confirmation',
  templateUrl: './delete-price-confirmation.component.html',
  styleUrl: './delete-price-confirmation.component.css'
})
export class DeletePriceConfirmationComponent {

  constructor(
    public dialogRef: MatDialogRef<DeletePriceConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productName: string} // Accept product name as input
  ) {}



  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }




}
