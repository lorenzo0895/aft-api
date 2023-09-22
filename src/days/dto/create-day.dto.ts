import { OmitType } from '@nestjs/swagger';
import { DayDto } from './day.dto';

export class CreateDayDto extends OmitType(DayDto, [
  'id',
  'isActive',
  'leftover',
  'totalAudited',
] as const) {}
