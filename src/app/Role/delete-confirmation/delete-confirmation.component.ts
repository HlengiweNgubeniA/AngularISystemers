import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.css'
})
export class DeleteConfirmationComponent {

constructor(
  public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
  @Inject(MAT_DIALOG_DATA) public data: {roleName: string}
){}


confirmDelete(): void{
  this.dialogRef.close(true);
}

cancel(): void{
  this.dialogRef.close(false);
}

}
