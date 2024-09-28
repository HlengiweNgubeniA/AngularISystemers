import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../models/stock';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrl: './stock-create.component.css'
})
export class StockCreateComponent implements OnInit {
  createForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private stockService: StockService,
      private router: Router
  ) {
      // Initialize the form
      this.createForm = this.fb.group({
          name: ['', Validators.required],
          description: ['', Validators.required],
          quantity: ['', [Validators.required, Validators.min(1)]]
      });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
      if (this.createForm.valid) {
          const newStock: Stock = this.createForm.value;
          this.stockService.createStock(newStock).subscribe(() => {
              this.router.navigate(['/stock-listing']);
          });
      }
  }
}
