import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private apiUrl = 'https://localhost:7158/Users';

  constructor(private http: HttpClient) { }

  getMyProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/me`);
}

uploadProfilePhoto(photo: FormData): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/upload-photo`, photo);
}


private Url = 'https://localhost:7158/api/AssignUserRole/UpdateRole';

updateRole(model: UserRoleUpdateVM): Observable<HttpResponse<any>>{


  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.http.put<HttpResponse<any>>(this.Url, model, {headers, observe: 'response' })
}

private u = `https://localhost:7158/api/AssignUserRole/UnassignRole`
unassignRole( userId: string): Observable<any>{
  console.log('recieve user id', {id: userId})
  return this.http.post<any>(`${this.u}`,{id:userId});
  

}




//Needs adjusting
getCurrentUser(): Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/current`)
}

// Update user details (example)
updateUserDetails(user: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/update`, user);
}


getAllUsers(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}

//delete user
 deleteUserApiurl='https://localhost:7158/api/Auth';
deleteUser(id: string): Observable<void>{
  return this.http.delete<void>(`${this.apiUrl}/${id}`)
}






//---------------------------Customer profile-------------//
api = 'https://localhost:7158/api/Customer'

getcustomerById(id: number): Observable<Customer>{
  return this.http.get<Customer>(`${this.api}/${id}`)
}

a = 'https://localhost:7158/api/Customer'
updateCustomerdetails(id: number, CustomerVM : string): Observable<any>{
  return this.http.put<any>(`${this.a}/${id}`, CustomerVM )
}



}

export interface Customer {
  customerId: number; // Adjust according to your backend model
  cusFirstName: string;
  cusLastName: string;
  cusEmail: string;
  cusPhone: string;
  picture: string;
  address: string;
}





export interface data{
  email: string;
  role: string;
}

export interface UserProfile {
  userId: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  
}

export interface User {
  id: string;
  Name: string;
  Email: string;
  Role: string;
}

export interface AssignRoleRequest {
  email: string; // The email of the user to assign a role
  role: string;  // The role to assign
}

export interface UserRoleUpdateVM {
  email: string;
  newRole: string;
}