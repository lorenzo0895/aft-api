import { ApiProperty } from '@nestjs/swagger';

export class ClientDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ nullable: true })
  surname: string;
  @ApiProperty()
  cuit: string;
  @ApiProperty()
  location: string;
  @ApiProperty({ nullable: true })
  phone: string;
  @ApiProperty()
  fiscalCondition: string;
  @ApiProperty()
  isActive: boolean;
}
