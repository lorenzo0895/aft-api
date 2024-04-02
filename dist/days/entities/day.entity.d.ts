import { Receipt } from 'src/receipts/entities/receipt.entity';
export declare class Day {
    id: number;
    day: Date;
    totalAudited: number;
    receipts: Receipt[];
    isActive: boolean;
}
