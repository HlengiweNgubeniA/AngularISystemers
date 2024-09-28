import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService, Customer } from '../../services/user-profile.service';
import * as CryptoJS from 'crypto-js';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css'
})
export class ProfileDetailsComponent implements OnInit {
 
customer: Customer = {} as Customer
error: string | null = null;
id!: number;
editForm: FormGroup;
isEditing: boolean = false;
File: File | null = null;

editMode = false;

constructor(private route: ActivatedRoute,
  private profileService: UserProfileService,
  private fb: FormBuilder,
  private snackBar: MatSnackBar,

){
  this.editForm = this.fb.group({
    cusFirstName: ['', Validators.required],
    cusLastName: ['', Validators.required],
    cusEmail: ['', [Validators.required, Validators.email]],
    cusPhone: ['', [Validators.required]],
    picture: ['', Validators.required],
  });
}


toggleEdit() {
  this.isEditing = !this.isEditing;

  if (!this.isEditing) {
    // Reset form when closing the edit
    this.editForm.reset();
    this.editForm.disable();
    this.editForm.patchValue({
      cusFirstName: this.customer.cusFirstName,
      cusLastName: this.customer.cusLastName,
      cusEmail: this.customer.cusEmail,
      cusPhone: this.customer.cusPhone,
      picture: this.customer.picture
    });
  } else {
    this.editForm.enable();
  }
}





fetchCustomerData() {
  // Populate the form with customer data
  this.editForm.patchValue({
    firstName: this.customer.cusFirstName,
    lastName: this.customer.cusLastName,
    email: this.customer.cusEmail,
    phone: this.customer.cusPhone,
  });
}



ngOnInit(): void {
  this.getCustomerId();
  this.getCustomerPrfileDetails();
  //console.log('CustomerId',this.id)
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
    //  console.log(userProfile.customerId)
    } else {
    //  console.error('Customer ID not found in user profile.');
    }
  } else {
   // console.error('User profile not found in local storage.');
  }
}



getCustomerPrfileDetails(){
  this.profileService.getcustomerById(this.id).subscribe(
    (data) => {
      this.customer = data;
    }
  )
}


onSubmit(){
  if(this.editForm.valid){
    this.profileService.updateCustomerdetails(this.id, this.editForm.value).subscribe(
      (data) => {
        this.customer = data;
        this.snackBar.open('Profile details updated.','',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      },
      error => {
        this.snackBar.open('Failed to update.Try again.','',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    )
  }
}



onFileChange(event: Event) {
  const input = event.target as HTMLInputElement; // Type assertion
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.editForm.patchValue({
        picture: reader.result // This will hold the image data
      });
    };
    reader.readAsDataURL(file);
  }
}




}
