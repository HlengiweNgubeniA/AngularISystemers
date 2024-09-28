import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-emp-type-deletion-confirmation',
  templateUrl: './emp-type-deletion-confirmation.component.html',
  styleUrl: './emp-type-deletion-confirmation.component.css'
})
export class EmpTypeDeletionConfirmationComponent {


constructor(
  public dialogRef: MatDialogRef<EmpTypeDeletionConfirmationComponent>,
  @Inject(MAT_DIALOG_DATA) public data: {message: string}
){}


onCancel(): void{
  this.dialogRef.close(false);
}

onConfirm(): void {
  this.dialogRef.close(true)
}


}
