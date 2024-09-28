import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductCategory } from '../../models/product-category';
import { ProductType } from '../../models/product-type';
import { ProductPrice } from '../../models/product-price';
import { Size } from '../../models/productSize';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, AfterViewInit {
  products: Product[] = [];
  productCategories: ProductCategory[] = [];
  productTypes: ProductType[] = [];
  productPrices: ProductPrice[] = [];
  productSizes: Size[] = [];
  dataSource = new MatTableDataSource<Product>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authservice: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadProducts();

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
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data;
        this.dataSource.data = data; // Populate dataSource
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

  editProduct(productId: number): void {
    this.router.navigate(['admin/edit-product', productId]);
  }

  user = this.authservice.getUserProfile() || 'Default manager';

  deleteProduct(productId: number): void {
    const snackBarRef = this.snackBar.open('Are you sure you want to delete this product?', 'Yes', {
      duration: 5000, // Show for 5 seconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

    // Handle "Yes" action
    snackBarRef.onAction().subscribe(() => {
      this.productService.deleteProduct(productId, this.user).subscribe(() => {
        this.loadProducts();
        this.openSuccessSnackbar();
      });
    });

    // Optionally, you can close the snackbar when "No" is clicked
    snackBarRef.afterDismissed().subscribe(() => {
      // You can handle any logic after the snackbar is dismissed
    });
    
    // Set a timeout to automatically dismiss the snackbar after 5 seconds
    setTimeout(() => {
      snackBarRef.dismiss(); // Automatically dismiss snackbar after 5 seconds
    }, 5000);
  }

  private openSuccessSnackbar(): void {
    this.snackBar.open('Product deleted successfully!', 'Close', {
      duration: 3000, // Show for 3 seconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  
}
