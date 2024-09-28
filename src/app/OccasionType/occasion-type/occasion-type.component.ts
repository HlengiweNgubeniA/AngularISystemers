import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { OccasionType } from '../../models/occasion-type';
import { OccasionTypeService } from '../../services/occasion-type.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-occasion-type',
  templateUrl: './occasion-type.component.html',
  styleUrl: './occasion-type.component.css'
})  
export class OccasionTypeComponent implements OnInit, AfterViewInit{
  occasionTypes: OccasionType[] = [];
  dataSource = new MatTableDataSource<OccasionType>([]);
  
  displayedColumns: string[] = ['name', 'description', 'actions'];



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private occasionTypeService: OccasionTypeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadOccasionTypes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadOccasionTypes(): void {
    this.occasionTypeService.getOccasionTypes().subscribe(
      data => {
        this.occasionTypes = data;
        this.dataSource.data = data; 
        this.dataSource.sort = this.sort
       // console.log('Occasion types fetched successfully', data);
      },
      error => {
        console.error('Failed to fetch occasion types.', error);
        this.snackBar.open('Failed to load occasion types', 'Close', {
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

  editOccasionType(occasionTypeId: number): void {
    this.router.navigate(['admin/edit-occasion-type', occasionTypeId]);
  }

  deleteOccasionType(occasionTypeId: number): void {
    if (confirm('Are you sure you want to delete this Occasion Type?')) {
      this.occasionTypeService.deleteOccasionType(occasionTypeId).subscribe(() => {
        this.loadOccasionTypes();
      });
    }
  }
}
