import { Component, Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';



@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent {
  employeeForm: FormGroup;
  empId: number = 0;
  maxDate: Date;
  
  constructor(
    public dialogref: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {empId: number},
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private employeeService:  EmployeeService,
    private snackbar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private location: Location,
   
  ) {
      const today = new Date();
      this.maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());


    this.employeeForm = this.fb.group({
       empFirstName: ['', Validators.required],
       empLastName: ['',Validators.required],
       empDOB: ['',Validators.required],
       empGender: ['',Validators.required],
       empAddress: ['',Validators.required],
       empEmail: ['', Validators.required],
       empPhone: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    })
  }

  ngOnInit(): void {
    this.empId = this.data.empId;
    this.loadEmployee();
  }

 loadEmployee(): void {
  this.employeeService.getEmployee(this.empId).subscribe(data => {
    this.employeeForm.patchValue(data);
    this.employeeForm.patchValue({
      empId: data.empId,
      empFirstName: data.empFirstName,
      empLastName: data.empLastName,
      empDOB: data.empDOB,
      empGender: data.empGender,
      empAddress: data.empAddress,
      empEmail: data.empEmail,
      empPhone: data.empPhone,
    })
  });
 }

// onSubmit(): void {
//   if(this.employeeForm.valid){
//     this.employeeService.updateEmployee(this.empId,this.employeeForm).subscribe(() => {
//      console.log('Falided to update employee details.')
//       this.router.navigate(["/employees"])
//     })
//   }
// }

// onSubmit(): void{
//   if (this.employeeForm.valid) {
//     console.log('Payload being sent:', this.employeeForm);
//     this.employeeService.updateEmployee(this.empId, this.employeeForm.value).subscribe({
//       next: () => {
//         console.log('Employee details updated successfully.');
//         this.router.navigate(["/employees"]);
//       },
//       error: (err) => {
//         console.error('Failed to update employee details:', err);
//         this.snackbar.open('Failed to update employee details.', 'Close', { duration: 3000 });
//       }
//     });
//   } else {
//     console.log('Form is invalid:', this.employeeForm.errors);
//     this.snackbar.open('Please fill in all required fields.', 'Close', { duration: 3000 });
//   }
// }

onSubmit(): void {
  if (this.employeeForm.valid) {
    const updateEmployeeData = {
      empId: this.empId,  // Ensure empId is being set correctly
      empFirstName: this.employeeForm.value.empFirstName,
      empLastName: this.employeeForm.value.empLastName,
      empDOB: new Date(this.employeeForm.value.empDOB).toISOString(), // Ensure correct date format
      empGender: this.employeeForm.value.empGender,
      empAddress: this.employeeForm.value.empAddress,
      empEmail: this.employeeForm.value.empEmail,
      empPhone: this.employeeForm.value.empPhone,
    };

    //console.log('Payload being sent:', updateEmployeeData); // Log the payload

    this.employeeService.updateEmployee(this.empId, updateEmployeeData).subscribe({
      next: () => {
        //console.log('Employee details updated successfully.');
        this.snackbar.open('Employeed details updated','',{
          duration: 120000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        })
        
        //this.router.navigate(['./employees'], { relativeTo: this.route });
      },
      error: (err) => {
        //console.error('Failed to update employee details:', err);
        this.snackbar.open('Failed to update employee details.', 'Close', { duration: 3000 });
      }
    });
  } else {
    console.log('Form is invalid:', this.employeeForm.errors);
  }
}


onCancel(): void {
  this.dialogref.close();  // Close the dialog without saving
}

 
ageValidator(control: FormControl) {
  const dob = new Date(control.value);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();


if(age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff <0)))){
  return {ageInvalid: true}
}
return null;

}



}
