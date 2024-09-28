import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, tap} from 'rxjs';
import { LoginVM } from '../models/login-vm';
import { RegisterVM } from '../models/register-vm';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { Location } from '@angular/common';
import { OnDestroy } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token; // Return true if token exists, otherwise false
  }

  private baseUrl = 'https://localhost:7158/api/Auth'; // Adjust the base URL as needed

  private encryptionKey = 'SbyS@Thuso@Hlengiwe@INF370';

  private encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, this.encryptionKey).toString();
  }

  private decrypt(ciphertext: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }


  constructor(private location: Location,private http: HttpClient, private router: Router, private ngZone: NgZone) { this.startTimer()}

  register(registerVM: RegisterVM): Observable<any> {
    //console.log('register Service',registerVM);
    return this.http.post(`https://localhost:7158/api/Auth/Register`, registerVM);
  }  private currentUserSubject = new BehaviorSubject<any>(null);

  login(loginVM: LoginVM): Observable<any> {
    return this.http.post<UserResponse>(`${this.baseUrl}/Login`, loginVM).pipe(
      tap((response) => {
        // Save user details to localStorage
        localStorage.setItem('userRole', this.encrypt(response.role));
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userProfile', this.encrypt(JSON.stringify(response.profile)));
        this.redirectUser();
        
        // Set current user
         this.currentUserSubject.next(response);
      })
    )


  }

  getUserProfile(): string | null{
    const encryptedprofile =  localStorage.getItem('userProfile')
 
    if (encryptedprofile){
      try{
        // Parse the JSON string
        const userProfile = this.decrypt(encryptedprofile);

        const p = JSON.parse(userProfile);

         // Access the 'name' property
         return p.name || null;

      }
      catch{
       // console.error('Failed to parse user profile from localStorage:');
        return null;
      }
    }
    return null;
  } 

 


  getUserId(): string | null{
    const encryptedprofile =  localStorage.getItem('userProfile')
 
    if (encryptedprofile){
      try{
        // Parse the JSON string
        const userProfile = this.decrypt(encryptedprofile);

        const p = JSON.parse(userProfile);

         // Access the 'name' property
         return p.id || null;

      }
      catch{
       // console.error('Failed to parse user profile from localStorage:');
        return null;
      }
    }
    return null;
  } 








  redirectUser(){
    const encryptedrole = localStorage.getItem('userRole');


if(encryptedrole){
  try{ 
     // Decrypt the role
     const decryptedRole = this.decrypt(encryptedrole);
     const role = decryptedRole.toLowerCase();

     if(role === 'admin'){
      this.router.navigate(['/admin'])
    } 
    else if(role === 'baker'){
      this.router.navigate(['/baker'])
    }
    else if(role === 'customer')
    {
      this.router.navigate(['/customer-nav'])
    }
    else {
      this.router.navigate(['/login'])
    }
    
  }
  catch{
   // console.error('Failed to decrypt user role from localStorage:');
    this.router.navigate(['/']);
  }
  }
  else {
    this.router.navigate(['/']);
}
  }

  logout(){

    localStorage.removeItem('jwt');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('authToken');
     // Clear navigation history
     this.clearNavigationHistory();

this.router.navigate(['/login'])

  }

  private clearNavigationHistory() {
    // Use Location service to replace current entry in history
    // This effectively removes the current history entry, ensuring the user cannot use the back button to return to the logged-in state
    this.location.replaceState('/login'); // Replace with the desired route
  }


//Forgot password
private forgotPassApiUrl = 'https://localhost:7158/api/Auth/ForgotPassword';
forgotPassword(email: string): Observable<any>{
  return this.http.post(`${this.forgotPassApiUrl}`, { email })
}

//Reset password
private resetPasswordApiUrl = 'https://localhost:7158/api/Auth/ResetPassword';
resetPassword(model: any): Observable<any>{
  return this.http.post(`${this.resetPasswordApiUrl}/ResetPassword`, model)
}

private timeout: any;
private readonly inactivityTime = 36000000000; //5 minutes 

startTimer(){
  if(this.isLoggedIn())
  {

  }
  this.remainingTime = this.inactivityTime; 
  this.resetTimer();

// Reset the timer on user activity
document.onmousemove = () => this.resetTimer();
document.onkeypress = () => this.resetTimer();
document.onscroll = () => this.resetTimer();
document.onclick = () => this.resetTimer(); // Optional: Reset on clicks

}

ngOnDestroy(){
  // Clean up the event listeners and timeout
  clearTimeout(this.timeout);
  document.onmousemove = null;
  document.onkeypress = null;
  document.onscroll = null;
  document.onclick = null;
}



resetTimer(){
  this.ngZone.runOutsideAngular(() => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.logout(), this.inactivityTime);
  });
}

private remainingTime!: number;

private logRemainingTime() {
  const interval = setInterval(() => {
    if (this.remainingTime > 0) {
      console.log(`Remaining time before logout: ${this.remainingTime / 1000} seconds`);
      this.remainingTime -= 1000; // Decrease remaining time by 1 second
    } else {
      clearInterval(interval); // Stop the interval when the timer expires
    }
  }, 1000); // Log every second
}


private updatePasswordApiUrl = 'https://localhost:7158/api/Customer/update-password';
updatePassword(id: number, passwordData : any): Observable<any>{
  return this.http.put(`${this.updatePasswordApiUrl}/${id}`, passwordData)
}



}

export interface LoginResponse {
  token: string;       // JWT token returned from the server
  profile: UserProfile; // The user's profile information
  role: string;        // User's role (e.g., "Customer", "Employee")
}
export interface UserProfile {
  Name: string;       // User's full name
  Email: string;      // User's email
  CustomerId: number; // Unique identifier for the customer
  CusFirstName: string; // Customer's first name
  CusLastName: string;  // Customer's last name
  CusPhone: string;     // Customer's phone number
  picture: string;      // URL or path to the customer's picture
  //Basket: Basket;       // Object representing the customer's basket (assuming you have a Basket type)
  //Wishlist: Wishlist;   // Object representing the customer's wishlist (assuming you have a Wishlist type)
}


// user-response.model.ts
export interface UserResponse {
  role: string;
  token: string;
  profile: any; // Define a more specific type if you know the structure of the profile
  Name: string;       // User's full name
  Email: string;      // User's email
  CustomerId: number; // Unique identifier for the customer
  CusFirstName: string; // Customer's first name
  CusLastName: string;  // Customer's last name
  CusPhone: string;     // Customer's phone number
  picture: string; 
}