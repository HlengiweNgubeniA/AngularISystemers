import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BasketService } from '../../Cart/basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { UserProfileService, Customer } from '../../services/user-profile.service';




@Component({
  selector: 'app-customer-navigation',
  templateUrl: './customer-navigation.component.html',
  styleUrl: './customer-navigation.component.css'
})
export class CustomerNavigationComponent implements OnInit {

  showPaymentIcon: boolean = false; // Controls visibility of payment icon

cartItemCount: number = 0;

constructor(private profileservice: UserProfileService,private order: OrderService,private authService: AuthService,private snackbar: MatSnackBar, private router: Router,private basketService: BasketService) {}

id!: number;
customer: Customer ={} as Customer

ngOnInit(): void {
  this.getCustomerPrfileDetails();
this.getId();



this.authService.startTimer();

  // Subscribe to changes in the cart
  this.basketService.basketCount$.subscribe(count => {
    this.cartItemCount = count;


if(this.cartItemCount > 0)
this.showPaymentIcon = true;

// Hide the icon after 1 minute
setTimeout(() => {
  this.showPaymentIcon = false;
}, 60000); // 60 seconds

  });
}
 

  logout() {
    // Implement logout functionality
    this.authService.logout()
  }




  isLoginIconFlagged = false; // Flag for the login icon
  proceedToCheckout(): void{
    if(this.authService.isLoggedIn()){
      //Redirect to uploading proof of payment
      this.router.navigate(['/pfp']);
      this.isLoginIconFlagged = false;
    } else {
      this.snackbar.open('To proceed to checkout, please login to your SbyS account.','',{
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      
    }
  }



getId(){
  this.id = this.order.getCustomerId();
 
}

  getCustomerPrfileDetails(){
   
    this.profileservice.getcustomerById(this.order.getCustomerId()).subscribe(
      (data) => {
        this.customer = data;
        
      }
    )
  }



// getBasketFromLocalStorageAndDatabaseThenMerge(){
//   this.basketService.getBasketByCustomerId(this.id).subscribe(databaseBasket => {
//     const basketInLocalStorage = localStorage.getItem('basket');
//     let localBasket = basketInLocalStorage ? JSON.parse(basketInLocalStorage) : [];

//    //Local and database baskets
//    if(localBasket.length > 0){
//     if(databaseBasket && databaseBasket.basketItems.length > 0){
//       localBasket.forEach((local: any) => {
//         const existingItems = databaseBasket.basketItems.find((dbItem: any) => dbItem.productId === local.id);
//         if(existingItems){
//          existingItems.quantity += local.quantity; //merging quantities
//         }
//         else{
//           databaseBasket.basketItems.push(local);
//         }
//       });
//     } else{
//       databaseBasket = {basketItem: localBasket};
//     }

// this.basketService.updateBasket(databaseBasket).subscribe(() => {
//   console.log('Cart saved successfully');
//           // Clear guest cart from local storage after merging
//           localStorage.removeItem('guestCart');
// });
//    }

//   });
// }
}
