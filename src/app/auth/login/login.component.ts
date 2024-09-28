import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

isPasswordVisible: boolean = false;




  loginForm: FormGroup;
  userProfile: any;
  userRole: string | null = null;
  userName: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
    });
  }

  ngOnInit() {

    this.userName = this.authService.getUserProfile();
    
      }

      isLoggedIn: boolean = false


      onSubmit(): void {
    
        if (this.loginForm.valid) {
          this.isLoggedIn = true
          this.authService.login(this.loginForm.value).subscribe({
            next: (response: any) => {
              
            
            },
            complete: () => {
              
              this.snackBar.open('Login successful', '', {
                duration: 3000, // Duration in milliseconds
                horizontalPosition: 'center', // Center horizontally
                verticalPosition: 'top', // Default position is bottom, you can set 'top' if you want it to appear at the top
              });
            },
            error: () => {
              this.snackBar.open('Failed to login', 'Close', {
                duration: 3000, // Duration in milliseconds
                horizontalPosition: 'center', // Center horizontally
                verticalPosition: 'top', // Default position is bottom, you can set 'top' if you want it to appear at the top
              });
            }
        }); 
        }
      }

      fetchUserProfile(): void {
        this.authService.getUserProfile();
      }

openForgotPasswordDialog(): void{
  const dialogref = this.dialog.open(ForgotPasswordComponent,{
    width: '400px',
    disableClose: true
  })
}



togglePasswordVisibility(){
  this.isPasswordVisible = !this.isPasswordVisible;
}

// Custom password validator
passwordValidator(control: AbstractControl) {
  const password = control.value;
  const errors: { [key: string]: boolean } = {}; // Correct initialization

  // Check for required conditions
  if (!/(?=.*[a-z])/.test(password)) {
    errors['lowercase'] = true; // Missing lowercase letter
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    errors['uppercase'] = true; // Missing uppercase letter
  }
  if (!/(?=.*\d)/.test(password)) {
    errors['number'] = true; // Missing number
  }
  if (!/(?=.*[!@#$%^&*])/i.test(password)) {
    errors['special'] = true; // Missing special character
  }
  if (password.length < 12) {
    errors['minlength'] = true; // Less than 12 characters
  }

  return Object.keys(errors).length ? errors : null; // Return errors if any
}
}
