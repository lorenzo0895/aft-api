import { Module } from '@nestjs/common';
import { ConceptsService } from './concepts.service';
import { ConceptsController } from './concepts.controller';
import { Concept } from './entities/concept.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Concept])],
  controllers: [ConceptsController],
  providers: [ConceptsService],
})
export class ConceptsModule {}
