import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from '../../models/supplier';
import { SupplierService } from '../../services/supplier.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrl: './edit-supplier.component.css'
})
export class EditSupplierComponent {
  editForm: FormGroup;
  supplierId: number = 0;

  constructor(
    public dialogRef: MatDialogRef<EditSupplierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Supplier,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private supplierService:  SupplierService
  ) {
    this.editForm = this.fb.group({
      supName: ['', Validators.required],
      contactPerson: ['', Validators.required],
      supEmail: ['', Validators.required],
      supContact: ['', Validators.required],
      supAddress: ['', Validators.required]
    });
  }

  ngOnInit(): void {
   
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.supplierService.updateSupplier(this.supplierId, this.editForm.value).subscribe(() => {
        this.router.navigate(['/suppliers']);
      });
    }
  }
}

