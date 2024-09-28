import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Discount } from '../../models/discount';
import { DiscountService } from '../../services/discount.service';

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrl: './edit-discount.component.css'
})
export class EditDiscountComponent {
  editForm: FormGroup;
  discountId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private discountService:  DiscountService
  ) {
    this.editForm = this.fb.group({
      disName: ['', Validators.required],
      disDescription: [''],
      discountPercentage: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.discountId = this.route.snapshot.params['id'];
    this.loadDiscount();
  }

  loadDiscount(): void {
    this.discountService.getDiscount(this.discountId).subscribe(data => {
      console.log('load edit form',data);
      this.editForm.patchValue(data);
      this.editForm.patchValue({
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        disName: data.disName,
        disDescription: data.disDescription,
        discountPercentage: data.discountPercentage
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
      this.discountService.updateDiscount(this.discountId, this.editForm.value).subscribe(() => {
        this.router.navigate(['/discounts']);
      });
    }
  }
}
