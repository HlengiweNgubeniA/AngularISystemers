import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from '../../models/owner';
import { OwnerService } from '../../services/owner.service';

@Component({
  selector: 'app-edit-owner',
  templateUrl: './edit-owner.component.html',
  styleUrl: './edit-owner.component.css'
})
export class EditOwnerComponent {
  editForm: FormGroup;
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private ownerService:  OwnerService
  ) {
    this.editForm = this.fb.group({
      userId: ['', Validators.required],
      name: ['', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadOwner();
  }

  loadOwner(): void {
    this.ownerService.getOwner(this.id).subscribe(data => {
      console.log('load edit form',data);
      this.editForm.patchValue(data);
      this.editForm.patchValue({
        userId: data.userId,
        name: data.name,
        contact: data.contact,
        address: data.address
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
      this.ownerService.updateOwner(this.id, this.editForm.value).subscribe(() => {
        this.router.navigate(['/owners']);
      });
    }
  }
}
