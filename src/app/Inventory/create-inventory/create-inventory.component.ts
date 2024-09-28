import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { Inventory } from '../../models/inventory';
import { Product } from '../../models/product';

@Component({
  selector: 'app-create-inventory',
  standalone: false,
  templateUrl: './create-inventory.component.html',
  styleUrl: './create-inventory.component.css'
})
export class CreateInventoryComponent {
  inventoryForm: FormGroup;
  products: Product[] = [];
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private inventoryService: InventoryService
  ) {
    this.inventoryForm = this.fb.group({
      inventoryId: ['', Validators.required],
      productId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.inventoryService.getInventories().subscribe(data => {
      this.products = data;
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.inventoryForm.patchValue({ catImage: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.inventoryForm.patchValue({ catImage: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit(): void {
    if (this.inventoryForm.valid) {
      const newInventory: Inventory = this.inventoryForm.value;
      console.log('New inventory', newInventory);
      this.inventoryService.createInventory(newInventory).subscribe({
        next:(value) => {
          console.log('Inventory created successfully', value);
        },
        complete:() => {
        this.router.navigate(['/inventories']);
        },
        error:(err) => {
          console.error('Error creating inventory', err);
        },
      }
       
      );
    }
  } 
}
