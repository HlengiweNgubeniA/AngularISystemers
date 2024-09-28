import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Discount } from '../../models/discount';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DiscountService } from '../../services/discount.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { ApplyDiscountComponent } from '../apply-discount/apply-discount.component';
import { MatDialog } from '@angular/material/dialog';
  
@Component({
  selector: 'app-active-discounts',
  templateUrl: './active-discounts.component.html',
  styleUrl: './active-discounts.component.css'
})
export class ActiveDiscountsComponent implements OnInit {
  discounts: Discount[] = [];
  
 products: Product[] = [];

  displayedColumns: string[] = [ 'name', 'description', 'startDate', 'endDate','percentage','status', 'action'];
  dataSource = new MatTableDataSource<Discount>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

constructor(private snackBar: MatSnackBar,
  private discountService: DiscountService,
  private router: Router,
  private dialog: MatDialog
){}

ngOnInit(): void {

  this.dataSource.filterPredicate = (discount: Discount, filter: string) => {
    const filterValue = filter.trim().toLowerCase();
    return discount.disName.toLowerCase().includes(filterValue);
  }

  this.loadDiscountss();
}

ngAfterviewInit(){
  this.dataSource.paginator = this.paginator;
}


applyFilter(event: Event): void {
  // this.dataSource.filter = filterValue.trim().toLowerCase();
  const input = event.target as HTMLInputElement;
  const filterValue = input.value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
} 


checkDiscountStatus(discounts: any) {
  discounts.forEach((discount: any) => {
    const discountStartDate = discount.startDate;
    const discountEndDate = discount.endDate;
    console.log(`Checking discount: ${discount.discountId}, Start: ${discountStartDate}, End: ${discountEndDate}`);

// Check if the discount is active
if (this.isDiscountActive(discountStartDate, discountEndDate)) {
  discount['status'] = 'Active'; // Add status to the discount object
} else {
  discount['status'] = 'Inactive'; // Add status to the discount object
}


  })
  // this.dataSource.data.forEach(discount => {
  //   // Convert string dates to Date objects
  //   // const discountStartDate = new Date(discount.startDate);
  //   // const discountEndDate = new Date(discount.endDate);
  //   // console.log(`Checking discount: ${discount.discountId}, Start: ${discountStartDate}, End: ${discountEndDate}`);
  //   // // Check if the discount is active
  //   // if (this.isDiscountActive(discountStartDate, discountEndDate)) {
  //   //   discount['status'] = 'Active'; // Add status to the discount object
  //   // } else {
  //   //   discount['status'] = 'Inactive'; // Add status to the discount object
  //   // }
  // });
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
    const processedDiscounts = discounts.map(discount => ({
     ...discount,
     startDate: new Date(discount.disStartDate), // Ensure Date object
      endDate: new Date(discount.disEndDate),     // Ensure Date object
    }));
   



    this.checkDiscountStatus(processedDiscounts); // Check status after loading discounts
  
 // Filter active discounts
 this.dataSource.data = processedDiscounts.filter(discount => discount.status === 'Active');
  
  });
}



 applyDiscount(productIds: number[], discountId: number): void {
   const discount = this.discounts.find(d => d.discountId === discountId);

   if (discount) {
     productIds.forEach(productId => {
       const product = this.products.find(p => p.id === productId);
      
     if (product) {
         product.discountId = discount.discountId;
         product.price -= (product.price * (discount.discountPercentage / 100));
         console.log(`Applied discount ${discount.discountPercentage}% to ${product.name}. New price: ${product.price}`);
       } else {
         console.error(`Product with ID ${productId} not found`);
       }
     });
   } else {
     console.error('Discount not found');
   }
}



openApplyDiscountModal(productId: number, discount: Discount): void {
  const dialogRef = this.dialog.open(ApplyDiscountComponent, {
    width: '400px',
    data: { productId, discount }
  });

  dialogRef.afterClosed().subscribe(result => {
     if (result) {
       this.applyDiscount(result.productId, result.discountId);
     }
   });
}


}
