import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StockTakeService } from '../../services/stock-take.service';
import { StockTake } from '../../models/stock-take';

@Component({
  selector: 'app-create-stock-take',
  templateUrl: './create-stock-take.component.html',
  styleUrl: './create-stock-take.component.css'
})
export class CreateStockTakeComponent {
  stockTakeForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private stockTakeService: StockTakeService
  ) {
    this.stockTakeForm = this.fb.group({
      date: ['', Validators.required],
      location: ['', Validators.required],
      stockTakeDescription: [''],
      responsibility: [''],
      itemsCounted: ['', Validators.required],
      itemsExpected: ['', Validators.required]
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
        this.stockTakeForm.patchValue({ catImage: this.selectedImage });
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
        this.stockTakeForm.patchValue({
          catImage: reader.result as string
        });
      };
    }
  }

  onSubmit(): void {
    if (this.stockTakeForm.valid) {
      const newStockTake: StockTake = this.stockTakeForm.value;
      console.log('New stock take', newStockTake);
      this.stockTakeService.createStockTake(newStockTake).subscribe({
        next:(value) => {
          console.log('Stock Take created successfully', value);
        },
        complete:() => {
        this.router.navigate(['/stock-takes']);
        },
        error:(err) => {
          console.error('Error creating a new stock take', err);
        },
      }
       
      );
    }
  } 
}
