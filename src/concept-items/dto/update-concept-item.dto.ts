import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateConceptItemDto } from './create-concept-item.dto';

export class UpdateConceptItemDto extends PartialType(
  OmitType(CreateConceptItemDto, ['hasVat', 'aliquot']),
) {}
