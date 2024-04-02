import { ConceptItemDto } from './concept-item.dto';
declare const CreateConceptItemDto_base: import("@nestjs/common").Type<Omit<ConceptItemDto, "id" | "isActive">>;
export declare class CreateConceptItemDto extends CreateConceptItemDto_base {
    hasVat: boolean;
    aliquot: number;
}
export {};
