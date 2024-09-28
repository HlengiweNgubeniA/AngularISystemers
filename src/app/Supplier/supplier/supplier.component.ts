import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Supplier } from '../../models/supplier';
import { SupplierService } from '../../services/supplier.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditSupplierComponent } from '../edit-supplier/edit-supplier.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit, AfterViewInit {
  suppliers: Supplier[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'contact', 'address', 'contact-person', 'actions'];
  dataSource = new MatTableDataSource<Supplier>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe(
      (data: Supplier[]) => {
        this.dataSource.data = data; // Bind data to dataSource
      },
      (error) => {
        this.snackbar.open('Failed to load suppliers', 'Close', {
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

  deleteSupplier(id: number): void {
    this.supplierService.deleteSupplier(id).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter(supplier => supplier.supplierId !== id);
        this.snackbar.open('Supplier deleted', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      },
      (error) => {
        this.snackbar.open('Could not delete supplier', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    );
  }

  openEditDialog(supplier: Supplier): void {
    const dialogRef = this.dialog.open(EditSupplierComponent, {
      width: '500px',
      data: { ...supplier }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSuppliers(); // Refresh the supplier list after update
      }
    });
  }
}



