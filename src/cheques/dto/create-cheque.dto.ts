import { OmitType } from '@nestjs/swagger';
import { ChequeDto } from './cheque.dto';

export class CreateChequeDto extends OmitType(ChequeDto, ['id'] as const) {}
