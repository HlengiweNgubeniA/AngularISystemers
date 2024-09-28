import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleService } from '../../services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css'
})
export class EditRoleComponent implements OnInit {

editRoleForm!: FormGroup;

constructor(
  private fb: FormBuilder,
  private roleService: RoleService,
  public dialogRef: MatDialogRef<EditRoleComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private snackBar: MatSnackBar,
){

}

ngOnInit(): void {
  this.editRoleForm = this.fb.group({
    name: [this.data.role.roleName, Validators.required]
  })
}


onSubmit(): void{
  if(this.editRoleForm.valid){
 const updatedRole = this.editRoleForm.value;

 this.roleService.updateRole(this.data.role.id, updatedRole).subscribe({
  next: () => {

    this.dialogRef.close(true);
    this.snackBar.open('Role name updated succesfully.','',{
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });

    this.dialogRef.close(true)
  },
  error: (error) => {
    console.error('Error updating role:', error);
  }
 })


  }
}

closeModal(): void{
  this.dialogRef.close()
}


}
