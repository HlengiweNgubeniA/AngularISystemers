import { ProductType } from "./product-type";

export interface ProductCategory {
    productCategoryId: number;
    productCategoryName: string;
    productCategoryDescription: string;
    productTypes: ProductType[];
}