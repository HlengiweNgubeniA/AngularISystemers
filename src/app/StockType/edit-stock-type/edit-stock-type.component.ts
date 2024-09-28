import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StockType } from '../../models/stock-type';
import { StockTypeService } from '../../services/stock-type.service';

@Component({
  selector: 'app-edit-stock-type',
  templateUrl: './edit-stock-type.component.html',
  styleUrls: ['./edit-stock-type.component.css'] // Corrected
})
export class EditStockTypeComponent {
  editForm: FormGroup;
  stockTypeId: number = 0;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private stockTypeService:  StockTypeService
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.stockTypeId = this.route.snapshot.params['id'];
    this.loadStockType();
  }

  loadStockType(): void {
    this.stockTypeService.getStockType(this.stockTypeId).subscribe(data => {
      console.log('Loaded stock type data', data);
      this.editForm.patchValue({
        name: data.name,
        description: data.description
      });
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.stockTypeService.updateStockType(this.stockTypeId, this.editForm.value).subscribe(() => {
        this.router.navigate(['/stock-types']);
      });
    }
  }
}
