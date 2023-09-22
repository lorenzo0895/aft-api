import { ApiProperty } from '@nestjs/swagger';
import { Receipt } from 'src/receipts/entities/receipt.entity';

export class UserDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  receipts: Receipt[];
  @ApiProperty()
  roles: string;
  @ApiProperty()
  isActive: boolean;
}
