import { ApiProperty } from '@nestjs/swagger';

export class UpdateReceiptDescriptionDto {
  @ApiProperty()
  description: string;
}
