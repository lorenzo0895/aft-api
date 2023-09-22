import { Module } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { ReceiptsController } from './receipts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './entities/receipt.entity';
import { Cheque } from 'src/cheques/entities/cheque.entity';
import { ChequesService } from 'src/cheques/cheques.service';
import { Day } from 'src/days/entities/day.entity';
import { ConceptItem } from 'src/concept-items/entities/concept.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt, Cheque, Day, ConceptItem])],
  controllers: [ReceiptsController],
  providers: [ReceiptsService, ChequesService],
})
export class ReceiptsModule {}
