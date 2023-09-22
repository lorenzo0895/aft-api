import { Module } from '@nestjs/common';
import { DaysService } from './days.service';
import { DaysController } from './days.controller';
import { Day } from './entities/day.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Day])],
  controllers: [DaysController],
  providers: [DaysService],
})
export class DaysModule {}
