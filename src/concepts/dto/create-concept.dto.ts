import { OmitType } from '@nestjs/swagger';
import { ConceptDto } from './concept.dto';

export class CreateConceptDto extends OmitType(ConceptDto, [
  'id',
  'isActive',
] as const) {}
