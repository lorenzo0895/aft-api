import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  cuit: string;
  @ApiProperty()
  location: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  fiscalCondition: string;
}
