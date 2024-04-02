import { Module } from '@nestjs/common';
import { GeneralConfigsService } from './general-configs.service';
import { GeneralConfigsController } from './general-configs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralConfig } from './entities/general-config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GeneralConfig])],
  controllers: [GeneralConfigsController],
  providers: [GeneralConfigsService],
  exports: [GeneralConfigsService],
})
export class GeneralConfigsModule {}
