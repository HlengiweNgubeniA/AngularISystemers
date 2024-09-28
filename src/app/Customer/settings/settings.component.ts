import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {

  userForm: FormGroup; // Form to update user details
  currentUser: any = {}; // Store the current user details
  
  constructor(private fb: FormBuilder, private userService: UserProfileService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Load current user details on component initialization
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      // Populate the form with current user data
      this.userForm.patchValue({
        name: user.name,
        email: user.email
      });
    });
  }

  // Validator to check if password and confirmPassword match
  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }


  // Submit form to update user details
  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser = {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
      };
      
      this.userService.updateUserDetails(updatedUser).subscribe(response => {
        console.log('User updated successfully', response);
        alert('Your details have been updated!');
      }, error => {
        console.log('Error updating user', error);
        alert('There was an error updating your details. Please try again.');
      });
    }
  }


}
