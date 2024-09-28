import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Discount } from '../../models/discount';
import { Product } from '../../models/product';
import { DiscountService } from '../../services/discount.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-apply-discount',
  templateUrl: './apply-discount.component.html',
  styleUrl: './apply-discount.component.css'
})
export class ApplyDiscountComponent implements OnInit {
  selectedProductIds: number[] = [];
  selectedDiscountId!: number;
  products: Product[] = []; 
  discounts!: Discount[]; 
  constructor(private discountService: DiscountService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ApplyDiscountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number, discount: Discount }
  ) {
  }


  ngOnInit(): void {

this.loadDiscounts();
this.loadProducts();

  }


  loadProducts(): void {
   
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      console.log('Loaded products:', this.products);
    });
  }

  loadDiscounts(): void {
    this.discountService.getDiscounts().subscribe((discounts: Discount[]) => {
      this.discounts = discounts;
      //console.log('Loaded discounts:', this.discounts);
    });
  }

  

  // applyDiscount(productIds: number[], discountId: number): void {
  //   const discount = this.discounts.find(d => d.discountId === discountId);
  //   if (discount) {
  //     productIds.forEach(productId => {
  //       const product = this.products.find(p => p.id === productId);
  //       if (product) {
  //         product.price -= (product.price * (discount.discountPercentage / 100));
  //         product.discountId = discount.discountId; // Optional: Store which discount was applied
  //         console.log(`Applied ${discount.discountPercentage}% to ${product.name}. New price: ${product.price}`);
  //       }
  //     });
  //   } else {
  //     console.error('Discount not found');
  //   }
  // }

  applyDiscount(): void {
    const discount = this.data.discount;
    if (discount) {
      this.selectedProductIds.forEach(productId => {
        const product = this.products.find(p => p.id === productId);
        if (product) {
          product.price -= (product.price * (discount.discountPercentage / 100));
          product.discountId = discount.discountId; // Optionally store which discount was applied
          console.log(`Applied ${discount.discountPercentage}% to ${product.name}. New price: ${product.price}`);
        }
      });
      this.dialogRef.close(); // Close the dialog after applying the discount
    } else {
      console.error('Discount not found');
    }
  }

  // applyDiscount(): void {
  //   this.dialogRef.close({ productId: this.selectedProductId, discountId: this.selectedDiscountId });
  // }
  

  close(): void {
    this.dialogRef.close();
  }

}
