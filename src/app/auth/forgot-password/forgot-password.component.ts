import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit{
forgotPasswordForm!: FormGroup;


constructor(
  private fb: FormBuilder,
  private authService: AuthService,
  private snackBar: MatSnackBar,
  private dialogRef: MatDialogRef<ForgotPasswordComponent>,
){}


ngOnInit(): void {
  this.forgotPasswordForm = this.fb.group({
    email: ['',[Validators.required, Validators.email]]
  });
}

onSubmit(){
  if(this.forgotPasswordForm.valid){
    const email = this.forgotPasswordForm.value.email;
    this.authService.forgotPassword(email).subscribe(
      r => {
         this.snackBar.open('Reset link sent. Check your email.','',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
         });
         this.dialogRef.close(true);
      }, error => {
        this.snackBar.open('Failed to send reset link. Please make sure the provided email has an SbyS account and try again.','',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        })
      }
    )
  }
}

back(){
  this.dialogRef.close(false);
}

}
