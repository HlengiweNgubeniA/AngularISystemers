import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Discount } from '../../models/discount';
import { DiscountService } from '../../services/discount.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


//npm install material-design-icons



@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.css'
})
export class DiscountComponent implements OnInit, AfterViewInit { 
  discounts: Discount[] = [];
  displayedColumns: string[] = ['disName', 'disDescription', 'startDate', 'endDate', 'discountPercentage','status' ,'actions'];
  dataSource = new MatTableDataSource<Discount>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private discountService: DiscountService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadDiscounts();
    //this.getStatus();
    this.loadDiscountss();
    
  }

  ldD(){
    this.discountService.loadDiscounts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDiscounts(): void {
    this.discountService.getDiscounts().subscribe(
      data => {
        this.discounts = data;
        this.dataSource.data = data; // Populate dataSource
        console.log('Discounts fetched successfully', data);
      },
      error => {
        console.error('Error fetching discounts', error);
        this.snackBar.open('Failed to load discounts', 'Close', {
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

  editDiscount(discountId: number): void {
    this.router.navigate(['admin/edit-discount', discountId]);
  }

  deleteDiscount(discountId: number): void {
    if (confirm('Are you sure you want to delete this discount?')) {
      this.discountService.deleteDiscount(discountId).subscribe(() => {
        this.loadDiscounts();
      });
    }
  }

// getStatus(){
//   this.discountService.checkDiscountStatus();
// }

   checkDiscountStatus() {
     this.dataSource.data.forEach(discount => {
       // Convert string dates to Date objects
       const discountStartDate = new Date(discount.startDate);
       const discountEndDate = new Date(discount.endDate);
       console.log(`Checking discount: ${discount.discountId}, Start: ${discountStartDate}, End: ${discountEndDate}`);
       // Check if the discount is active
       if (this.isDiscountActive(discountStartDate, discountEndDate)) {
         discount['status'] = 'Active'; // Add status to the discount object
       } else {
         discount['status'] = 'Inactive'; // Add status to the discount object
       }
     });
   }
  
   isDiscountActive(startDate: Date, endDate: Date): boolean {
     const currentDate = new Date();
     currentDate.setHours(0, 0, 0, 0); // Reset time to midnight
     startDate.setHours(0, 0, 0, 0);   // Reset time to midnight
     endDate.setHours(0, 0, 0, 0);     // Reset time to midnight
    
     return currentDate >= startDate && currentDate <= endDate;
   }
  
    loadDiscountss() {
     this.discountService.getDiscounts().subscribe(discounts => {
     // console.log('Loaded Discounts:', discounts); 
      
      // Map and convert the discount dates to Date objects
       this.dataSource.data = discounts.map(discount => ({
        ...discount,
        startDate: new Date(discount.disStartDate), // Ensure Date object
         endDate: new Date(discount.disEndDate),     // Ensure Date object
       }));
      
       this.checkDiscountStatus(); // Check status after loading discounts
     });
   }
  
  
  
  


}
