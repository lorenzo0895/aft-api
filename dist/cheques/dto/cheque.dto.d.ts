import { ReceiptDto } from 'src/receipts/dto/receipt.dto';
export declare class ChequeDto {
    id: number;
    number: string;
    date: Date;
    bank: string;
    branchOffice: string;
    cuit: string;
    receipt: ReceiptDto;
    cancelReceipt: ReceiptDto;
    amount: number;
}
