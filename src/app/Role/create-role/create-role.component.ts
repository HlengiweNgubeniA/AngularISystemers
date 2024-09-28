import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.css'
})
export class CreateRoleComponent {

createRoleForm: FormGroup;

constructor(
  public dialogRef: MatDialogRef<CreateRoleComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder,
  private roleService: RoleService,
  private snackBar: MatSnackBar,
  private authService: AuthService,
)
{
 this.createRoleForm = this.fb.group({
  name: ['', Validators.required]
 })
}

onSubmit(): void{
  if(this.createRoleForm.valid){
    const roleName = this.createRoleForm.value.name;
    const user = this.authService.getUserProfile() || '';
    const roleData = {
      name: roleName,
      IsActive: true,
      user: user
    }
   // console.log('Role and user names',  roleData)
    this.roleService.createRole(roleData).subscribe({
     next: (response) => {
      //console.log('Role updated successfully:', response);
      this.snackBar.open('Role created','',{
        duration: 12000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      this.dialogRef.close(true);
     },
      error: (errorResponse) => {
        if( errorResponse.status === 200){
          

          this.snackBar.open('Role created','',{
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          this.dialogRef.close(true)
        }
          

         if(errorResponse.status === 400){
             if(errorResponse.error == 'Role name cannot be empty'){
              this.snackBar.open('Role name cannot be empty.','',{
                duration: 120000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              })
             }else if(errorResponse.error === 'Role already exists'){
              this.snackBar.open('Role already exists.','',{
                duration: 120000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              })
             }
         } 
      }
    })

  }
}


onCancel(): void {
  this.createRoleForm.reset();
  this.dialogRef.close(); // Close the dialog without submitting
}



capitalizeFirstLetter(event: Event): void {
  const input = event.target as HTMLInputElement;
  const value = input.value;

  // Capitalize the first letter and update the form control
  if (value) {
    input.value = value.charAt(0).toUpperCase() + value.slice(1);
    this.createRoleForm.get('name')?.setValue(input.value); // Update the form control value
  }
}





}
