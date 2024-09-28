import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StockTake } from '../../models/stock-take';
import { StockTakeService } from '../../services/stock-take.service';

@Component({
  selector: 'app-edit-stock-take',
  templateUrl: './edit-stock-take.component.html',
  styleUrl: './edit-stock-take.component.css'
})
export class EditStockTakeComponent {
  editForm: FormGroup;
  stockTakeId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private stockTakeService: StockTakeService
  ) {
    this.editForm = this.fb.group({
      date: ['', Validators.required],
      location: ['', Validators.required],
      stockTakeDescription: [''],
      responsibility: [''],
      itemsCounted: ['', Validators.required],
      itemsExpected: ['', Validators.required]
    });
  }

 // ngOnInit(): void {
 //   this.stockTakeId = this.route.snapshot.params['id'];
 //   this.loadStockTake();
 // }

  /* loadStockTake(): void {
    this.stockTakeService.getStockTake(this.stockTakeId).subscribe(data => {
      console.log('load edit form',data);
      this.editForm.patchValue(data);
      this.editForm.patchValue({
        date: new Date(data.date),
        location: data.location,
        stockTakeDescription: data.stockTakeDescription,
        responsibility: data.responsibility,
        itemsCounted: data.itemsCounted,
        itemsExpected: data.itemsExpected
      })
    });
  } */

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editForm.patchValue({ catImage: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.stockTakeService.updateStockTake(this.stockTakeId, this.editForm.value).subscribe(() => {
        this.router.navigate(['/stock-takes']);
      });
    }
  }
} 