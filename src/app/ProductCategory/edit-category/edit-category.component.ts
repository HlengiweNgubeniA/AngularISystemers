import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from '../../models/product-category';
import { ProductCategoryService } from '../../services/product-category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent {
  editForm: FormGroup;
  productCategoryId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productCategoryService:  ProductCategoryService
  ) {
    this.editForm = this.fb.group({
      productCategoryName: ['', Validators.required],
      productCategoryDescription: [''],
    });
  }

  ngOnInit(): void {
    this.productCategoryId = this.route.snapshot.params['id'];
    this.loadCatalogue();
  }

  loadCatalogue(): void {
    this.productCategoryService.getCategory(this.productCategoryId).subscribe(data => {
      console.log('load edit form',data);
      this.editForm.patchValue(data);
      this.editForm.patchValue({
        productCategoryName: data.productCategoryName,
        productCategoryDescription: data.productCategoryDescription
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
      this.productCategoryService.updateCategory(this.productCategoryId, this.editForm.value).subscribe(() => {
        this.router.navigate(['/product-categories']);
      });
    }
  }
}
