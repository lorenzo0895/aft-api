import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConceptItemDto } from './dto/create-concept-item.dto';
import { UpdateConceptItemDto } from './dto/update-concept-item.dto';
import { ConceptItem } from './entities/concept.entity';
import { Concept } from 'src/concepts/entities/concept.entity';

@Injectable()
export class ConceptItemService {
  constructor(
    @InjectRepository(ConceptItem)
    private conceptItemRepository: Repository<ConceptItem>,
    @InjectRepository(Concept)
    private conceptRepository: Repository<Concept>,
  ) {}

  async findAll(start: Date, end: Date, client: number, take: number) {
    let whereString = '';
    if (start) whereString += 'd.day >= :start AND d.day <= :end';
    if (start && client) whereString += ' AND client.id = :client';
    if (!start && client) whereString += 'client.id = :client';
    return await this.conceptItemRepository
      .createQueryBuilder('ci')
      .select([
        'ci.id',
        'ci.amount',
        'ci.description',
        'ci.isActive',
        'c.value',
        'r.id',
        'r.number',
        'r.description',
        'client.name',
        'client.surname',
        'd.day',
      ])
      .leftJoin('ci.concept', 'c')
      .leftJoin('ci.receipt', 'r')
      .leftJoin('r.day', 'd')
      .leftJoin('r.client', 'client')
      .where(whereString, {
        start: start,
        end: end,
        client: client,
      })
      .take(take)
      .orderBy('d.day', 'DESC')
      .getMany();
  }

  async findOne(id: number) {
    const conceptList = await this.conceptItemRepository.findOneBy({ id: id });
    if (!conceptList) {
      throw new NotFoundException('Neto no encontrado');
    }
    return conceptList;
  }

  async create(body: CreateConceptItemDto) {
    const { hasVat, aliquot, ...rest } = body;
    const concepts = await this.conceptRepository.find();
    const concept = this.conceptItemRepository.create(rest as any);
    const createdConcept = {
      ...(await this.conceptItemRepository.save(concept)),
      concept: concepts.find((it) => it.id === body.concept),
    };
    if (!body.hasVat) return [createdConcept];
    const fiscalDebit = this.conceptItemRepository.create({
      amount: Math.round(body.amount * body.aliquot) / 100,
      concept: 6,
      description: 'DF - ' + (body.description ?? ''),
      receipt: body.receipt,
    } as any);
    const createdFiscalDebit = {
      ...(await this.conceptItemRepository.save(fiscalDebit)),
      concept: concepts.find((it) => it.id === 6),
    };
    return [createdConcept, createdFiscalDebit];
  }

  async update(id: number, updateConceptDto: UpdateConceptItemDto) {
    const conceptItem = await this.conceptItemRepository.findOneBy({ id: id });
    if (!conceptItem) throw new NotFoundException('Neto no encontrado');

    await this.conceptItemRepository.update(id, updateConceptDto as any);
    const updatedConceptItem = await this.conceptItemRepository.findOneBy({
      id: id,
    });
    const concept = await this.conceptRepository.findOneBy({
      id: updateConceptDto.concept,
    });
    return { ...updatedConceptItem, concept: concept };
  }

  async close(id: number) {
    const conceptItem = await this.findOne(id);
    if (!conceptItem) throw new NotFoundException('Neto no encontrado');
    await this.conceptItemRepository.update(id, { isActive: false });
    return await this.findOne(id);
  }

  async open(id: number) {
    const conceptItem = await this.findOne(id);
    if (!conceptItem) throw new NotFoundException('Neto no encontrado');
    await this.conceptItemRepository.update(id, { isActive: true });
    return await this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.conceptItemRepository.delete({ id: id });
    if (result.affected == 0) {
      throw new NotFoundException('Neto no encontrado');
    }
    return result;
  }
}
