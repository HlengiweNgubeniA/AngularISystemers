import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductCategory } from '../../models/product-category';
import { ProductCategoryService } from '../../services/product-category.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit, AfterViewInit {
  categories: ProductCategory[] = [];
  dataSource = new MatTableDataSource<ProductCategory>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productCategoryService: ProductCategoryService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadCategories(): void {
    this.productCategoryService.getCategories().subscribe(
      data => {
        this.categories = data;
        this.dataSource.data = data; // Populate dataSource
        console.log('Categories fetched successfully', data);
      },
      error => {
        console.error('Error fetching categories', error);
        this.snackBar.open('Failed to load categories', 'Close', {
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

  editCategory(productCategoryId: number): void {
    this.router.navigate(['/edit-product-category', productCategoryId]);
  }

  deleteCategory(productCategoryId: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.productCategoryService.deleteCategory(productCategoryId).subscribe(() => {
        this.loadCategories();
      });
    }
  }
}
