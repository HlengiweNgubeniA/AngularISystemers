import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Status } from '../../models/status';
import { StatusService } from '../../services/status.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent implements OnInit, AfterViewInit {
  statuses: Status[] = [];
  dataSource = new MatTableDataSource<Status>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private statusService: StatusService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadStatuses();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadStatuses(): void {
    this.statusService.getStatuses().subscribe(
      data => {
        this.statuses = data;
        this.dataSource.data = data; // Populate dataSource
        console.log('Statuses fetched successfully', data);
      },
      error => {
        console.error('Error fetching statuses', error);
        this.snackBar.open('Failed to load statuses', 'Close', {
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

  editStatus(statusId: number): void {
    this.router.navigate(['/edit-status', statusId]);
  }

  deleteStatus(statusId: number): void {
    if (confirm('Are you sure you want to delete this status?')) {
      this.statusService.deleteStatus(statusId).subscribe(() => {
        this.loadStatuses();
      });
    }
  }
}
