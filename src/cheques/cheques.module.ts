import { Module } from '@nestjs/common';
import { ChequesService } from './cheques.service';
import { ChequesController } from './cheques.controller';
import { Cheque } from './entities/cheque.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cheque])],
  controllers: [ChequesController],
  providers: [ChequesService],
})
export class ChequesModule {}
