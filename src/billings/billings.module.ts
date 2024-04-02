import { Module } from '@nestjs/common';
import { BillingsService } from './billings.service';
import { BillingsController } from './billings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billing } from './entities/billing.entity';
import { GeneralConfigsModule } from 'src/general-configs/general-configs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Billing]), GeneralConfigsModule],
  controllers: [BillingsController],
  providers: [BillingsService],
})
export class BillingsModule {}
