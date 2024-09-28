import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SpecialOccasionCatalogue } from '../../models/special-occasion-catalogue';
import { SpecialOccasionCatalogueService } from '../../services/special-occasion-catalogue.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OccasionType } from '../../models/occasion-type';
import { Discount } from '../../models/discount';

@Component({
  selector: 'app-special-occasion-catalogue',
  templateUrl: './special-occasion-catalogue.component.html',
  styleUrls: ['./special-occasion-catalogue.component.css'] // Ensure it's 'styleUrls' not 'styleUrl'
})
export class SpecialOccasionCatalogueComponent implements OnInit, AfterViewInit {
  catalogues: SpecialOccasionCatalogue[] = [];
  dataSource = new MatTableDataSource<SpecialOccasionCatalogue>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private catalogueService: SpecialOccasionCatalogueService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCatalogues();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadCatalogues(): void {
    this.catalogueService.getCatalogues().subscribe(
      data => {
        this.catalogues = data;
        this.dataSource.data = data; // Populate dataSource
        console.log('Catalogues fetched successfully', data);
      },
      error => {
        console.error('Error fetching catalogues', error);
        this.snackBar.open('Failed to load catalogues', 'Close', {
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

  editCatalogue(catalogueId: number): void {
    this.router.navigate(['/edit-catalogue', catalogueId]);
  }

  deleteCatalogue(catalogueId: number): void {
    if (confirm('Are you sure you want to delete this catalogue?')) {
      this.catalogueService.deleteCatalogue(catalogueId).subscribe(() => {
        this.loadCatalogues();
      });
    }
  }
}
