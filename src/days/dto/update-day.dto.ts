import { PartialType } from '@nestjs/swagger';
import { DayDto } from './day.dto';

export class UpdateDayDto extends PartialType(DayDto) {}
