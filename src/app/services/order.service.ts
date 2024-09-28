import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

api = 'https://localhost:7158/api/Order/customer'
  constructor(private http: HttpClient) { }


getorderByCustomerId(id: number): Observable<Order[]>{
  return this.http.get<Order[]>(`${this.api}/${id}`);
}













id!: number;


private encryptionKey = 'SbyS@Thuso@Hlengiwe@INF370';
private decrypt(ciphertext: string): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, this.encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

 getCustomerId() {
  const encryptedUserProfile = localStorage.getItem('userProfile');
  if (encryptedUserProfile) {
    const decryptedUserProfile = this.decrypt(encryptedUserProfile);
    const userProfile = JSON.parse(decryptedUserProfile); // Assuming userProfile is a JSON string

    if (userProfile && userProfile.customerId) {
     return this.id = userProfile.customerId;
      //console.log(userProfile.customerId)
    } else {
    //  console.error('Customer ID not found in user profile.');
    }
  } else {
   // console.error('User profile not found in local storage.');
  }

  

}







}


export interface OrderLine {
  orderLineId: number;
  productId: number;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  product: { name: string; description: string }; // Adjust based on your Product model
}

export interface Order {
  orderId: number;
  customerId: number;
  statusId: number;
  date: string;
  shippingAddress: string;
  totalAmount: number;
  orderStatus: string;
  totalTaxAmount: number;
  responsibility: string;
  orderNumber: number;
  orderLines: OrderLine[];
  status:  string ; // Adjust based on your Status model
  customer: { name: string }; // Adjust based on your Customer model
}
