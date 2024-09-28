import { Component } from '@angular/core';
import { StockTake } from '../../models/stock-take';
import { StockTakeService } from '../../services/stock-take.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-take',
  templateUrl: './stock-take.component.html',
  styleUrl: './stock-take.component.css'
})
export class StockTakeComponent {
  stockTakes: StockTake[] = [];

  constructor(private stockTakeService: StockTakeService, private router: Router) {}

  ngOnInit(): void {
    this.stockTakeService.getStockTakes().subscribe(
      data => {
        this.stockTakes = data;
        console.log('Stock takes fetched successfully', data);
      },
      error => {
        console.error('Error fetching stock takes', error);
      }
    );
  }
  loadStockTakes(): void {
    this.stockTakeService.getStockTakes().subscribe(data => {
      this.stockTakes = data;
    });
  }

  editStockTake(stockTakeId: number): void {
    this.router.navigate(['/edit-stock-take', stockTakeId]);
  }

  deleteStockTake(stockTakeId: number): void {
    if (confirm('Are you sure you want to delete this stock take?')) {
      this.stockTakeService.deleteStockTake(stockTakeId).subscribe(() => {
        this.loadStockTakes();
      });
    }
  }
}