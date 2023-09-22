import { ApiProperty } from '@nestjs/swagger';

export class ConceptItemDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  concept: number;
  @ApiProperty()
  receipt: number;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  description: string;
  @ApiProperty({ default: true })
  isActive: boolean;
}
