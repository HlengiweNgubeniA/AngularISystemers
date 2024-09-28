import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageType } from '../../models/package-type';
import { SpecialOccasionCatalogue } from '../../models/special-occasion-catalogue';
import { Package } from '../../models/package';
import { PackageService } from '../../services/package.service';

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrl: './edit-package.component.css'
})
export class EditPackageComponent {
  editForm: FormGroup;
  packageTypes: PackageType[] = [];
  catalogues: SpecialOccasionCatalogue[] = [];
  packageId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private packageService:  PackageService
  ) {
    this.editForm = this.fb.group({
      packageTypeId: ['', Validators.required],
      catalogueId: ['', Validators.required],
      packageName: ['', Validators.required],
      packageDescription: ['', Validators.required],
      packagePrice: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.packageId = this.route.snapshot.params['id'];
    this.loadPackage();
    this.loadPackageTypes();
    this.loadCatalogues();
  }

  loadPackage(): void {
    this.packageService.getPackage(this.packageId).subscribe(data => {
      console.log('load edit form',data);
      this.editForm.patchValue(data);
      this.editForm.patchValue({
        packageTypeId: data.packageTypeId,
        catalogueId: data.catalogueId,
        packageName: data.packageName,
        packageDescription: data.packageDescription,
        packagePrice: data.packagePrice
      })
    });
  }

  loadPackageTypes(): void {
    this.packageService.getPackageTypes().subscribe(data => {
      this.packageTypes = data;
    });
  }

  loadCatalogues(): void {
    this.packageService.getCatalogues().subscribe(data => {
      this.catalogues = data;
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
      this.packageService.updatePackage(this.packageId, this.editForm.value).subscribe(() => {
        this.router.navigate(['/packages']);
      });
    }
  }
}
