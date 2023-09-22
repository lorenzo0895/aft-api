import { ApiProperty } from '@nestjs/swagger';
import { CreateChequeDto } from 'src/cheques/dto/create-cheque.dto';

export class CreateReceiptDto {
  @ApiProperty()
  day: number;
  @ApiProperty()
  client: number;
  @ApiProperty()
  transferAmount: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  cash: number;
  @ApiProperty()
  user: number;
  @ApiProperty()
  cancelReceipt: number;
  @ApiProperty({ type: CreateChequeDto, isArray: true })
  cheques: CreateChequeDto[];
}
