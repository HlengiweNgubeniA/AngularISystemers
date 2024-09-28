import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Inventory } from '../../models/inventory';
import { InventoryService } from '../../services/inventory.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-inventory',
  standalone: false,
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit, AfterViewInit {
  inventories: Inventory[] = [];
  dataSource = new MatTableDataSource<Inventory>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private inventoryService: InventoryService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadInventories();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadInventories(): void {
    this.inventoryService.getInventories().subscribe(
      data => {
        this.inventories = data;
        this.dataSource.data = data; // Populate dataSource
        console.log('Inventories fetched successfully', data);
      },
      error => {
        console.error('Error fetching inventories', error);
        this.snackBar.open('Failed to load inventories', 'Close', {
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

  editInventory(inventoryId: number): void {
    this.router.navigate(['/edit-inventory', inventoryId]);
  }

  deleteInventory(inventoryId: number): void {
    if (confirm('Are you sure you want to delete this inventory?')) {
      this.inventoryService.deleteInventory(inventoryId).subscribe(() => {
        this.loadInventories();
      });
    }
  }
}
