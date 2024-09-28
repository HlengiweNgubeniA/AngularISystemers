import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Package } from '../../models/package';
import { PackageService } from '../../services/package.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrl: './package.component.css'
})
export class PackageComponent implements OnInit, AfterViewInit {
  packages: Package[] = [];
  dataSource = new MatTableDataSource<Package>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private packageService: PackageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadPackages(): void {
    this.packageService.getPackages().subscribe(
      data => {
        this.packages = data;
        this.dataSource.data = data; // Populate dataSource
        console.log('Packages fetched successfully', data);
      },
      error => {
        console.error('Error fetching packages', error);
        this.snackBar.open('Failed to load packages', 'Close', {
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

  editPackage(packageId: number): void {
    this.router.navigate(['/edit-package', packageId]);
  }

  deletePackage(packageId: number): void {
    if (confirm('Are you sure you want to delete this package?')) {
      this.packageService.deletePackage(packageId).subscribe(() => {
        this.loadPackages();
      });
    }
  }
}
