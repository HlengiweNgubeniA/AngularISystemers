import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Discount } from '../../models/discount';
import { OccasionType } from '../../models/occasion-type';
import { SpecialOccasionCatalogue } from '../../models/special-occasion-catalogue';
import { SpecialOccasionCatalogueService } from '../../services/special-occasion-catalogue.service';

@Component({
  selector: 'app-edit-catalogue',
  templateUrl: './edit-catalogue.component.html',
  styleUrl: './edit-catalogue.component.css'
})
export class EditCatalogueComponent {
  catImage: string | ArrayBuffer | null = null;
  editForm: FormGroup;
  occasionTypes: OccasionType[] = [];
  discounts: Discount[] = [];
  catalogueId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private catalogueService:  SpecialOccasionCatalogueService
  ) {
    this.editForm = this.fb.group({
      catTitle: ['', Validators.required],
      catDescription: [''],
      includedItems: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      occasionTypeId: ['', Validators.required],
      discountId: ['', Validators.required],
      catImage: ['']
    });
  }

  ngOnInit(): void {
    this.catalogueId = this.route.snapshot.params['id'];
    this.loadCatalogue();
    this.loadOccasionTypes();
    this.loadDiscounts();
  }

  loadCatalogue(): void {
    this.catalogueService.getCatalogue(this.catalogueId).subscribe(data => {
      console.log('load edit form',data);
      this.editForm.patchValue(data);
      this.editForm.patchValue({
        startDate: new Date(data.discountStartDate),
        endDate: new Date(data.discountEndDate),
        occasionTypeId: data.occasionTypeId,
        discountId: data.discountId,
        catImage: data.catImage,
        catTitle: data.catTitle,
        catDescription: data.catDescription,
        includedItems: data.includedItems
      })
    });
  }

  loadOccasionTypes(): void {
    this.catalogueService.getOccasionTypes().subscribe(data => {
      this.occasionTypes = data;
    });
  }

  loadDiscounts(): void {
    this.catalogueService.getDiscounts().subscribe(data => {
      this.discounts = data;
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
      this.catalogueService.updateCatalogue(this.catalogueId, this.editForm.value).subscribe(() => {
        this.router.navigate(['/special-occasion-catalogues']);
      });
    }
  }
}
