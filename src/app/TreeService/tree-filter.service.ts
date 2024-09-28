import { Injectable } from '@angular/core';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class TreeFilterService {

private products: Product [] = [];


  constructor() { }


filterProducts(
  selectedTypeId?: number,
  selectedCategoryId?: number,
  priceRange?: {min: number; max: number},
  selectedSizeId?: number
): Product[] {
return this.products.filter(p => {
  const matchesType = selectedTypeId ? p.productTypeId === selectedTypeId : true;
  const matchesCategory = selectedCategoryId ? p.productCategoryId === p.productCategoryId : true;
  const matchesPrice = priceRange ? p.price >= priceRange.min && p.price <= priceRange.max : true;
  const matchesSize = selectedSizeId ? p.sizeId === selectedSizeId : true;




return matchesType && matchesCategory && matchesPrice && matchesSize;

});
}



}
