import { CreateChequeDto } from 'src/cheques/dto/create-cheque.dto';
export declare class CreateReceiptDto {
    day: number;
    client: number;
    transferAmount: number;
    description: string;
    cash: number;
    user: number;
    cancelReceipt: number;
    cheques: CreateChequeDto[];
}
