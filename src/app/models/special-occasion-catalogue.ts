import { Discount } from "./discount";
import { OccasionType } from "./occasion-type";

export interface SpecialOccasionCatalogue {
    catalogueId: number;
    occasionTypeId: number;
    discountId: number;
    catTitle: string;
    catDescription: string;
    includedItems: string;
    discountStartDate: Date;
    discountEndDate: Date;
    catImage: string;
    occasionType?: OccasionType; 
    discount?: Discount; 
    occasionTypeName: string;
    discountPercentage: number;
}
