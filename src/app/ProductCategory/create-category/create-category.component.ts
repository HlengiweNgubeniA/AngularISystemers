import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductCategoryService } from '../../services/product-category.service';
import { ProductCategory } from '../../models/product-category';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {
  categoryForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productCategoryService: ProductCategoryService
  ) {
    this.categoryForm = this.fb.group({
      productCategoryName: ['', Validators.required],
      productCategoryDescription: ['', Validators.required]
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
        this.categoryForm.patchValue({ catImage: this.selectedImage });
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
        this.categoryForm.patchValue({ catImage: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit(): void {
    if (this.categoryForm.valid) {
      const newCategory: ProductCategory = this.categoryForm.value;
      console.log('New category', newCategory);
      this.productCategoryService.createCategory(newCategory).subscribe({
        next:(value) => {
          console.log('Category created successfully', value);
        },
        complete:() => {
        this.router.navigate(['/product-categories']);
        },
        error:(err) => {
          console.error('Error creating category', err);
        },
      }
       
      );
    }
  } 
}
