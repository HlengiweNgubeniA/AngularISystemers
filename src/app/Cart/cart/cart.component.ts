import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { FlgServiceService } from '../../Shop/flg-service.service';
import { VATService } from '../../services/vat.service';
import { VAT } from '../../models/vat';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [DecimalPipe]
})
export class CartComponent implements OnInit {
isLoginIconFlagged = false; // Flag for the login icon
productsInBasket: any[] = [];
vat: VAT[] = [];
cartName: string = 'My cart';
vatRate: number = 0;


basketItemCount = 0;

constructor(private vatService: VATService,private loginFlagService: FlgServiceService,private authService: AuthService,private snackbar: MatSnackBar,private router: Router,private basketService: BasketService, private decimalPipe: DecimalPipe) {
  this.productsInBasket = this.basketService.getProductsInBasket();
}

ngOnInit(): void {
  this.productsInBasket = this.basketService.getProductsFromSession();
  //console.log('Products in basket:', this.productsInBasket);

  this.basketService.basketCount$.subscribe(count => {
    this.basketItemCount = count;
  })
  
  this.basketService.getProductsFromSession(); // Save updated basket to session

this.getVat();
//this.setTotalCost();
localStorage.setItem('CartName', this.cartName );


}

getTotalWithoutVAT(): number {
  return this.productsInBasket.reduce((total, product) => total + (product.price * product.quantity), 0);
}

getVATAmount(): number {
  return this.getTotalWithoutVAT() * this.vatRate;
}
 
getTotalWithVAT(): number {
  return this.getTotalWithoutVAT() + this.getVATAmount();
}

setTotalCost(){
localStorage.setItem('Total cost', JSON.stringify(this.getTotalWithoutVAT() + this.getVATAmount()))
}

// Function to remove an item from the basket
removeProduct(product: any): void {
  this.productsInBasket = this.productsInBasket.filter(p => p !== product);
  this.basketService.clearBasket(); // Clear basket in service
  this.productsInBasket.forEach(p => this.basketService.addToBasket(p)); // Add back remaining products
  this.basketService.saveProductsToSession();
  this.setTotalCost();
}

// Function to clear the basket
clearBasket(): void {
  this.basketService.clearBasket();
  this.productsInBasket = [];
  this.setTotalCost()
}
  
// Update localStorage
updateLocalStorage(): void {
  localStorage.setItem('productsInBasket', JSON.stringify(this.productsInBasket));
}
// proceedToCheckout(): void {
//   this.router.navigate(['/payment'])
//   // Navigate to the checkout page or implement further checkout logic here
// }

displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'total','update' ,'remove'];
  
// Increase product quantity
increaseQuantity(product: any): void {
  const foundProduct = this.productsInBasket.find(p => p.name === product.name);
  if (foundProduct && foundProduct.quantity > 0) {
    foundProduct.quantity += 1; // Increase quantity
    localStorage.setItem('basket', JSON.stringify(this.productsInBasket));
    localStorage.setItem('count',JSON.stringify(this.basketService.getProductsInBasket.length));
  }
  this.setTotalCost();
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
  this.setTotalCost();
}


// Rounding to two decimal places
 formatCurrency(value: number): string {
   const formattedValue = this.decimalPipe.transform(value, '1.2-2');
    return formattedValue !== null ? formattedValue : '0.00'; // Handle null case
 }



 proceedToCheckout(): void{
  if(this.authService.isLoggedIn()){
    //Redirect to uploading proof of payment
    this.router.navigate(['customer-nav/payment']);
    this.isLoginIconFlagged = false;
  } else {
    this.snackbar.open('To proceed to checkout, please login to your SbyS account.','',{
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
    this.isLoginIconFlagged = true;

    // Reset the flag after 5 seconds
    setTimeout(() => {
      this.isLoginIconFlagged = false; // Reset the flag after 5 seconds
    }, 10000); // 10000 milliseconds = 5 seconds

  }
}



tooltipVisible: boolean = false;

showToolTip(){
  this.tooltipVisible = true;
  setTimeout(() => {
    this.tooltipVisible = false;
  }, 1000)
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


}
