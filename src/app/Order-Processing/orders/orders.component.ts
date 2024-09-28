import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderProcessingService, Order } from '../order-processing.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements  OnInit{

orders: Order[] = [];


dataSource = new MatTableDataSource<Order>();

// Define the columns that you want to display
displayedColumns: string[] = ['productName', 'quantity', 'totalPrice', 'orderStatus', 'responsibility', 'action'];

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

constructor( private orderService: OrderProcessingService){}

ngOnInit(): void {
  this.orderService.getOrders().subscribe(
    (data) => {
      console.log('Order data', data)
       this.dataSource.data = data
       
    },
    (error) => {
      console.error('Error fetching orders:', error);
    }
  );

this.dataSource.paginator = this.paginator;
this.dataSource.sort = this.sort;
this.updateOrderCount();

 }

 applyFilter(event: Event){
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
 }

 getCount(){
  return this.dataSource.data.length;
}

updateOrderCount(){
  const orderCount = this.dataSource.data.length;
  console.log('Order Count', orderCount)
  return this.orderService.setOrderCount(orderCount);
}


 acceptOrder(orderLineId: number, employeeName: string){
  //const employeeName = 'Me'; //Adjust to retrieve the name fron local storage
  this.orderService.acceptOrder(orderLineId, employeeName).subscribe(
    (response) => {
      console.log('Order accepted.', response)
    },(error) => {
      console.error('Error accepting order.', error)
    }
  );
 }
 

}
