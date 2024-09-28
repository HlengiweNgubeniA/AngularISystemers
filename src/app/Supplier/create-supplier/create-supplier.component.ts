import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../models/supplier';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrl: './create-supplier.component.css'
})
export class CreateSupplierComponent {
  supplierForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private supplierService: SupplierService
  ) {
    this.supplierForm = this.fb.group({
      supName: ['', Validators.required],
      contactPerson: ['', Validators.required],
      supEmail: ['', Validators.required],
      supContact: ['', Validators.required],
      supAddress: ['', Validators.required]
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
        this.supplierForm.patchValue({ catImage: this.selectedImage });
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
        this.supplierForm.patchValue({
          catImage: reader.result as string
        });
      };
    }
  }

  onSubmit(): void {
    if (this.supplierForm.valid) {
      const newSupplier: Supplier = this.supplierForm.value;
      console.log('New supplier', newSupplier);
      this.supplierService.createSupplier(newSupplier).subscribe({
        next:(value) => {
          console.log('Supplier created successfully', value);
        },
        complete:() => {
        this.router.navigate(['/suppliers']);
        },
        error:(err) => {
          console.error('Error creating a new supplier', err);
        },
      }
       
      );
    }
  } 
}