import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Courier } from '../../models/courier';
import { CourierService } from '../../services/courier.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrl: './courier.component.css'
})
export class CourierComponent implements OnInit, AfterViewInit {
  couriers: Courier[] = [];
  dataSource = new MatTableDataSource<Courier>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private courierService: CourierService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCouriers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadCouriers(): void {
    this.courierService.getCouriers().subscribe(
      data => {
        this.couriers = data;
        this.dataSource.data = data; // Populate dataSource
        console.log('Couriers fetched successfully', data);
      },
      error => {
        console.error('Error fetching couriers', error);
        this.snackBar.open('Failed to load couriers', 'Close', {
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

  editCourier(courierId: number): void {
    this.router.navigate(['/edit-courier', courierId]);
  }

  deleteCourier(courierId: number): void {
    if (confirm('Are you sure you want to delete this courier?')) {
      this.courierService.deleteCourier(courierId).subscribe(() => {
        this.loadCouriers();
      });
    }
  }
}
