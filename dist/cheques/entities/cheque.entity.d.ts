import { Receipt } from 'src/receipts/entities/receipt.entity';
export declare class Cheque {
    id: number;
    number: string;
    date: Date;
    bank: string;
    branchOffice: string;
    cuit: string;
    receipt: Receipt;
    cancelReceipt: Receipt;
    amount: number;
}
