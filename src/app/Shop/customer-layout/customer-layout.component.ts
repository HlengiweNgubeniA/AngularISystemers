import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../Cart/basket.service';
import { CartComponent } from '../../Cart/cart/cart.component';


@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent  implements OnInit{
  
  
  
  
basketItemCount = 0;

constructor(private basketService: BasketService) {}

  
  ngOnInit(): void {

    // this.basketService.getProducts().subscribe(data => {
    //   this.products = data;
    // })
    
      this.basketService.basketCount$.subscribe(count => {
        this.basketItemCount = count;
      })
    }













}
