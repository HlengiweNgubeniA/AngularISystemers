import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventory } from '../../models/inventory';
import { Product } from '../../models/product';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-edit-inventory',
  standalone: false,
  templateUrl: './edit-inventory.component.html',
  styleUrl: './edit-inventory.component.css'
})
export class EditInventoryComponent {
  editForm: FormGroup;
  products: Product[] = [];
  inventoryId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private inventoryService:  InventoryService
  ) {
    this.editForm = this.fb.group({
      inventoryId: [''],
      productId: [''],
      quantity: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.inventoryId = this.route.snapshot.params['id'];
    this.loadInventory();
    this.loadProducts();
  }

  loadInventory(): void {
    this.inventoryService.getInventory(this.inventoryId).subscribe(data => {
      console.log('load edit form',data);
      this.editForm.patchValue(data);
      this.editForm.patchValue({
        inventoryId: data.inventoryId,
        productId: data.productId,
        name: data.name,
        description: data.description,
        quantity: data.quantity
      })
    });
  }

  loadProducts(): void {
    this.inventoryService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

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
      this.inventoryService.updateInventory(this.inventoryId, this.editForm.value).subscribe(() => {
        this.router.navigate(['/inventories']);
      });
    }
  }
}
