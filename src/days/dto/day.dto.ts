import { ApiProperty } from '@nestjs/swagger';

export class DayDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  day: Date;
  @ApiProperty()
  leftover: number;
  @ApiProperty()
  totalAudited: number;
  @ApiProperty()
  isActive: boolean;
}
