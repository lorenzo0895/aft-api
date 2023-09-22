import { ApiProperty } from '@nestjs/swagger';
import { Cheque } from 'src/cheques/entities/cheque.entity';
import { ClientDto } from 'src/clients/dto/client.dto';
import { DayDto } from 'src/days/dto/day.dto';
import { User } from 'src/users/entities/user.entity';

export class ReceiptDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  day: DayDto;
  @ApiProperty()
  client: ClientDto;
  @ApiProperty()
  transferAmount: number;
  @ApiProperty()
  cash: number;
  @ApiProperty()
  user: User;
  @ApiProperty()
  description: string;
  @ApiProperty()
  cheques: Cheque[];
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  isCanceled: boolean;
  @ApiProperty()
  cancelReceipt: ReceiptDto;
}
