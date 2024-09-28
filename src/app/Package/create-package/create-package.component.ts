import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PackageService } from '../../services/package.service';
import { PackageType } from '../../models/package-type';
import { SpecialOccasionCatalogue } from '../../models/special-occasion-catalogue';
import { Package } from '../../models/package';

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrl: './create-package.component.css'
})
export class CreatePackageComponent {
  packageForm: FormGroup;
  packageTypes: PackageType[] = [];
  catalogues: SpecialOccasionCatalogue[] = [];
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private packageService: PackageService
  ) {
    this.packageForm = this.fb.group({
      packageTypeId: ['', Validators.required],
      catalogueId: ['', Validators.required],
      packageName: ['', Validators.required],
      packageDescription: ['', Validators.required],
      packagePrice: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.packageService.getPackageTypes().subscribe(data => {
      this.packageTypes= data;
    });

    this.packageService.getCatalogues().subscribe(data => {
      this.catalogues = data;
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.packageForm.patchValue({ catImage: this.selectedImage });
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
        this.packageForm.patchValue({ catImage: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit(): void {
    if (this.packageForm.valid) {
      const newPackage: Package = this.packageForm.value;
      console.log('New package', newPackage);
      this.packageService.createPackage(newPackage).subscribe({
        next:(value) => {
          console.log('Package created successfully', value);
        },
        complete:() => {
        this.router.navigate(['/packages']);
        },
        error:(err) => {
          console.error('Error creating package', err);
        },
      }
       
      );
    }
  } 
}
