import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent {
  editForm: FormGroup;
  customerId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {
    this.editForm = this.fb.group({
      userId: ['', Validators.required],
      cusFirstName: [''],
      cusLastName: [''],
      cusPhone: [''],
      cusEmail: [''],
    });
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.loadCustomer();
  }

  loadCustomer(): void {
    this.customerService.getCustomer(this.customerId).subscribe(data => {
      console.log('load edit form',data);
      this.editForm.patchValue(data);
      this.editForm.patchValue({
        username: data.userId,
        customerFirstName: data.cusFirstName,
        customerLastName: data.cusLastName,
        phoneNumber: data.cusPhone,
        emailAddress: data.cusEmail,
      })
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
      this.customerService.updateCustomer(this.customerId, this.editForm.value).subscribe(() => {
        this.router.navigate(['/customer']);
      });
    }
  }
}
