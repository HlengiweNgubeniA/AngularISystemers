import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { OrderService } from '../services/order.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService implements OnInit {
private productsInBasket: any[] = this.getProductsFromSession();
private basketCount = new BehaviorSubject<number>(this.productsInBasket.length);

private basketTimeoutKey = 'asketTimeOut';
private basketKey = 'basket';
private clearTimeoutDuration = 60000;



basketCount$ = this.basketCount.asObservable();


  constructor(private http: HttpClient, private order: OrderService) { 
    
  }

ngOnInit(): void {
  this.getProductsFromSession();
}



addToBasket(product: any){
  const existingProduct = this.productsInBasket.find(p => p.name === product.name);
  if(existingProduct){
    existingProduct.quantity += 1;
  } else{
    this.productsInBasket.push({...product, quantity: 1});
  }
  
  this.updateBasketCount();
  this.saveProductsToSession();



}

getBasketProduct(){
  return this.productsInBasket;
}

private updateBasketCount(){
  this.basketCount.next(this.productsInBasket.length);
}


getProductsInBasket(): any[]{
  return this.productsInBasket;
}


clearBasket(): void {
  this.productsInBasket = [];
  localStorage.removeItem('basket');
  localStorage.removeItem('CartName');
  localStorage.removeItem('productInBasket');
  this.updateBasketCount();
  this.saveProductsToSession();
}

 saveProductsToSession(): void {
  localStorage.setItem('basket', JSON.stringify(this.productsInBasket));
  localStorage.setItem('count',JSON.stringify(this.getProductsInBasket.length));
}


 getProductsFromSession(): any[] {
  const savedBasket = localStorage.getItem('basket');
  return savedBasket ? JSON.parse(savedBasket) : [];
}

loadBasketCountFromLocalStorage(): number {
  const count = localStorage.getItem('count');
  return count ? JSON.parse(count) : 0;
}


private checkBasketTimeout() {
  const savedBasket = localStorage.getItem(this.basketKey);
  const savedTimestamp = localStorage.getItem(this.basketTimeoutKey);
  
  if (savedBasket && savedTimestamp) {
    const timestamp = JSON.parse(savedTimestamp);
    const currentTime = Date.now();
    
    // Check if the saved timestamp is older than the timeout duration
    if (currentTime - timestamp > this.clearTimeoutDuration) {
      this.clearBasketItems(); // Clear the basket if the timeout has passed
    } else {
      this.productsInBasket = JSON.parse(savedBasket); // Load products if timeout not reached
    }
  }
}

private clearBasketItems() {
  this.productsInBasket = [];
  localStorage.removeItem(this.basketKey);
  localStorage.removeItem(this.basketTimeoutKey);
}

productApiUrl = 'https://localhost:7002/api/Product'

getProducts(): Observable<any[]> {
  return this.http.get<any[]>(this.productApiUrl);
}




//-------------------------get basket by customer Id---------------//

a = 'https://localhost:7158/api/Basket/'



getBasketByCustomerId(customerId: number): Observable<any>{
return this.http.get<any>(`${this.a}/${customerId}`);
} 

// updateBasket(basket: string): Observable<any>{
//   return this.http.put<any>(this.a, basket);
// }




}


