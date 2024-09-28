import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router, private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}


  // onSubmit(): void {
  //   if (this.registerForm.valid) {
     
  //     this.authService.register(this.registerForm.value).subscribe({
  //       next: (response) => {
  //         // Handle successful response
  //         localStorage.setItem('token', response.token);
        
  //         this.snackBar.open('Account successfuly registered.','',{
  //           duration: 3000,
  //           horizontalPosition: 'center', // Center horizontally
  //               verticalPosition: 'top',
  //         })
  //       },
  //       complete:() => {
  //         this.router.navigate(['/login']);
  //       },
  //       error: (err) => {
  //         // Handle error response
  //         this.snackBar.open('Account registration unsuccessful.','',{
  //           duration: 3000,
  //           horizontalPosition: 'center', // Center horizontally
  //               verticalPosition: 'top',
  //         })
  //       }
  //     });
  //   }
  // }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          // Handle successful response
          localStorage.setItem('token', response.token);
          
          this.snackBar.open('Account successfully registered.', '', {
            duration: 1200000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        complete: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          // Handle error response
          let errorMessage: string;
  
          if (err.status === 403) {
            errorMessage = 'Account already exists.';
          } else if (err.status === 500) {
            // Check if there's a message in the error body
            //console.log('What happended', err.error?.message)
            errorMessage = err.error?.message || 'Account registration unsuccessful.';
          } else {
            errorMessage = 'An unexpected error occurred.';
          }
  
          this.snackBar.open(errorMessage, '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
  


}
