import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

  

@Component({
  selector: 'app-un-assign-role',
  templateUrl: './un-assign-role.component.html',
  styleUrl: './un-assign-role.component.css'
})
export class UnAssignRoleComponent {

  constructor(
    public dialogRef: MatDialogRef<UnAssignRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string; role: string, id: string}
  ) {}


  onConfirm(): void {
    this.dialogRef.close(true); // Close the dialog and return true on confirmation
  }

  onCancel(): void {
    this.dialogRef.close(false); // Close the dialog and return false on cancellation
  }

}
