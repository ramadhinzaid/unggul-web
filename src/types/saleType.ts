import type Customer from "./customerType";
import type Stock from "./stockType";

export default interface Sale {
  note: string;
  date: string;
  customer: Customer;
  subtotal: number;
  products: Stock[];
  sumqty: number;
}

export interface SaleRequest {
  note: string;
  date: string;
  customer_id: string;
  products: Pick<Stock, "code" | "qty">[];
}
