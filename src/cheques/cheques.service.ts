import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateChequeDto } from './dto/create-cheque.dto';
import { UpdateChequeDto } from './dto/update-cheque.dto';
import { Cheque } from './entities/cheque.entity';

@Injectable()
export class ChequesService {
  constructor(
    @InjectRepository(Cheque)
    private chequeRepository: Repository<Cheque>,
  ) {}

  async create(CreateChequeDto: CreateChequeDto) {
    const cheque = this.chequeRepository.create(CreateChequeDto);
    return await this.chequeRepository.save(cheque);
  }

  async findAll(onlyActive: boolean): Promise<Cheque[]> {
    return await this.chequeRepository.find({
      where: {
        receipt: onlyActive ? IsNull() : Not(IsNull()),
      },
    });
  }

  async findOne(id: number) {
    const cheque = await this.chequeRepository.findOne({
      where: { id: id },
      relations: ['receipt'],
    });
    if (!cheque) {
      throw new NotFoundException('Cheque is not found');
    }
    return cheque;
  }

  async update(id: number, updateChequeDto: UpdateChequeDto) {
    const cheque = await this.chequeRepository.findOneBy({ id: id });
    if (!cheque) {
      throw new NotFoundException('Cheque is not found');
    }
    this.chequeRepository.update(id, updateChequeDto);
    const updatedCheque = await this.chequeRepository.findOneBy({ id: id });
    return updatedCheque;
  }

  async remove(id: number) {
    const cheque = await this.chequeRepository.delete({ id: id });
    if (cheque.affected == 0) {
      throw new NotFoundException('Cheque is not found');
    }
    return cheque;
  }
}
