import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators ,AbstractControl, ValidationErrors} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserProfileService } from '../../services/user-profile.service';
import * as CryptoJS from 'crypto-js';



@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent implements OnInit{
  updatePasswordForm: FormGroup;
  isCurrentPasswordVisible: boolean = false;
  isNewPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;
  id!: number;


  constructor(private fb: FormBuilder, private userService: AuthService, private customerService: UserProfileService, private snackBar:MatSnackBar) {
    this.updatePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }



ngOnInit(): void {



  this.getCustomerId();

  this.updatePasswordForm.get('newPassword')?.valueChanges.subscribe(value => {
    //this.passwordValidator(value);
    this.checkPasswordMatch();
    //this.passwordMatchValidator(value);
    this.checkPasswordComplexity(value);
  });
  

}


// Custom method to validate password complexity
private checkPasswordComplexity(password: string): void {
  const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/; // Ensure the regex is correct
  const newPasswordControl = this.updatePasswordForm.get('newPassword');

  if (newPasswordControl) {
    if (password && !complexityRegex.test(password)) {
     // console.log('No character',newPasswordControl)
      // Set error for complexity directly on the newPassword control
      newPasswordControl.setErrors({ complexity: true });
    } else {
      // If it meets complexity, clear the error
      newPasswordControl.setErrors(null);
    }
    // Update the control's validity
    newPasswordControl.updateValueAndValidity();
  }
}



  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }


  onSubmit() {
    if (this.updatePasswordForm.valid) {
      //const { currentPassword, newPassword } = this.updatePasswordForm.value;

     const passwordData = {
        currentPassword: this.updatePasswordForm.value.currentPassword,
        newPassword: this.updatePasswordForm.value.newPassword,
        confirmPassword: this.updatePasswordForm.value.confirmPassword,
      }
      //console.log('Password Data:', passwordData);

      this.userService.updatePassword(this.id, passwordData)
        .subscribe(
          () => {
            this.snackBar.open('Password updated successfully.','',{
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            })
           // this.toastr.success('Password updated successfully!');
            this.updatePasswordForm.reset();
          },
          error => {
            //console.log('Password reset failed', this.updatePasswordForm.value.newPassword)
            this.snackBar.open('Password update failed. Try again','',{
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            })
           // this.toastr.error(error.error || 'Error updating password');
          }
        );
    }
  }


   // Method to check if new password and confirm password match
   checkPasswordMatch(): void {
    const newPassword = this.updatePasswordForm.get('newPassword')?.value;
    const confirmPassword = this.updatePasswordForm.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      this.updatePasswordForm.setErrors({ mismatch: true });
    } else {
      this.updatePasswordForm.updateValueAndValidity();
    }
  }



  // Custom validator for password complexity
  passwordValidator(control: any) {
    const password = control.value;
    if (!password) return null; // If no password, return null

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter;

    return isValid ? null : { complexity: true };
  }



  private encryptionKey = 'SbyS@Thuso@Hlengiwe@INF370';
  private decrypt(ciphertext: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  
   getCustomerId(): void {
    const encryptedUserProfile = localStorage.getItem('userProfile');
    if (encryptedUserProfile) {
      const decryptedUserProfile = this.decrypt(encryptedUserProfile);
      const userProfile = JSON.parse(decryptedUserProfile); // Assuming userProfile is a JSON string
  
      if (userProfile && userProfile.customerId) {
        this.id = userProfile.customerId;
        //console.log(userProfile.customerId)
      } else {
      //  console.error('Customer ID not found in user profile.');
      }
    } else {
     // console.error('User profile not found in local storage.');
    }
  }
  


}
