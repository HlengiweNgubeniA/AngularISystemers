export interface Stock {
    id: number;
    stockTypeId: number;
    stockWriteOffId: number;
    stockTakeId: number;
    name: string;
    description: string;
    quantity: number;
}