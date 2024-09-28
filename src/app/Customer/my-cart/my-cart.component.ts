import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BasketService } from '../../Cart/basket.service';
import { HttpClient } from '@angular/common/http';
import { VATService } from '../../services/vat.service';
import { VAT } from '../../models/vat';
import { OrderService } from '../../services/order.service';
import { StatusService } from '../../services/status.service';

export interface VatVM
{
  percentage: number; // or whatever type it should be
  isActive: boolean;
  user: string; // or the appropriate type
}

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrl: './my-cart.component.css'
})
export class MyCartComponent {
  
  apiUrl = 'https://localhost:7158/api/Order/PlaceOrder';
  productsInBasket: any[] = [];
  tooltipVisible: boolean = false;
  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'total', 'update', 'remove'];
  vat: VAT[] = [];
cartName: string = 'My cart';
vatRate: number = 0;
statusId!: number;

  constructor(private statusservice:StatusService, private orderService: OrderService,private vatService: VATService,private http: HttpClient,private authService: AuthService,private snackbar: MatSnackBar,private router: Router,private basketService: BasketService) {
  }



  ngOnInit(): void {

  localStorage.setItem('OrderTotal', JSON.stringify(this.getTotalWithVAT()));

    // Fetch products from localStorage when component initializes
    this.loadBasket();
    this.getVat();
    this.getTotalWithVAT();
    this.getCustomerId();
    this.getStatusId()
    
    //console.log('Customer id', this.customerId)
  }



  getVat(){
    this.vatService.getVat().subscribe(
    (data) => {
     this.vat = data;
    // console.log('Vat value',this.vat)
         
       if(this.vat.length > 0){
          const vatPercentage = this.vat[0].percentage;
          //this.vatValue = vatPercentage / 100;
          this.vatRate = vatPercentage / 100
          //console.log('Vat %', vatPercentage)
       }
 
 
    }
    )
 }





  // Fetch products from localStorage
  loadBasket(): void {
    this.productsInBasket = this.basketService.getProductsFromSession();
  }

 // Increase product quantity
increaseQuantity(product: any): void {
  const foundProduct = this.productsInBasket.find(p => p.name === product.name);
  if (foundProduct && foundProduct.quantity > 0) {
    foundProduct.quantity += 1; // Increase quantity
    localStorage.setItem('basket', JSON.stringify(this.productsInBasket));
    localStorage.setItem('count',JSON.stringify(this.basketService.getProductsInBasket.length));
  }
}

// Decrease product quantity
decreaseQuantity(product: any): void {
  const foundProduct = this.productsInBasket.find(p => p.name === product.name);
  if (foundProduct && foundProduct.quantity > 1) {
    foundProduct.quantity -= 1; // Decrease quantity
    localStorage.setItem('basket', JSON.stringify(this.productsInBasket));
    localStorage.setItem('count',JSON.stringify(this.basketService.getProductsInBasket.length));
  } else if (foundProduct && foundProduct.quantity === 1) {
    this.removeProduct(product); // If quantity reaches 1, remove the product
  }
}


  // Function to remove an item from the basket
removeProduct(product: any): void {
  this.productsInBasket = this.productsInBasket.filter(p => p !== product);
  this.basketService.clearBasket(); // Clear basket in service
  this.productsInBasket.forEach(p => this.basketService.addToBasket(p)); // Add back remaining products
  this.basketService.saveProductsToSession();
}

  // Clear all products from the basket
  clearBasket(): void {
    this.basketService.clearBasket();
    this.loadBasket(); // Reload the basket after clearing
  }

  // Calculate total price without VAT
  getTotalWithoutVAT(): number {
    return this.productsInBasket.reduce((total, product) => total + (product.price * product.quantity), 0);
  }

  // Calculate VAT amount
  getVATAmount(): number {
    return this.getTotalWithoutVAT() * this.vatRate;
  }

  // Calculate total price with VAT
  getTotalWithVAT(): number {
    const totalWithVat = this.getTotalWithoutVAT() + this.getVATAmount();
    localStorage.setItem('OrderTotal', JSON.stringify(totalWithVat));
    return totalWithVat;
  }

  // Format currency for display
  formatCurrency(amount: number): string {
    return amount.toFixed(2);
  }

  // Proceed to checkout action (can be customized)
  proceedToCheckout(): void {
    if(this.authService.isLoggedIn()){
      //Redirect to uploading proof of payment
      this.router.navigate(['/customer-nav/pfp']);
    } else {
      this.snackbar.open('To proceed to checkout, please login to your SbyS account.','',{
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
     
    }
  }
  

  getStatusId(){
    this.statusservice.getStatuses().subscribe(statuses => {
      const placedStatus = statuses.find(status => status.statusName === "Placed");
      this.statusId = placedStatus ? placedStatus.statusId : null;
      //console.log('Id to be logged', this.statusId)
    })
  }


customerId!: number;
getCustomerId(){
  this.customerId = this.orderService.getCustomerId();
}


// Method to place the order
placeOrder() {
  if (this.productsInBasket.length === 0) {
    this.snackbar.open('','',{
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    })
    return;
  }

  

  // Create the order object based on the cart items
  const order = {
    customerId: this.customerId,
    statusId: this.statusId,
    date: new Date(),
    totalAmount: parseFloat(localStorage.getItem('OrderTotal') || '0'),
    orderStatus: "Placed", // Set as appropriate
    totalTaxAmount: this.getVATAmount(),
    Responsibility: " ",
    shippingAddress: " ",
    orderNumber: 1234,
    employeeId: 5,
    orderLines: this.productsInBasket.map(product => ({
      productId: product.id, // Assuming the product object has an id property
      quantity: product.quantity,
      unitPrice: product.price,
      totalPrice: product.price * product.quantity,
      date: new Date().toISOString()

    })),
  };
  console.log('Order details',order)
 // console.log('Order details before sending:', JSON.stringify(order, null, 2));
 console.log('Order details before sending:', order);

  // Make the API call to place the order
  this.http.post(this.apiUrl, order).subscribe(
    response => {
      console.log('Order placed successfully', response);
      // Clear the cart after successful order placement
      localStorage.removeItem('basket');
      this.productsInBasket = [];
    
      this.router.navigate(['/my-orders']); // Redirect to orders page or any other page
    },
    error => {
      console.error('Error placing order', error);
      
    }
  );
}













}
