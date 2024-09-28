import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierOrderReceipt } from '../../models/supplier-order-receipt';
import { SupplierOrderReceiptService } from '../../services/supplier-order-receipt.service';

@Component({
  selector: 'app-supplier-order-receipt',
  templateUrl: './supplier-order-receipt.component.html',
  styleUrl: './supplier-order-receipt.component.css'
})
export class SupplierOrderReceiptComponent implements OnInit{
  receiptForm!: FormGroup;
  supplierOrderId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private receiptService: SupplierOrderReceiptService
  ) {}

  ngOnInit(): void {
    this.supplierOrderId = +this.route.snapshot.paramMap.get('id')!;
    this.receiptForm = this.fb.group({
      supplierOrderId: [this.supplierOrderId, Validators.required],
      receiptFileName: ['', Validators.required],
      dateReceived: ['', Validators.required],
      expectedQuantity: [0, [Validators.required, Validators.min(1)]],
      receivedQuantity: [0, [Validators.required, Validators.min(0)]],
      notes: ['']
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.receiptForm.patchValue({ receiptFileName: file });
    }
  }

  onSubmit(): void {
    if (this.receiptForm.valid) {
      const formData = new FormData();
      Object.keys(this.receiptForm.controls).forEach((key) => {
        formData.append(key, this.receiptForm.get(key)?.value);
      });

      this.receiptService.createReceipt(formData).subscribe(() => {
        this.router.navigate(['/received-orders']);
      });
    }
  }
}
