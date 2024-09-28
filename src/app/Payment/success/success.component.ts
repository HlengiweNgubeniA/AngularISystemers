import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../Cart/basket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent implements OnInit {


constructor(private cartManager: BasketService, private router: Router){}

ngOnInit(): void {
  this.cartManager.clearBasket();

setTimeout(() => {
  this.router.navigate(['customer-nav/my-orders']);
}, 5000)

}





}
