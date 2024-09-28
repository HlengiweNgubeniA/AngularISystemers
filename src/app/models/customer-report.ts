import { Order } from "./order";

export interface CustomerReport {
    customerId: number;
    userId: string;
    cusFirstName: string;
    cusLastName: string;
    cusEmail: string;
    cusPhone: string;
    orders: Order[]; // Add this line
    orderCount?: number; // Optional, calculated later
  }