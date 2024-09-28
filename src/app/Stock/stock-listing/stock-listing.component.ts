import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../models/stock';
import { Router } from '@angular/router';
import { StockWriteOffService } from '../../services/stock-writeoff.service';
import { StockWriteOff } from '../../models/stock-writeoff';

@Component({
    selector: 'app-stock-listing',
    templateUrl: './stock-listing.component.html',
    styleUrls: ['./stock-listing.component.css']
})
export class StockListingComponent implements OnInit {
    stocks: Stock[] = [];

    constructor(
        private stockService: StockService,
        private router: Router,
        private stockWriteOffService: StockWriteOffService
    ) { }

    ngOnInit(): void {
        this.loadStocks();
    }

    loadStocks(): void {
        this.stockService.getStocks().subscribe(data => {
            this.stocks = data;
        });
    }

    deleteStock(id: number): void {
        this.stockService.deleteStock(id).subscribe(() => {
            this.loadStocks();
        });
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
