export interface SupplierOrder {
    supplierOrderId: number;
    empId: number;
    supplierId: number;
    sOrderDate: Date;
    deliveryAddress: string;
    sOrderItems: string;
    paymentMethod: string;
    paymentAmount: number;
    quantity: number;
}