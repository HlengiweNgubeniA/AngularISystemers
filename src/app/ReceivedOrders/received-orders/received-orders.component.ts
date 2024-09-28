import { Component, OnInit } from '@angular/core';
import { SupplierOrderReceipt } from '../../models/supplier-order-receipt';
import { SupplierOrderReceiptService } from '../../services/supplier-order-receipt.service';

@Component({
  selector: 'app-received-orders',
  templateUrl: './received-orders.component.html',
  styleUrl: './received-orders.component.css'
})
export class ReceivedOrdersComponent implements OnInit {
  receivedOrders: SupplierOrderReceipt[] = [];
  displayedColumns: string[] = [
    'id',
    'supplierOrderId',
    'receiptFileName',
    'dateReceived',
    'expectedQuantity',
    'receivedQuantity',
    'notes'
  ];

  constructor(private receiptService: SupplierOrderReceiptService) { }

  ngOnInit(): void {
    this.loadReceivedOrders();
  }

  loadReceivedOrders(): void {
    this.receiptService.getAllReceipts().subscribe(
      (data: SupplierOrderReceipt[]) => {
        this.receivedOrders = data;
      },
      (error) => {
        console.error('Error fetching received orders:', error);
      }
    );
  }
}
