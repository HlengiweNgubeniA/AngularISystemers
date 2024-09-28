import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../payment.service';
import { CartComponent } from '../../Cart/cart/cart.component';
import { HttpClient } from '@angular/common/http';
import { BasketService } from '../../Cart/basket.service';

import { FormBuilder } from '@angular/forms';
import { Md5 } from 'ts-md5';
import { environment } from '../../../environment';
declare function payfast_do_onsite_payment(param1 : any, callback : any): any;



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  constructor ( private paymentService: PaymentService, private router: Router) {}

  // payment method
  initiatePayment(orderId: number): void {
    this.paymentService.makePayment(orderId).subscribe(
      response => {
        const form = document.createElement('form');
        form.innerHTML = response;
        document.body.appendChild(form);
        form.submit();
      },
      error => {
        console.error('Payment initiation failed', error);
      }
    )
  }
 
  amount: number = 0;

  pay() {
    const paymentData = {
      merchant_id: '10035046',
      merchant_key: '6sntbi1o7earx',
      return_url: 'http://localhost:4200/success',
      cancel_url: 'http://localhost:4200/cancel',
      notify_url: 'https://your-backend-api.com/notify',
      name_first: 'John',
      name_last: 'Doe',
      email_address: 'u22586522@tuks.co.za',
      m_payment_id: 'unique-order-id',
      amount: this.amount,
      item_name: 'Product Name',
      item_description: 'Description of the product'
    };

    this.paymentService.makePayment(paymentData).subscribe(response => {
      window.location.href = response.url; // Redirect to PayFast
    });
  }




}




