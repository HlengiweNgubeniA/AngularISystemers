import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SpecialOccasionCatalogue } from '../../models/special-occasion-catalogue';
import { SpecialOccasionCatalogueService } from '../../services/special-occasion-catalogue.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductPrice } from '../../models/product-price';
import { ProductPriceService } from '../../services/product-price.service';

@Component({
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  styleUrl: './product-price.component.css'
})
export class ProductPriceComponent implements OnInit, AfterViewInit {
  prices: ProductPrice[] = [];
  dataSource = new MatTableDataSource<ProductPrice>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productPriceService: ProductPriceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPrices();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadPrices(): void {
    this.productPriceService.getProductPrices().subscribe(
      data => {
        this.prices = data;
        this.dataSource.data = data; // Populate dataSource
        console.log('Prices fetched successfully', data);
      },
      error => {
        console.error('Error fetching prices', error);
        this.snackBar.open('Failed to load prices', 'Close', {
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

  editProductPrice(productPriceId: number): void {
    this.router.navigate(['/edit-product-price', productPriceId]);
  }

  deleteProductPrice(productPriceId: number): void {
    if (confirm('Are you sure you want to delete this price?')) {
      this.productPriceService.deleteProductPrice(productPriceId).subscribe(() => {
        this.loadPrices();
      });
    }
  }
}
