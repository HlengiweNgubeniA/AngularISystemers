import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PackageTypeService } from '../../services/package-type.service';
import { PackageType } from '../../models/package-type';


@Component({
  selector: 'app-create-package-type',
  templateUrl: './create-package-type.component.html',
  styleUrl: './create-package-type.component.css'
})
export class CreatePackageTypeComponent { 
  packageTypeForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private packageTypeService: PackageTypeService
  ) {
    this.packageTypeForm = this.fb.group({
      //packageTypeId: ['', Validators.required],
      packageTypeName: ['', Validators.required],
      packageTypeDescription: ['', Validators.required],
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
        this.packageTypeForm.patchValue({ catImage: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.packageTypeForm.patchValue({ catImage: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit(): void {
    if (this.packageTypeForm.valid) {
      const newPackageType: PackageType = this.packageTypeForm.value;
      console.log('New package type', newPackageType);
      this.packageTypeService.createPackageType(newPackageType).subscribe({
        next:(value) => {
          console.log('Package type created successfully', value);
        },
        complete:() => {
        this.router.navigate(['/package-types']);
        },
        error:(err) => {
          console.error('Error creating package type', err);
        },
      }
       
      );
    }
  } 
}
