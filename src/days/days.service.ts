import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cheque } from 'src/cheques/entities/cheque.entity';
import { Repository } from 'typeorm';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';
import { Day } from './entities/day.entity';

@Injectable()
export class DaysService {
  constructor(
    @InjectRepository(Day)
    private dayRepository: Repository<Day>,
  ) {}

  async create(createDayDto: CreateDayDto) {
    const find = await this.dayRepository.findOneBy({ day: createDayDto.day });
    if (find) throw new BadRequestException('El día ya existente');
    const day = this.dayRepository.create(createDayDto);
    return await this.dayRepository.save(day);
  }

  async findAll(full: boolean, onlyActive?: boolean): Promise<any> {
    if (!full) {
      const where = onlyActive ? { isActive: true } : undefined;
      return await this.dayRepository.find({
        where: where,
        order: { day: 'DESC' },
      });
    }
    return await this.dayRepository
      .createQueryBuilder('d')
      .select([
        'd.id as id',
        'd.day as day',
        'd.isActive as isActive',
        'IFNULL(COUNT(r.id), 0) as receiptsQuantity',
        '(IFNULL(SUM(r.cash), 0)+IFNULL(SUM(r.transferAmount), 0)+IFNULL(SUM(subQuery.total), 0)) as totalReceived',
        'd.totalAudited as totalAudited',
      ])
      .where(onlyActive ? 'd.isActive = TRUE' : '')
      .leftJoin('d.receipts', 'r', 'd.id = r.dayId AND r.isCancelled = FALSE')
      .leftJoin(
        (subQuery) => {
          return subQuery
            .select('SUM(c.amount)', 'total')
            .addSelect('c.receiptId')
            .from(Cheque, 'c')
            .groupBy('c.receiptId');
        },
        'subQuery',
        'subQuery.receiptId = r.id',
      )
      .groupBy('d.id')
      .orderBy('d.day', 'DESC')
      .take(1000)
      .getRawMany();
  }

  async findOne(id: number) {
    const day = await this.dayRepository.findOneBy({ id: id });
    if (!day) throw new NotFoundException('Día no encontrado');
    return day;
  }

  async update(id: number, updateDayDto: UpdateDayDto) {
    const day = await this.dayRepository.findOneBy({ id: id });
    if (!day) throw new NotFoundException('Día no encontrado');
    await this.dayRepository.update(id, updateDayDto);
    const updatedDay = await this.dayRepository.findOneBy({ id: id });
    return updatedDay;
  }

  async close(id: number) {
    const day = await this.dayRepository.findOneBy({ id: id });
    if (!day) throw new NotFoundException('Día no encontrado');
    await this.dayRepository.update(id, { isActive: false });
    return await this.dayRepository.findOneBy({ id: id });
  }

  async open(id: number) {
    const day = await this.dayRepository.findOneBy({ id: id });
    if (!day) throw new NotFoundException('Día no encontrado');

    await this.dayRepository.update(id, { isActive: true });
    return await this.dayRepository.findOneBy({ id: id });
  }

  async remove(id: number) {
    const day = await this.dayRepository.delete({ id: id });
    if (day.affected == 0) throw new NotFoundException('Día no encontrado');
    return day;
  }
}
