import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConceptDto } from './dto/create-concept.dto';
import { UpdateConceptDto } from './dto/update-concept.dto';
import { Concept } from './entities/concept.entity';

@Injectable()
export class ConceptsService {
  constructor(
    @InjectRepository(Concept)
    private conceptRepository: Repository<Concept>,
  ) {}

  async findAll() {
    return await this.conceptRepository.find();
  }

  async findOne(id: number) {
    const concept = await this.conceptRepository.findOneBy({ id: id });
    if (!concept) {
      throw new NotFoundException('Concept is not found');
    }
    return concept;
  }

  async create(createConceptDto: CreateConceptDto) {
    const concept = this.conceptRepository.create(createConceptDto);
    return await this.conceptRepository.save(concept);
  }

  async update(id: number, updateConceptDto: UpdateConceptDto) {
    const concept = await this.conceptRepository.findOneBy({ id: id });
    if (!concept) {
      throw new NotFoundException('Concept is not found');
    }
    this.conceptRepository.update(id, updateConceptDto);
    const updatedConcept = await this.conceptRepository.findOneBy({ id: id });
    return updatedConcept;
  }

  async remove(id: number) {
    const result = await this.conceptRepository.delete({ id: id });
    if (result.affected == 0) {
      throw new NotFoundException('Concept is not found');
    }
    return result;
  }
}
