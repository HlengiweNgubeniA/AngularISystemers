export interface StockWriteOff {
    id: number;
    writeOffItem: string;
    quantityWriteOff: number;
    reason: string;
    writtenOffBy: string;
    date: Date;
}