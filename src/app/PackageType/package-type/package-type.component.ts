import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PackageType } from '../../models/package-type';
import { PackageTypeService } from '../../services/package-type.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-package-type',
  templateUrl: './package-type.component.html',
  styleUrl: './package-type.component.css'
})
export class PackageTypeComponent implements OnInit, AfterViewInit  {
  packageTypes: PackageType[] = [];
  dataSource = new MatTableDataSource<PackageType>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private packageTypeService: PackageTypeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPackageTypes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadPackageTypes(): void {
    this.packageTypeService.getPackageTypes().subscribe(
      data => {
        this.packageTypes = data;
        this.dataSource.data = data; // Populate dataSource
        console.log('Package Types fetched successfully', data);
      },
      error => {
        console.error('Error fetching package types', error);
        this.snackBar.open('Failed to load package types', 'Close', {
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

  editPackageType(packageTypeId: number): void {
    this.router.navigate(['/edit-package-type', packageTypeId]);
  }

  deletePackageType(packageTypeId: number): void {
    if (confirm('Are you sure you want to delete this package type?')) {
      this.packageTypeService.deletePackageType(packageTypeId).subscribe(() => {
        this.loadPackageTypes();
      });
    }
  }
}
