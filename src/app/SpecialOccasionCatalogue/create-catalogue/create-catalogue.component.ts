import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpecialOccasionCatalogueService } from '../../services/special-occasion-catalogue.service';
import { Discount } from '../../models/discount';
import { OccasionType } from '../../models/occasion-type';
import { SpecialOccasionCatalogue } from '../../models/special-occasion-catalogue';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { DiscountService } from '../../services/discount.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckbox } from '@angular/material/checkbox';


@Component({
  selector: 'app-create-catalogue',
  templateUrl: './create-catalogue.component.html',
  styleUrl: './create-catalogue.component.css'
})
export class CreateCatalogueComponent {
  catalogueForm: FormGroup;
  occasionTypes: OccasionType[] = [];
  discounts: Discount[] = [];
  selectedImage: string | ArrayBuffer | null = null;
  dateValidationError: string | null = null;
  products: Product[] = [];



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private catalogueService: SpecialOccasionCatalogueService,
    private productService: ProductService,
    private discountService: DiscountService,
    private snackBar: MatSnackBar,
    
  ) {
    this.catalogueForm = this.fb.group({
      occasionTypeId: ['', Validators.required],
      discountId: [null, Validators.required],
      catTitle: ['', Validators.required],
      catDescription: ['', Validators.required],
      includedItems: [[], Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      catImage: ['', Validators.required]
    });
  }

  ngOnInit(): void {
   
   this.getCatlogues();
   this.getDiscounts();
   this.getProducts();

  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.catalogueForm.patchValue({ catImage: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }

  onFileChange(event: any): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      if (file.type.startsWith('image/')) { // Check if the file type is an image
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.catalogueForm.patchValue({
            catImage: reader.result as string
           });
        };
      } else {
        this.snackBar.open('Only image files are allowed','',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        })
        
      }
    }
  }


  onSubmit(): void {
    console.log('Submit button clicked'); // Add this line
    const d = this.catalogueForm.value;
    const catalogData = {
      occasionTypeId: d.occasionTypeId,
      discountId: d.discountId,
      catTitle: d.catTitle,
      catDescription: d.catDescription,
      includedItems: this.selectedProductNames,
      startDate: d.startDate,
      endDate: d.endDate,
      catImage: d.catImage
    }

    if (this.catalogueForm.valid && !this.dateValidationError) {
      const newCatalogue: SpecialOccasionCatalogue = this.catalogueForm.value;
      //console.log('New catalogue', catalogData);
      this.catalogueService.createCatalogue(catalogData).subscribe({
        next:(value) => {
          this.snackBar.open('Catalogue created successfully','',{
           duration:3000,
           verticalPosition: 'top',
           horizontalPosition: 'center'
          })
          
        },
        complete:() => {
          this.snackBar.open('Catalogue created successfully','',{
            duration:3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
           })
        this.router.navigate(['./catalogues']);
        },
        error:(err) => {
          this.snackBar.open('Failed to create catalog.','',{
            duration:3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
           })
        },
      }
       
      );
    }
  }


 

getProducts(){
  this.productService.getProducts().subscribe((data) => {
    this.products = data;
  })
}

getDiscounts(){
  this.catalogueService.getDiscounts().subscribe(data => {
    this.discounts = data;
  });
}

getCatlogues(){
  this.catalogueService.getOccasionTypes().subscribe(data => {
    this.occasionTypes = data;
  });
}
  

get selectedDiscountPercentage(): number | null {
  const selectedId = this.catalogueForm.get('discountId')?.value;
  const selectedDiscount = this.discounts.find(discount => discount.discountId === selectedId);
  //console.log('Catalogue discount Id',selectedDiscount)
  return selectedDiscount ? selectedDiscount.discountPercentage : null;
}


get selectedProducts(): Product[] {
  return this.products.filter(product => this.catalogueForm.value.includedItems.includes(product.id.toString()));
}

get selectedProductNames(): string {
 return this.selectedProducts.map(product => product.name).join(', ')
}

get totalDiscountedPrice(): number {
  return this.selectedProducts.reduce((total, product) => {
    const discount = this.getAppliedDiscount();
    const discountedPrice = discount 
    ? product.price - (product.price * (discount.discountPercentage / 100))
    : product.price;

    return total + discountedPrice;
  }, 0);
}


private getAppliedDiscount(): Discount | null {
  const selectedId = this.catalogueForm.get('discountId')?.value;
  return this.discounts.find(discount => discount.discountId === selectedId) || null
}


}