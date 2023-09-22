import { ApiProperty } from '@nestjs/swagger';
import { ReceiptDto } from 'src/receipts/dto/receipt.dto';

export class ChequeDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  number: string;
  @ApiProperty()
  date: Date;
  @ApiProperty()
  bank: string;
  @ApiProperty()
  branchOffice: string;
  @ApiProperty()
  cuit: string;
  @ApiProperty()
  receipt: ReceiptDto;
  @ApiProperty()
  cancelReceipt: ReceiptDto;
  @ApiProperty()
  amount: number;
}
