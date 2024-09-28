import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employee';
import { Supplier } from '../../models/supplier';
import { SupplierOrder } from '../../models/supplier-order';
import { SupplierOrderService } from '../../services/supplier-order.service';

@Component({
  selector: 'app-edit-supplier-order',
  templateUrl: './edit-supplier-order.component.html',
  styleUrl: './edit-supplier-order.component.css'
})
export class EditSupplierOrderComponent {
  editForm: FormGroup;
  employees: Employee[] = [];
  suppliers: Supplier[] = [];
  supplierOrderId: number = 0;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private supplierOrderService: SupplierOrderService
  ) {
    this.editForm = this.fb.group({
      empId: ['', Validators.required],
      supplierId: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      sOrderDate: ['', Validators.required],
      sOrderItems: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      paymentAmount: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.supplierOrderId = this.route.snapshot.params['id'];
    this.loadSupplierOrder();
    this.loadEmployees();
    this.loadSuppliers();
  }

  loadSupplierOrder(): void {
    this.supplierOrderService.getSupplierOrder(this.supplierOrderId).subscribe(data => {
      console.log('Loaded supplier order data', data);
      this.editForm.patchValue({
        deliveryAddress: data.deliveryAddress,
        paymentMethod: data.paymentMethod,
        sOrderItems: data.sOrderItems,
        sOrderDate: new Date(data.sOrderDate),
        paymentAmount: data.paymentAmount,
        empId: data.empId,
        supplierId: data.supplierId,
        quantity: data.quantity
      });
      //this.selectedImage = data.catImage;
    });
  }

  loadEmployees(): void {
    this.supplierOrderService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  loadSuppliers(): void {
    this.supplierOrderService.getSuppliers().subscribe(data => {
      this.suppliers = data;
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
        this.editForm.patchValue({ catImage: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.supplierOrderService.updateSupplierOrder(this.supplierOrderId, this.editForm.value).subscribe(() => {
        this.router.navigate(['/supplier-orders']);
      });
    }
  }
}
