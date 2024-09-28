export interface SupplierOrderReceipt {
    id: number;
    supplierOrderId: number;
    receiptFileName: string;
    dateReceived: Date;
    expectedQuantity: number;
    receivedQuantity: number;
    notes: string;
  }