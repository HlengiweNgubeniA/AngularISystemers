export interface Order {
    orderId: number;
    statusId: number;
    customerId: number;
    deliveryId: number;
    date: Date;
    shippingAddress: string;
    totalAmount: number;
    orderStatus: string;
    totalTaxAmount: number;
    responsibility: string;
}