import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { StockType } from '../../models/stock-type';
import { StockTypeService } from '../../services/stock-type.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OccasionType } from '../../models/occasion-type';
import { Discount } from '../../models/discount';

@Component({
  selector: 'app-stock-type',
  templateUrl: './stock-type.component.html',
  styleUrl: './stock-type.component.css'
})
export class StockTypeComponent implements OnInit, AfterViewInit {
  stockTypes: StockType[] = [];
  dataSource = new MatTableDataSource<StockType>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private stockTypeService: StockTypeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadStockTypes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadStockTypes(): void {
    this.stockTypeService.getStockTypes().subscribe(
      data => {
        this.stockTypes = data;
        this.dataSource.data = data; // Populate dataSource
        console.log('Stock Types fetched successfully', data);
      },
      error => {
        console.error('Error fetching stock types', error);
        this.snackBar.open('Failed to load stock types', 'Close', {
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

  editStockType(stockTypeId: number): void {
    this.router.navigate(['/edit-stock-type', stockTypeId]);
  }

  deleteStockType(stockTypeId: number): void {
    if (confirm('Are you sure you want to delete this stock type?')) {
      this.stockTypeService.deleteStockType(stockTypeId).subscribe(() => {
        this.loadStockTypes();
      });
    }
  }
}
