import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StockTypeService } from '../../services/stock-type.service';
import { StockType } from '../../models/stock-type';

@Component({
  selector: 'app-create-stock-type',
  templateUrl: './create-stock-type.component.html',
  styleUrl: './create-stock-type.component.css'
})
export class CreateStockTypeComponent {
  stockTypeForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private stockTypeService: StockTypeService
  ) {
    this.stockTypeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.stockTypeForm.patchValue({ catImage: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }

  onFileChange(event: any): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      var image = reader.result as string
      console.log('File changed',image);
      reader.onload = () => {
        this.stockTypeForm.patchValue({
          catImage: reader.result as string
        });
      };
    }
  }


  onSubmit(): void {
    if (this.stockTypeForm.valid) {
      const newStockType: StockType = this.stockTypeForm.value;
      console.log('New Stock Type', newStockType);
      this.stockTypeService.createStockType(newStockType).subscribe({
        next:(value) => {
          console.log('Stock Type created successfully', value);
        },
        complete:() => {
        this.router.navigate(['/stock-types']);
        },
        error:(err) => {
          console.error('Error creating stock type', err);
        },
      }
       
      );
    }
  } 
}
