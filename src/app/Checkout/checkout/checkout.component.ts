import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environment';
import { PaymentService } from '../../services/payment.service';
import { NotificationHandlerService } from '../../services/notification-handler.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @Input() amount!: number; // Ensures TypeScript knows this will be assigned before use
  payment: { openStripe: boolean; openSuccess: boolean; id: string; };
  clientSecret: string | undefined;
  stripe: any;
  elements: any;

  constructor(
    private paymentService: PaymentService,
    private notificationHandlerService: NotificationHandlerService
  ) {
    this.payment = {
      openStripe: true,
      openSuccess: false,
      id: ''
    };
  }

  ngOnInit(): void {
    this.invokeStripe();
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://js.stripe.com/v3/';
      script.onload = () => {
        this.stripe = (window as any).Stripe(environment.STRIPE_KEY);
      };
      window.document.body.appendChild(script);
    }
  }

  preparePayment(id: string) {
    const data = { via: 'stripe', amount: this.amount * 100 }; // Amount in cents
    this.paymentService.preparePayment(data, id).subscribe((res: any) => {
      this.clientSecret = res.client_secret;
      this.initialize();
    });
  }

  async initialize() {
    if (!this.clientSecret) {
      throw new Error('Client secret is not available.');
    }

    const appearance = {
      theme: 'stripe', // This matches one of the valid values ("stripe", "night", "flat")
    };
    this.elements = this.stripe.elements({ appearance, clientSecret: this.clientSecret });

    const linkAuthenticationElement = this.elements.create('linkAuthentication');
    linkAuthenticationElement.mount('#link-authentication-element');
  
    linkAuthenticationElement.on('change', (event: any) => {
      // Handle email changes if necessary
    });

    const paymentElementOptions = {
      layout: 'tabs',
    };
    const paymentElement = this.elements.create('payment', paymentElementOptions);
    paymentElement.mount('#payment-element');
  }

  async makePayment() {
    const res = await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: `${environment.site}/payment/checkout`, // This should be adjusted if site property is not defined
        receipt_email: '', // Add the customer's email if necessary
      },
    });

    if (res.error) {
      this.notificationHandlerService.showNotification('error', 'Error', res.error.message);
    } else {
      this.payment.openSuccess = true;
      this.payment.openStripe = false;
    }
  }
}



