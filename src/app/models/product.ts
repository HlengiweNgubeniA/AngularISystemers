import { ProductCategory } from "./product-category";
import { ProductPrice } from "./product-price";
import { ProductType } from "./product-type";
import { Size } from "./productSize";


export interface Product {
    id: number;
    productCategoryId: number;
    productTypeId: number;
    productPriceId: number;
    sizeId: number;
    name: string;
    description: string;
    pictureUrl: string;
    price: number;
    sizeName: string;
    typeName: string;
    productCategoryName: string;
    discountId?: number;



    productType?: ProductType;  // Related ProductType object
    category?: ProductCategory;         // Related Category object
    productPrice?: ProductPrice;               // Related Price object
    size?: Size; 


}


  
 