import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Owner } from '../../models/owner';
import { OwnerService } from '../../services/owner.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrl: './owner.component.css'
})
export class OwnerComponent implements OnInit, AfterViewInit {
  owners: Owner[] = [];
  dataSource = new MatTableDataSource<Owner>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private ownerService: OwnerService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadOwners();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadOwners(): void {
    this.ownerService.getOwners().subscribe(
      data => {
        this.owners = data;
        this.dataSource.data = data; // Populate dataSource
        console.log('Owners fetched successfully', data);
      },
      error => {
        console.error('Error fetching owners', error);
        this.snackBar.open('Failed to load owners', 'Close', {
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

  editOwner(id: number): void {
    this.router.navigate(['/edit-owner', id]);
  }

  deleteOwner(id: number): void {
    if (confirm('Are you sure you want to delete this owner?')) {
      this.ownerService.deleteOwner(id).subscribe(() => {
        this.loadOwners();
      });
    }
  }
}
