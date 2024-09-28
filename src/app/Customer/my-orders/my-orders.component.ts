import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService, Order, OrderLine } from '../../services/order.service';



@Component({
  selector: 'app-my-orders1',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent1 implements OnInit {


  selectedOrder: Order | null = null;
  previousOrders: Order[] = [];
  orders: Order[] = [];
  oldOrders: Order[] = [];
  id!: number;
  orderStatusMap: {[key: string]: string} = {
    1: 'Placed',
    2: 'Pending',
    3: 'Processing',
    4: 'Done',
    5: 'Waiting Collection',
    6: 'Complete'
  };


  constructor(private orderService: OrderService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getcustomerId();
    this.fetchOrder();
    this.fetchPreviousOrders();
  }


isStepCompleted(status: string, step: number): boolean {
  const orderStatus = Object.keys(this.orderStatusMap).find(key => this.orderStatusMap[key] === status);
  return orderStatus ? parseInt(orderStatus) >= step : false;
}


checkOderstatus(): void {
  this.orders.forEach( order => {
    if(order.status === 'Waiting Collection') {
      setTimeout(() => {
        order.status = 'Complete';
      }, 7200000)
    }
  })
}


getStepColor(step: number): string {
 switch(step){
   case 1: return 'red';
   case 2: return 'orange';
   case 3: return 'yellow';
   case 4: return 'lightyellow';
   case 5: return 'lightgreen';
   case 6: return 'green';
   default: return 'transparent';
 }
}



fetchOrder(): void { 

if(this.id){
  this.orderService.getorderByCustomerId(this.id).subscribe({
    next: (data) => {
      this.orders = data.filter(order => order.orderStatus !== 'Complete')
      console.log('Orders',this.orders)
    },
    error: (error) => {
      console.error('Error fetching orders:', error);
    }
  })
}
}

fetchPreviousOrders(): void{
this.orderService.getorderByCustomerId(this.id).subscribe({next : (data) => {this.oldOrders = data.filter(oldOrder => oldOrder.orderStatus === 'Complete')}});

}

selectOrder(order: Order): void{
  this.selectedOrder = order;
}

getcustomerId(){
 this.id = this.orderService.getCustomerId();
 //console.log(this.id)
  
}


isCurrentStep(orderStatus: string, step: number): boolean {
  const currentStep = Object.keys(this.orderStatusMap).find(key => this.orderStatusMap[key] === orderStatus);
  return currentStep ? parseInt(currentStep) === step : false;
}




}
