import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../Cart/basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateReviewComponent } from '../../Review/create-review/create-review.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { MatTableDataSource } from '@angular/material/table';
import { ProductCategory } from '../../models/product-category';
import { ProductType } from '../../models/product-type';
import { Size } from '../../models/productSize';
import { ProductPrice } from '../../models/product-price';
import { Router } from '@angular/router';




//------------for tree fitering-----------//

import { TreeFilterService } from '../../TreeService/tree-filter.service';



///////////////////////////////////////////



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  
  products: Product[] = [];
  productCategories: ProductCategory[] = [];
  productTypes: ProductType[] = [];
  productPrices: ProductPrice[] = [];
  productSizes: Size[] = [];
  dataSource = new MatTableDataSource<Product>([]);

filteredProducts: Product[] = [];



selectedTypeId?: number;
selectedCategoryId?: number;
priceRange = { min: 0, max: 1000 }; // Default price range
selectedSizeId?: number;


  categories: ProductCategory[] = [];       // List of categories
  sizes: Size[] = []; 



basketItemCount = 0;

  constructor(private filterService: TreeFilterService,private productService: ProductService,private dialog: MatDialog,private basketService: BasketService, private snackBar: MatSnackBar, private router: Router) {}
 
  // Add product to basket
  addProductToBasket(product: any) {
    this.basketService.addToBasket(product);
    this.snackBar.open(`${product.name} added to basket!`, 'Close', {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

ngOnInit(): void {
  this.onFilterChange();

  this.productService.getProductCategories().subscribe(data => {
    this.productCategories = data;
  });

  this.productService.getProductTypes().subscribe(data => {
    this.productTypes = data;
  });

  this.productService.getProductPrices().subscribe(data => {
    this.productPrices = data;
  });

  this.productService.getProductSizes().subscribe(data => {
    this.productSizes = data;
  });

this.loadProducts();

  this.basketService.basketCount$.subscribe(count => {
    this.basketItemCount = count;
  })
  

}














loadProduct(){
  this.productService.getProducts().subscribe(
    (data) => {
      this.products = data;
      this.filteredProducts = [...this.products];

    }
  )
  
}






onFilterChange(){
  this.filteredProducts = this.products.filter(product => {
    const matchesType = this.selectedTypeId ? product.productTypeId === this.selectedTypeId : true;
    const matchesCategory = this.selectedCategoryId ? product.productCategoryId === this.selectedCategoryId : true;
    const matchesPrice = (this.priceRange.min !== null && this.priceRange.max !== null) ? 
      (product.price >= this.priceRange.min && product.price <= this.priceRange.max) : true;
    const matchesSize = this.selectedSizeId ? product.sizeId === this.selectedSizeId : true;

    return matchesType && matchesCategory && matchesPrice && matchesSize;
  });

  this.dataSource.data = this.filteredProducts; // Update the MatTableDataSource
  console.log('Filtered Products:', this.filteredProducts);


}



//_____________Thuso_________//
openReviewDialog(product: any){
  const dialogRef = this.dialog.open(CreateReviewComponent,{
    data: product,
  });


  dialogRef.afterClosed().subscribe(() => {

  })
}


loadProducts(): void {
  this.productService.getProducts().subscribe(
    data => {
      //console.log('Products fetched successfully', data);
      this.products = data;
      this.filteredProducts = [...this.products]
      this.dataSource.data = this.filteredProducts
      //this.dataSource.data = data; // Populate dataSource
      //console.log('Products fetched successfully', data);
    },
    error => {
     // console.error('Error fetching products', error);
      this.snackBar.open('Failed to load products', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['error-snackbar']
      });
    }
  );  
}



applyFilter(event: Event): void {
  const input = event.target as HTMLInputElement;
  const filterValue = input.value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
}


navigateToReviews(productId: number): void {
  this.router.navigate(['/reviews',productId]);
  console.log('Review productId', productId)
}

 


}
