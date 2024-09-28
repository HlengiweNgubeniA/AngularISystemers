export interface Discount {
    discountId: number;
    disName: string;
    disDescription: string;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
    status?: string;
}
