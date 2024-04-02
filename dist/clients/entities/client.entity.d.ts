import { Receipt } from 'src/receipts/entities/receipt.entity';
export declare class Client {
    id: number;
    name: string;
    surname: string;
    cuit: string;
    location: string;
    fiscalCondition: string;
    phone: string;
    receipts: Receipt[];
    isActive: boolean;
}
