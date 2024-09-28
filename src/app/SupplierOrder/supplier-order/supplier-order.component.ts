import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SupplierOrder } from '../../models/supplier-order';
import { SupplierOrderService } from '../../services/supplier-order.service';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee';
import { Supplier } from '../../models/supplier';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-supplier-order',
  templateUrl: './supplier-order.component.html',
  styleUrl: './supplier-order.component.css'
})
export class SupplierOrderComponent implements OnInit, AfterViewInit {
  supplierOrders: SupplierOrder[] = [];
  dataSource = new MatTableDataSource<SupplierOrder>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private supplierOrderService: SupplierOrderService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadSupplierOrders();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadSupplierOrders(): void {
    this.supplierOrderService.getSupplierOrders().subscribe(
      data => {
        this.supplierOrders = data;
        this.dataSource.data = data; // Populate dataSource
        console.log('Supplier orders fetched successfully', data);
      },
      error => {
        console.error('Error fetching supplier orders', error);
        this.snackBar.open('Failed to load supplier orders', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['error-snackbar']
        });
      }
    );
  }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editSupplierOrder(supplierOrderId: number): void {
    this.router.navigate(['/edit-supplier-order', supplierOrderId]);
  }

  deleteSupplierOrder(supplierOrderId: number): void {
    if (confirm('Are you sure you want to delete this supplier order?')) {
      this.supplierOrderService.deleteSupplierOrder(supplierOrderId).subscribe(() => {
        this.loadSupplierOrders();
      });
    }
  }
}

