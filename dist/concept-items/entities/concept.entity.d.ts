import { Concept } from 'src/concepts/entities/concept.entity';
import { Receipt } from 'src/receipts/entities/receipt.entity';
export declare class ConceptItem {
    id: number;
    concept: Concept;
    receipt: Receipt;
    amount: number;
    description: string;
    isActive: boolean;
}
