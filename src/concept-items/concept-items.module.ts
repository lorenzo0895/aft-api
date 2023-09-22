import { Module } from '@nestjs/common';
import { ConceptItemService } from './concept-items.service';
import { ConceptItemController } from './concept-items.controller';
import { ConceptItem } from './entities/concept.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concept } from 'src/concepts/entities/concept.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConceptItem, Concept])],
  controllers: [ConceptItemController],
  providers: [ConceptItemService],
})
export class ConceptItemsModule {}
