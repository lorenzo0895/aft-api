export interface GenerateCaeGroup {
  vouchers: GenerateCae[]  
}
export interface GenerateCae {
  id: number;
  net: number;
  vat: number;
  cuit: string;
  date: string;
  dateFrom: string;
  dateTo: string;
  datePayment: string;
}
