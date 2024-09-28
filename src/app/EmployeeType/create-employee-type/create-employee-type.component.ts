import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeTypeService } from '../../services/employee-type.service';
import { employeeType } from '../../models/employee-type';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-create-employee-type',
  templateUrl: './create-employee-type.component.html',
  styleUrl: './create-employee-type.component.css'
})
export class CreateEmployeeTypeComponent {
  employeeTypeForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeTypeService: EmployeeTypeService,
    private snackBar: MatSnackBar
  ) {
    this.employeeTypeForm = this.fb.group({
      Name: ['', Validators.required],
      Description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.employeeTypeForm.patchValue({ catImage: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }



  onSubmit(): void {
    if (this.employeeTypeForm.valid) {
      const newEmployeeType = {
        employeeTypeName: this.employeeTypeForm.value.Name,
        employeeTypeDescription: this.employeeTypeForm.value.Description
      }
      console.log('New employee type', newEmployeeType);
      this.employeeTypeService.createEmployeeType(newEmployeeType).subscribe({
        next:(value) => {
          this.snackBar.open(`employee type: ${newEmployeeType.employeeTypeName.toUppercase()} created!`,'',{
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['custom-snack-bar']
          })
        },
        complete:() => {
        this.router.navigate(['admin/employee-types']);
        },
        error:(err) => {
         if(err.status === 409){
          this.snackBar.open(`employee type: ${newEmployeeType.employeeTypeName.toUppercase()} already exists.`,'',{
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['custom-snack-bar']
          })
         }
        },
      }
       
      );
    }
  } 
}
