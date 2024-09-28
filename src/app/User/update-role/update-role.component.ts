import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Output,EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserProfileService, UserRoleUpdateVM } from '../../services/user-profile.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrl: './update-role.component.css'
})
export class UpdateRoleComponent {

  selectedRole: string = '';
  email: string;
  currentRole: string;
  newRole: string = '';

  roles: string[] = ['Baker', 'Admin', 'Employee', 'Customer'];

 // Output to notify parent component of the role update
 @Output() roleUpdated = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<UpdateRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private userRoleService: UserProfileService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    
    this.email = data.email;
    this.currentRole = data.currentRole;

  }

  updateRole(): void {
    const model: UserRoleUpdateVM = { email: this.email, newRole: this.newRole };
    
    this.userRoleService.updateRole(model).subscribe({
      next: () => {

        this.dialogRef.close(true);
        this.snackBar.open('Role updated succesfully.','',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
    
        this.dialogRef.close(true)
      },
      error: (error) => {
        //console.error('Error updating role:', error);
        this.dialogRef.close(true);
        this.snackBar.open('Failed to update role..','',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
        this.dialogRef.close();
      }
     });
    
  }
  

  // updateRole(): void {

  //   const model: UserRoleUpdateVM = {email: this.email, newRole: this.newRole};
  //          this.userRoleService.updateRole(model)
  //           .subscribe({
  //             next: () => {
  //               this.dialogRef.close(true);
                 
  //             }, error: (err: HttpErrorResponse) => {
  //               this.snackBar.open('Failed to update role. Please try again.', '', {
  //                 duration: 3000,
  //                 horizontalPosition: 'right',
  //                 verticalPosition: 'top'
  //               });
  //               this.onCancel()
  //             }
              
              
  //           });
  //         }

  onCancel(): void {
    this.dialogRef.close();
  }




  

}
