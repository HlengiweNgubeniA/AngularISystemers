import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StockService } from '../../services/stock.service';
import { StockType } from '../../models/stock-type';
import { StockWriteOff } from '../../models/stock-writeoff';
import { StockTake } from '../../models/stock-take';
import { Stock } from '../../models/stock';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrl: './create-stock.component.css'
})
export class CreateStockComponent {
  stockForm: FormGroup;
  stockTypes: StockType[] = [];
  stockTakes: StockTake[] = [];
  stockWriteOffs: StockWriteOff[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private stockService: StockService
  ) {
    this.stockForm = this.fb.group({
      stockTypeId: ['', Validators.required],
      stockTakeId: [''],
      stockWriteOffId: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.stockService.getStockTypes().subscribe(data => {
      this.stockTypes = data;
    });

    this.stockService.getStockTakes().subscribe(data => {
      this.stockTakes = data;
    });

    this.stockService.getStockWriteOffs().subscribe(data => {
      this.stockWriteOffs = data;
    });
  }

  onSubmit(): void {
    if (this.stockForm.valid) {
      const newStock: Stock = this.stockForm.value;
      console.log('New stock', newStock);
      this.stockService.createStock(newStock).subscribe({
        next:(value) => {
          console.log('Stock created successfully', value);
        },
        complete:() => {
        this.router.navigate(['/stocks']);
        },
        error:(err) => {
          console.error('Error creating stock', err);
        },
      }
       
      );
    }
  } 
}
