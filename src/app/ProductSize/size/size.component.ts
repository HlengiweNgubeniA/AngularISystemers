import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Size } from '../../models/productSize';
import { SizeService } from '../../services/size.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrl: './size.component.css'
})
export class SizeComponent implements OnInit, AfterViewInit {
  sizes: Size[] = [];
  dataSource = new MatTableDataSource<Size>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private sizeService: SizeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadSizes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadSizes(): void {
    this.sizeService.getSizes().subscribe(
      data => {
        this.sizes = data;
        this.dataSource.data = data; // Populate dataSource
        console.log('Sizes fetched successfully', data);
      },
      error => {
        console.error('Error fetching sizes', error);
        this.snackBar.open('Failed to load sizes', 'Close', {
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

  editSize(id: number): void {
    this.router.navigate(['/edit-size', id]);
  }

  deleteSize(id: number): void {
    if (confirm('Are you sure you want to delete this size?')) {
      this.sizeService.deleteSize(id).subscribe(() => {
        this.loadSizes();
      });
    }
  }
}
