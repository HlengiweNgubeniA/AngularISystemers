import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css'
})
export class CreateCustomerComponent {
  customerForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService
  ) {
    this.customerForm = this.fb.group({
      userId: ['', Validators.required],
      cusFirstName: ['', Validators.required],
      cusLastName: ['', Validators.required],
      cusPhone: ['', Validators.required],
      cusEmil: ['', [Validators.required, Validators.email]],
      //customerImage: ['', Validators.required]
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
        this.customerForm.patchValue({ catImage: this.selectedImage });
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
        this.customerForm.patchValue({
          catImage: reader.result as string
        });
      };
    }
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      const newCustomer: Customer = this.customerForm.value;
      console.log('New Customer!', newCustomer);
      this.customerService.createCustomer(newCustomer).subscribe({
        next:(value) => {
          console.log('Customer created successfully', value);
        },
        complete:() => {
        this.router.navigate(['/customer']);
        },
        error:(err) => {
          console.error('Error creating a new customer.', err);
        },
      }     
      );
    }
  } 
}
