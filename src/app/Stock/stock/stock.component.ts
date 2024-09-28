import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Stock } from '../../models/stock';
import { StockService } from '../../services/stock.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StockType } from '../../models/stock-type';
import { StockWriteOffService } from '../../services/stock-writeoff.service';
import { StockWriteOff } from '../../models/stock-writeoff';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent implements OnInit, AfterViewInit {
  stocks: Stock[] = [];
  dataSource = new MatTableDataSource<Stock>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private stockService: StockService,
    private router: Router,
    private snackBar: MatSnackBar,
    private stockWriteOffService: StockWriteOffService
  ) {}

  ngOnInit(): void {
    this.loadStocks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadStocks(): void {
    this.stockService.getStocks().subscribe(
      data => {
        this.stocks = data;
        this.dataSource.data = data; // Populate dataSource
        console.log('Stocks fetched successfully', data);
      },
      error => {
        console.error('Error fetching stocks', error);
        this.snackBar.open('Failed to load stocks', 'Close', {
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

  editStock(stockId: number): void {
    this.router.navigate(['/edit-stock', stockId]);
  }

  deleteStock(stockId: number): void {
    if (confirm('Are you sure you want to delete stock?')) {
      this.stockService.deleteStock(stockId).subscribe(() => {
        this.loadStocks();
      });
    }
  }

  writeOffStock(stock: Stock): void {
    const reason = prompt("Enter reason for write-off");
    if (reason) {
        const writeOff: StockWriteOff = {
          writeOffItem: stock.name,
          quantityWriteOff: stock.quantity,
          reason: reason,
          writtenOffBy: "Admin", // You can change this to get from user context
          date: new Date(),
          id: 0
        };

        this.stockWriteOffService.createStockWriteOff(writeOff).subscribe(() => {
            this.deleteStock(stock.id); // Remove stock after writing off
        });
    } else {
        alert("Reason for write-off is required.");
    }
}  
}
