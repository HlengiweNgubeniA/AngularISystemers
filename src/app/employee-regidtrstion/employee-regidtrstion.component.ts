import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmployeeService, RegisterEmployeeRequestVM } from '../services/employee.service';
import { RoleService } from '../services/role.service';
import { EmployeeTypeService, employeeTypeVM } from '../services/employee-type.service';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../services/user-profile.service';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-employee-regidtrstion',
  templateUrl: './employee-regidtrstion.component.html',
  styleUrl: './employee-regidtrstion.component.css'
})
export class EmployeeRegidtrstionComponent implements OnInit{
  registrationForm: FormGroup;
  roles: any[] = [];
  types: employeeTypeVM[] = [];
  userType: any[] = [];
  maxDate: Date;
  employeeTypeName: string = '';

  constructor(
    private sanckBar: MatSnackBar,
    private employeeService: EmployeeService,
    private router: Router,
    private fb: FormBuilder,
    private roleService: RoleService,
    private empTypeService: EmployeeTypeService,
    private http: HttpClient,
    private authService: AuthService
  ){

    const today = new Date();
    this.maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    this.registrationForm = this.fb.group({
      empFirstName: ['', Validators.required],
      empLastName: ['', Validators.required],
      empDOB: ['', Validators.required],
      empGender: ['', Validators.required],
      empAddress: ['', Validators.required],
      empPhone: ['', [Validators.required, Validators.maxLength(10),Validators.minLength(10)]],
      empEmail: ['', [Validators.required, Validators.email]],
      roleId: ['', Validators.required],
      empTypeId: ['', Validators.required],
      userTypeId: ['', Validators.required]
    })
  }

  ngOnInit(): void {

// Subscribe to changes on empTypeId and set employeeTypesEmpTypeId
this.registrationForm.get('empTypeId')?.valueChanges.subscribe((selectedValue) => {
  this.registrationForm.get('employeeTypesEmpTypeId')?.setValue(selectedValue);
});

    this.getUserType();
    this.getEmpType();
    this.getRoles();
  }



getRoles(): void {
  this.roleService.getRoles().subscribe(
    (data) =>{
this.roles = data;
  })
}

getUserType(){
  this.employeeService.getUserTypes().subscribe(
    (data) => {
      this.userType = data;

      const t = this.userType.find(ut => ut.name.toLowerCase() === 'employee');
      if(t){
        this.employeeTypeName = t.name;
        this.registrationForm.patchValue({
          userTypeId: t.id
        })
      }


    }
  )
}

getEmpType(){
  this.empTypeService.getEmployeeTypes().subscribe(
   (data) => {
    this.types = data;
   }
  )
}


onSubmit(): void {


  if (this.registrationForm.valid) {
   
const formValues = this.registrationForm.value;
const manager = this.authService.getUserProfile() || '';
const registrationData = {
  userName: `${formValues.empFirstName.charAt(0).toUpperCase()}${formValues.empFirstName.slice(1).toLowerCase()}.${formValues.empLastName.toLowerCase()}@SbyS.com`, // Constructed userName
  email: formValues.empEmail, // Email from form
  password: this.password(),
  name: `${formValues.empFirstName} ${formValues.empLastName}`, // Full name
  empFirstName: formValues.empFirstName,
      empLastName: formValues.empLastName,
      empDOB: formValues.empDOB ? formValues.empDOB.toISOString().split('T')[0] : '', // Format to ISO string without time
      empGender: formValues.empGender,
      empAddress: formValues.empAddress,
      empPhone: formValues.empPhone,
      empEmail: formValues.empEmail,
      roleId: formValues.roleId.toString(), // Role ID as a string
      empTypeId: +formValues.empTypeId, // Ensure this is treated as an integer
      userTypeId: formValues.userTypeId,
      manager: manager,
      };
//console.log('Registration data', registrationData)
      this.employeeService.registerEmployee(registrationData).subscribe({
        next: (response) => {
          // Success case: Employee registered successfully
          this.sanckBar.open('Employee successfully registered.', '', {
            duration: 3000,
            horizontalPosition: 'center', // Center horizontally
            verticalPosition: 'top',
          });
        },
        complete: () => {
          // Optional: Handle completion if needed
        },
        error: (error: HttpErrorResponse) => {
          // Default error message
          let errorMessage = 'Employee registration unsuccessful.';
      
          // Handle specific HTTP status codes
          if (error.status === 400) {
            if (error.error?.errors) {
              // Display validation errors from ModelState
              const validationErrors = Object.values(error.error.errors).flat().join(' ');
              errorMessage = `Registration failed: ${validationErrors}`;
            } else if (typeof error.error === 'string') {
              // Display simple error messages
              errorMessage = error.error;
            }
          } else if (error.status === 500) {
            errorMessage = 'Server error occurred. Please try again later.';
          }
      
          // Log the error (for debugging purposes)
          console.log('Registration data:', registrationData);
          console.error('Error details:', error);
      
          // Show the error message in a snackbar
          this.sanckBar.open(errorMessage, '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
      

  }
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



password(): string{
  const minLength = 6;
    const maxLength = 16;
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "1234567890";
    const specialChars = "!@#$%&*~";
    const allChars = lowerCaseChars + upperCaseChars + digits + specialChars;


 // Determine the length of the password
 const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

// Ensure at least one character of each required type is included
const password = [
  lowerCaseChars.charAt(Math.floor(Math.random() * lowerCaseChars.length)),
  upperCaseChars.charAt(Math.floor(Math.random() * upperCaseChars.length)),
  digits.charAt(Math.floor(Math.random() * digits.length)),
  specialChars.charAt(Math.floor(Math.random() * specialChars.length))
];


// Fill the rest of the password with random characters from allChars
for (let i = password.length; i < length; i++) {
  password.push(allChars.charAt(Math.floor(Math.random() * allChars.length)));
}

// Shuffle the password to randomize the position of the required characters
return this.shuffleArray(password).join('');
}

// Helper function to shuffle the array
private shuffleArray(array: string[]): string[] {
for (let i = array.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [array[i], array[j]] = [array[j], array[i]]; // Swap elements
}
return array;


  }


}


