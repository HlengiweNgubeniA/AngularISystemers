import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupplierOrderService } from '../../services/supplier-order.service';
import { Employee } from '../../models/employee';
import { Supplier } from '../../models/supplier';
import { SupplierOrder } from '../../models/supplier-order';

@Component({
  selector: 'app-create-supplier-order',
  templateUrl: './create-supplier-order.component.html',
  styleUrl: './create-supplier-order.component.css'
})
export class CreateSupplierOrderComponent {
  supplierOrderForm: FormGroup;
  employees: Employee[] = [];
  suppliers: Supplier[] = [];
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private supplierOrderService: SupplierOrderService
  ) {
    this.supplierOrderForm = this.fb.group({
      empId: ['', Validators.required],
      supplierId: ['', Validators.required],
      sOrderDate: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      sOrderItems: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      paymentAmount: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.supplierOrderService.getSuppliers().subscribe(data => {
      this.suppliers = data;
    });

    this.supplierOrderService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.supplierOrderForm.patchValue({ catImage: this.selectedImage });
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
        this.supplierOrderForm.patchValue({
          catImage: reader.result as string
        });
      };
    }
  }


  onSubmit(): void {
    if (this.supplierOrderForm.valid) {
      const newSupplierOrder: SupplierOrder = this.supplierOrderForm.value;
      console.log('New supplier order', newSupplierOrder);
      this.supplierOrderService.createSupplierOrder(newSupplierOrder).subscribe({
        next:(value) => {
          console.log('Supplier order created successfully', value);
        },
        complete:() => {
        this.router.navigate(['/supplier-orders']);
        },
        error:(err) => {
          console.error('Error creating supplier order', err);
        },
      }
       
      );
    }
  } 
}
