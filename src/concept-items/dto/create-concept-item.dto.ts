import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ConceptItemDto } from './concept-item.dto';

export class CreateConceptItemDto extends OmitType(ConceptItemDto, [
  'id',
  'isActive',
] as const) {
  @ApiProperty()
  hasVat: boolean;
  @ApiProperty()
  aliquot: number;
}
