import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StockType } from '../../models/stock-type';
import { StockTake } from '../../models/stock-take';
import { StockWriteOff } from '../../models/stock-writeoff';
import { Stock } from '../../models/stock';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrl: './edit-stock.component.css'
})
export class EditStockComponent {
  editForm: FormGroup;
  stockTypes: StockType[] = [];
  stockId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private stockService:  StockService
  ) {
    this.editForm = this.fb.group({
      stockTypeId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.stockId = this.route.snapshot.params['id'];
    this.loadStock();
    this.loadStockTypes();
  }

  loadStock(): void {
    this.stockService.getStock(this.stockId).subscribe(data => {
      console.log('Loaded stock data', data);
      this.editForm.patchValue({
        name: data.name,
        description: data.description,
        quantity: data.quantity,
        stockTypeId: data.stockTypeId,
      });
    });
  }

  loadStockTypes(): void {
    this.stockService.getStockTypes().subscribe(data => {
      this.stockTypes = data;
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.stockService.updateStock(this.stockId, this.editForm.value).subscribe(() => {
        this.router.navigate(['/stocks']);
      });
    }
  }
}
