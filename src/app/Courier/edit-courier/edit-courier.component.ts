import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Courier } from '../../models/courier';
import { CourierService } from '../../services/courier.service';

@Component({
  selector: 'app-edit-courier',
  templateUrl: './edit-courier.component.html',
  styleUrl: './edit-courier.component.css'
})
export class EditCourierComponent {

  editForm: FormGroup;
  courierId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private courierService:  CourierService
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.courierId = this.route.snapshot.params['id'];
    this.loadCourier();
  }

  loadCourier(): void {
    this.courierService.getCourier(this.courierId).subscribe(data => {
      console.log('load edit form',data);
      this.editForm.patchValue(data);
      this.editForm.patchValue({
        name: data.name,
        description: data.description,
        status: data.status
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
      this.courierService.updateCourier(this.courierId, this.editForm.value).subscribe(() => {
        this.router.navigate(['/couriers']);
      });
    }
  }
}