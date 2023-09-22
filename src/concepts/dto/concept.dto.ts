import { ApiProperty } from '@nestjs/swagger';

export class ConceptDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  value: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  isOwnFee: boolean;
  @ApiProperty()
  isActive: boolean;
}
