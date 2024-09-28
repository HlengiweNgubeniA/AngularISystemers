import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { ProductPrice } from '../../models/product-price';
import { ProductPriceService } from '../../services/product-price.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AddPriceComponent } from '../add-price/add-price.component';
import { OrderService } from '../../services/order.service';
import { EditPriceComponent } from '../edit-price/edit-price.component';
import { DeletePriceConfirmationComponent } from '../delete-price-confirmation/delete-price-confirmation.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrl: './price.component.css'
})
export class PriceComponent implements OnInit{
  displayedColumns: string[] = ['id', 'price', 'description', 'actions'];
  dataSource: MatTableDataSource<ProductPrice> = new MatTableDataSource<ProductPrice>([]);


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;



constructor(
  private priceService: ProductPriceService,
  private snackBar: MatSnackBar,
  private dialog: MatDialog,
  private orderService: OrderService,
  private authService: AuthService
){

}



ngOnInit(): void {

this.getPrices();

this.dataSource.sortingDataAccessor = ((item: ProductPrice, property: string) => {
  switch(property){
    case 'id' : return item.productPriceId;
    case 'price' : return item.price;
    case 'desription' : return item.description
    default: return '';
  };
})

}


ngAfterViewInit() {
  // Trigger sorting and pagination after view initialization
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
}



getPrices(){
  this.priceService.getProductPrices().subscribe( data => {
    this.dataSource.data = data;

  })
}



openAddDialog(): void {
  const dialogRef = this.dialog.open(AddPriceComponent, {
    width: '400px'
  });




dialogRef.afterClosed().subscribe(result => {
  if(result) {
   this.getPrices();
  }
})


}

customerId!: number;
getCustomerId(){
  this.orderService.getCustomerId().subscribe((id: number) =>
  {
     this.customerId = id
  }
  )
}


openEditDialog(productPrice: any): void {
  const dialogRef = this.dialog.open(EditPriceComponent, {
  width: '400px',
  data: productPrice
  });



dialogRef.afterClosed().subscribe(result => {
  if(result){
  this.getPrices();
  }
});


}





// openDeleteDialog(priceId: number, productName: string): void {
//   const user = this.authService.getUserProfile() || 'Worked'

//   const dialogRef = this.dialog.open(DeletePriceConfirmationComponent, {
//     data: { productName: productName, manager: user } // Pass the product name
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     if (result) {
//       // User confirmed deletion
//       this.priceService.deleteProductPrice(priceId,user).subscribe({
//         next: () => {
//           this.snackBar.open('Price successfully deleted.', '', {
//             duration: 3000,
//             verticalPosition: 'top',
//             horizontalPosition: 'center'
//           });
//           // Optionally refresh the list of prices here
//         },
//         error: (err) => {
//           console.error('Error deleting product price:', err);
//           this.snackBar.open('Failed to delete product price.', 'Close', {
//             duration: 3000,
//           });
//         }
//       });
//     }
//   });
// }

// openDeleteDialog(priceId: number, productName: string): void {
//   const user = this.authService.getUserProfile() || 'Default Manager'; // Retrieve the current user or a default value
//   console.log('Deleting price with ID:', priceId);
//   console.log('Manager:', user); // Ensure this is defined
  
//   const dialogRef = this.dialog.open(DeletePriceConfirmationComponent, {
//     data: { productName: productName } // Pass the product name to the dialog
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     if (result) {
//       // User confirmed deletion
//       this.priceService.deleteThisProduct(priceId,user).subscribe({
//         next: () => {
//           this.snackBar.open('Price successfully deleted.', '', {
//             duration: 3000,
//             verticalPosition: 'top',
//             horizontalPosition: 'center'
//           });
//           // Optionally refresh the list of prices here
//         },
//         error: (err) => {
//           console.error('Error deleting product price:', err);
//           this.snackBar.open('Failed to delete product price.', 'Close', {
//             duration: 3000,
//           });
//         }
//       });
//     }
//   });
// }

openDeleteDialog(priceId: number, productName: string): void {
  const user = this.authService.getUserProfile() || 'Default Manager'; // Retrieve the current user or a default value
  //console.log('Deleting price with ID:', priceId);
  //console.log('Manager:', user); // Ensure this is defined
  
  const dialogRef = this.dialog.open(DeletePriceConfirmationComponent, {
    data: { productName: productName } // Pass the product name to the dialog
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // User confirmed deletion
      this.getPrices();
      this.priceService.deleteThisProduct(priceId, user).subscribe({
        next: () => {
          this.snackBar.open('Price successfully deleted.', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          // Optionally refresh the list of prices here
        },
        error: (err) => {
          console.error('Error deleting product price:', err);
          let errorMessage = 'Failed to delete product price.';

          // Check for specific error messages from the API
          if (err.status === 404) {
            errorMessage = 'No matching product price found.';
          } else if (err.status === 409) {
            errorMessage = 'This price cannot be deleted because it is assigned to a product.';
          }

          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000, verticalPosition: 'top', horizontalPosition: 'center'
          });
        }
      });
    }
  });
}







}
