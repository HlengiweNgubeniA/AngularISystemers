import { Component } from '@angular/core';
import { SpecialOccasionCatalogue } from '../../models/special-occasion-catalogue';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit } from '@angular/core';
import { SpecialOccasionCatalogueService } from '../../services/special-occasion-catalogue.service';
import { OccasionType } from '../../models/occasion-type';
import { Discount } from '../../models/discount';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { BasketService } from '../../Cart/basket.service';

@Component({
  selector: 'app-catalogue-display',
  templateUrl: './catalogue-display.component.html',
  styleUrl: './catalogue-display.component.css'
})
export class CatalogueDisplayComponent implements OnInit {
 
  occasionType: OccasionType[] = [];
  discount: Discount[] = [];
  dataSource = new MatTableDataSource<SpecialOccasionCatalogue>([]);

constructor(
  private catService: SpecialOccasionCatalogueService,
  private snackBar: MatSnackBar,
  private productService: ProductService,
  private basketService: BasketService,

){}


ngOnInit(): void {
  this.getCatalogues();


  this.catService.getOccasionTypes().subscribe(data => {
    this.occasionType = data;
    //this.loadCatalogues(); // Load catalogues after occasion types
  });

  this.catService.getDiscounts().subscribe(data => {
    this.discount = data;
    //this.loadCatalogues(); // Load catalogues after discounts
  });


}

// getCatalogues(){
//   this.catService.getCatalogues().subscribe(
//     (data) => {
//      this.dataSource.data = data;
//   })
// }

 // Add product to basket
 addCatalogueToBasket(item: any) {
  this.basketService.addToBasket(item);
  this.snackBar.open(`${item.catTitle} added to basket!`, 'Close', {
    duration: 1000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  })
}

getCatalogues(): void {
  this.catService.getCatalogues().subscribe(
    (data) => {
      this.dataSource.data = data
      });
}



}
