import { ConceptItem } from 'src/concept-items/entities/concept.entity';
export declare class Concept {
    id: number;
    value: string;
    description: string;
    conceptItems: ConceptItem[];
    isOwnFee: boolean;
    isActive: boolean;
}
