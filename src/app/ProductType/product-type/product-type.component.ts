import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductType } from '../../models/product-type';
import { ProductCategory } from '../../models/product-category';
import { ProductTypeService } from '../../services/product-type.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CapitalizeDirective } from '../../Cap/capitalize.directive';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit{
  productTypes: ProductType[] = [];
  dataSource = new MatTableDataSource<ProductType>([]);
  displayedColumns: string[] = ['name', 'description','actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private productTypeService: ProductTypeService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //this.loadProductCategoriesWithTypes(); 
    this.loadProductTypes(); 
  }

  // ngAfterViewInit() {
  //   this.tableDataSource.paginator = this.paginator;
  // }

  hasChild = (_: number, node: ProductCategory) => !!node.productTypes && node.productTypes.length > 0;

  // // Load product categories and their associated types
  // loadProductCategoriesWithTypes(): void {
  //   this.productTypeService.getProductCategoriesWithTypes().subscribe(
  //     (data: ProductCategory[]) => {
  //       this.categoriesWithTypes = data;
  //       this.treeDataSource.data = this.categoriesWithTypes; 
  //       console.log('Categories with types fetched successfully', data);
  //     },
  //     error => {
  //       console.error('Error fetching categories with types', error);
  //       this.snackBar.open('Failed to load categories with types', 'Close', {
  //         duration: 3000,
  //         verticalPosition: 'top',
  //         horizontalPosition: 'center',
  //         panelClass: ['error-snackbar']
  //       });
  //     }
  //   );
  // }

  loadProductTypes(): void {
    this.productTypeService.getProdutTypes().subscribe(
      (data: ProductType[]) => {
        this.productTypes = data;
        this.dataSource.data = data; 
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
      },
      error => {
        this.snackBar.open('Failed to load product types', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['error-snackbar']
        });
      }
    );
  }

  // getCategoryName(categoryId: number): string | undefined {
  //   const category = this.productCategories.find(c => c.productCategoryId === categoryId);
  //   return category ? category.productCategoryName : undefined; 
  // }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.dataSource.filter = filterValue; 
  }

  editProductType(id: number): void {
    this.router.navigate(['admin/edit-product-type', id]);
  }

  // deleteProductType(id: number): void {
  //   const snackBarRef = this.snackBar.open('Are you sure you want to delete this product type?', 'Confirm', {
  //     duration: 5000, verticalPosition: 'top' , horizontalPosition: 'center' // Optional: Automatically close after 5 seconds
  //   });

  //   // Wait for the user to click the 'Confirm' button on the snackbar
  //   snackBarRef.onAction().subscribe(() => {
  //     this.productTypeService.deleteProductType(id,this.authService.getUserProfile() || 'Default manager').subscribe(() => {
  //       this.loadProductTypes();
  //       this.snackBar.open('Product type deleted successfully!', 'Close', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
  //     });
  //   });
  // }


  deleteProductType(id: number): void {
    const snackBarRef = this.snackBar.open('Are you sure you want to delete this product type?', 'Confirm', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  
    // Wait for the user to click the 'Confirm' button on the snackbar
    snackBarRef.onAction().subscribe(() => {
      this.productTypeService.deleteProductType(id, this.authService.getUserProfile() || 'Default manager')
        .subscribe({
          next: () => {
            // Success case
            this.loadProductTypes();
            this.snackBar.open('Product type deleted successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error: (errorResponse) => {
            // Handle different HTTP errors
            if (errorResponse.status === 404) {
              this.snackBar.open('Product type not found.', 'Close', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            } else if (errorResponse.status === 409) {
              this.snackBar.open(errorResponse.error.message || 'Conflict: Product type is assigned to one or more products.', 'Close', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            } else {
              this.snackBar.open('An error occurred while deleting the product type. Please try again later.', 'Close', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            }
          }
        });
    });
  }
  

}
