import { CreateConceptItemDto } from './create-concept-item.dto';
declare const UpdateConceptItemDto_base: import("@nestjs/common").Type<Partial<Omit<CreateConceptItemDto, "hasVat" | "aliquot">>>;
export declare class UpdateConceptItemDto extends UpdateConceptItemDto_base {
}
export {};
