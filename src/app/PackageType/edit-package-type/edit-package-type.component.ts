import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageType } from '../../models/package-type';
import { PackageTypeService } from '../../services/package-type.service';

@Component({
  selector: 'app-edit-package-type',
  templateUrl: './edit-package-type.component.html',
  styleUrl: './edit-package-type.component.css'
})
export class EditPackageTypeComponent {
  editForm: FormGroup;
  packageTypeId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private packageTypeService:  PackageTypeService
  ) {
    this.editForm = this.fb.group({
      packageTypeName: ['', Validators.required],
      packageTypeDescription: [''],
    });
  }

  ngOnInit(): void {
    this.packageTypeId = this.route.snapshot.params['id'];
    this.loadPackageType();
  }

  loadPackageType(): void {
    this.packageTypeService.getPackagType(this.packageTypeId).subscribe(data => {
      console.log('load edit form',data);
      this.editForm.patchValue(data);
      this.editForm.patchValue({
        packageTypeName: data.packageTypeName,
        packageTypeDescription: data.packageTypeDescription,
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
      this.packageTypeService.updatePackageType(this.packageTypeId, this.editForm.value).subscribe(() => {
        this.router.navigate(['/package-types']);
      });
    }
  }
}
