export interface Review {
  id: number;
  customerId: number;
  productId: number;
  rating: number;
  content: string;
  date: Date;
  dateModified: Date,
  customerName: string,
  productName: string,
  comment: string,
}
