export interface ImportVouchers {
  vouchers: ImportVoucher[]  
}
export interface ImportVoucher {
  cuit: string;
  net: number;
  vat: number;
  date: Date;
  dateFrom: Date;
  dateTo: Date;
  datePayment: Date;
}
