import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
resetPasswordForm!: FormGroup;
loading = false;
successMessage: string = '';
errorMessage: string = '';

constructor(
  private fb: FormBuilder, private authservice: AuthService, private route: Router
){

this.resetPasswordForm = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
  id: ['', Validators.required],
  token: ['', Validators.required],
  confirmPassword: ['', Validators.required]
 }, {validators: this.passwordMatchValidator});
}

passwordMatchValidator(form: FormGroup) {
  return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { passwordMismatch: true };
}

ngOnInit(): void {
  
}

onSubmit(): void {
  if(this.resetPasswordForm.valid){
    this.loading = true;

    this.authservice.resetPassword(this.resetPasswordForm.value). subscribe(
      (response: any) => {
        this.successMessage = response.message;
        this.loading = false;
        this.route.navigate(['/login']);
      }, (error) => {
        this.errorMessage = error?.error?.message || 'An error occured!'
        this.loading = false;
      }
    )
  }
}


}
