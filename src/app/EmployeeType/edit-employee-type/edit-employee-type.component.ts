import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { employeeType } from '../../models/employee-type';
import { EmployeeTypeService } from '../../services/employee-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-edit-employee-type',
  templateUrl: './edit-employee-type.component.html',
  styleUrl: './edit-employee-type.component.css'
})
export class EditEmployeeTypeComponent {
  editForm: FormGroup;
  employeeTypeId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private employeeTypeService:  EmployeeTypeService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditEmployeeTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.editForm = this.fb.group({
      employeeTypeName: ['', Validators.required],
      employeeTypeDescription: ['', Validators.required],
    });
  }

  ngOnInit(): void {
     
    this.editForm = this.fb.group({
      employeeTypeName: [this.data.employeeTypeName, Validators.required],
      employeeTypeDescription: [this.data.employeeTypeDescription, Validators.required ],
     // employeeTypeBenefits: [this.data.benefits]
    })}
 

 
 
  onSubmit(): void{
    if(this.editForm.valid){
  //  const updatedRole = this.editForm.value;
  
   this.employeeTypeService.updateEmployeeType(this.data.id, this.editForm.value).subscribe({
    next: () => {
  
      this.dialogRef.close(true);
      this.snackBar.open('Employee type details updated succesfully.','',{
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
