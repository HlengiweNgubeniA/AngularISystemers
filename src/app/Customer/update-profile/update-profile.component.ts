import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfileService } from '../../services/user-profile.service';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent {

  customerForm: FormGroup;
  customerId!: number;
  selectedImage: string | ArrayBuffer | null = null;
  uploadedFile: File | null = null;
  id!: number;
  imageBase64: string | null = null;



  constructor(
    private fb: FormBuilder,
    private customerService: UserProfileService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    // Initialize form
    this.customerForm = this.fb.group({
      cusFirstName: ['', Validators.required],
      cusLastName: ['', Validators.required],
      cusEmail: ['', [Validators.required, Validators.email]],
      cusPhone: ['', Validators.required],
      picture: ['']
    });
  }


  ngOnInit(): void {
    // Get customer ID from route
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));

  this.getCustomerId();
    
// Fetch customer details and populate form
this.customerService.getcustomerById(this.id).subscribe(data => {
  this.customerForm.patchValue(data);
  console.log('Customer data',data)
  if (this.customerForm.value.picture) {
    
   // this.customerForm.value.picutre = data.picture; 
   this.customerForm.get('selectedImage')?.setValue(data.picture);
    console.log('', this.customerForm.value.picutre) // Use existing image
  } else {
    console.warn('No picture found for this customer.');
  }
}); 
  }


  onFileSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.imageBase64 = reader.result as string; // Store base64 image string
        this.customerForm.patchValue({picture: reader.result});
      };
      reader.readAsDataURL(file);

      this.uploadedFile = file;
      console.log('Uploaded picture', this.uploadedFile)
    }
  }




updateCustomer(): void {
  if (this.customerForm.valid) {
    const customerData = this.customerForm.value;

    // Make the API call
    console.log(this.id)
    this.http.put(`https://localhost:7158/api/Customer/${this.id}`, customerData).subscribe(
      () => {
        this.snackBar.open('Customer details updated successfully', 'Close', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
      },
      error => {
        console.error('Update error:', error); // Log the error for debugging
        this.snackBar.open('Error updating customer details', 'Close', { duration: 3000 , verticalPosition: 'top', horizontalPosition: 'center'});
      }
    );
  }
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
  


// Handle file selection and convert it to base64


}