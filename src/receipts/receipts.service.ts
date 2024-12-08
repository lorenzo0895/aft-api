import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cheque } from 'src/cheques/entities/cheque.entity';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { Receipt } from './entities/receipt.entity';
import { UpdateReceiptDescriptionDto } from './dto/update-receipt-description.dto';
import { ConceptItem } from 'src/concept-items/entities/concept.entity';
import { Paginator } from 'src/shared/constants/classes/paginator.class';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private receiptRepository: Repository<Receipt>,
    @InjectRepository(ConceptItem)
    private conceptItemRepository: Repository<ConceptItem>,
    private dataSource: DataSource,
  ) {}

  async findLast(): Promise<Receipt> {
    return await this.receiptRepository
      .createQueryBuilder('r')
      .orderBy('r.number', 'DESC')
      .take(1)
      .getOne();
  }

  async create(body: CreateReceiptDto) {
    const { cheques, ...rest } = body;
    const total =
      body.cash +
      body.transferAmount +
      body.cheques.reduce((acc, curr) => {
        return acc + curr.amount;
      }, 0);
    if (total <= 0) {
      throw new BadRequestException('El importe total debe ser mayor a cero');
    }
    const lastReceipt = await this.findLast();
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newReceipt = queryRunner.manager.create(Receipt, {
        ...rest,
        number: (lastReceipt?.number ?? 0) + 1,
      } as DeepPartial<Receipt>);
      const createdReceipt = await queryRunner.manager.save(newReceipt);
      for (const cheque of cheques) {
        const createdCheque = queryRunner.manager.create(Cheque, {
          ...cheque,
          receipt: createdReceipt,
        });
        await queryRunner.manager.save(Cheque, createdCheque);
      }
      await queryRunner.commitTransaction();
      return await this.findOne(createdReceipt.id);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      if (err instanceof BadRequestException) {
        throw new BadRequestException(err.message);
      } else {
        throw new BadRequestException('Algo falló');
      }
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(
    start: Date,
    end: Date,
    client: number,
    take: number,
  ): Promise<Receipt[]> {
    let whereString = '';
    if (start) whereString += 'd.day >= :start AND d.day <= :end';
    if (start && client) whereString += ' AND c.id = :client';
    if (!start && client) whereString += 'c.id = :client';
    return await this.receiptRepository
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.day', 'd')
      .leftJoinAndSelect('r.cancelReceipt', 'cr')
      .leftJoinAndSelect('r.client', 'c')
      .leftJoinAndSelect('r.cheques', 'ch')
      .leftJoinAndSelect('r.cancelCheques', 'ch2')
      .where(whereString, {
        start: start,
        end: end,
        client: client,
      })
      .orderBy('r.number', 'DESC')
      .take(take)
      .getMany();
  }

  async findPage(
    start: Date,
    end: Date,
    client: number,
    take: number,
    page: number,
  ): Promise<Paginator<Receipt>> {
    let whereString = '';
    if (start) whereString += 'd.day >= :start AND d.day <= :end';
    if (start && client) whereString += ' AND c.id = :client';
    if (!start && client) whereString += 'c.id = :client';
    const [receipts, count] = await this.receiptRepository
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.day', 'd')
      .leftJoinAndSelect('r.cancelReceipt', 'cr')
      .leftJoinAndSelect('r.client', 'c')
      .leftJoinAndSelect('r.cheques', 'ch')
      .leftJoinAndSelect('r.cancelCheques', 'ch2')
      .where(whereString, {
        start: start,
        end: end,
        client: client,
      })
      .orderBy('r.number', 'DESC')
      .take(take)
      .skip((page - 1) * take)
      .getManyAndCount();
    return new Paginator(receipts, page, count);
  }

  async findOne(id: number) {
    // const receipt = await this.receiptRepository.findOne({
    //   where: { id: id },
    //   relations: ['receipt'],
    // });

    const receipt = await this.receiptRepository
      .createQueryBuilder('r')
      .where('r.id = :id', { id: id })
      .leftJoinAndSelect('r.cancelReceipt', 'cr')
      .leftJoinAndSelect('r.cheques', 'ch')
      .leftJoinAndSelect('r.cancelCheques', 'ch2')
      .leftJoinAndSelect('r.day', 'd')
      .leftJoinAndSelect('r.client', 'c')
      .leftJoinAndSelect('r.conceptItems', 'ci')
      .leftJoinAndSelect('ci.concept', 'concept')
      .getOne();
    if (!receipt) {
      throw new NotFoundException('Recibo no encontrado');
    }
    const cancelledBy = await this.receiptRepository.findOneBy({
      cancelReceipt: receipt,
    });
    return { ...receipt, cancelledBy };
  }

  async minuta(
    start: Date,
    end: Date,
    orderBy: 'receipt' | 'client',
    client: number,
  ) {
    const filterByClient = client ? ' AND r.client.id = :client' : '';
    const result = await this.receiptRepository
      .createQueryBuilder('r')
      .select([
        'r.id',
        'r.number',
        'r.cash',
        'r.transferAmount',
        'r.description',
      ])
      .leftJoinAndSelect('r.conceptItems', 'ci')
      .leftJoin('r.day', 'd')
      .leftJoin('r.client', 'client')
      .leftJoin('ci.concept', 'c')
      .leftJoinAndSelect('r.cheques', 'ch1')
      .leftJoinAndSelect('r.cancelCheques', 'ch2')
      .leftJoinAndSelect('r.cancelReceipt', 'cr')
      .addSelect([
        'c.id',
        'c.description',
        'client.name',
        'client.surname',
        'd.day',
      ])
      .andWhere('d.day >= :start AND d.day <= :end' + filterByClient, {
        start: start,
        end: end,
        client: client,
      })
      .getMany();

    if (orderBy === 'client') {
      return result.sort((a, b) => {
        const nameA = (a.client.surname ? a.client.surname + ', ' + a.client.name : a.client.name).toLowerCase();
        const nameB = (b.client.surname ? b.client.surname + ', ' + b.client.name : b.client.name).toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    } else {
      return result.sort((a, b) => a.number - b.number);
    }
  }

  async xubio(start: Date, end: Date) {
    const array = await this.conceptItemRepository
      .createQueryBuilder('ci')
      .select([
        'r.number as number',
        'r.id as id',
        'r.isActive as isActive',
        'r.isCancelled as isCancelled',
        'ROUND(SUM(ci.amount), 2) as amount',
        'cl.name as name',
        'cl.surname as surname',
        'cl.cuit as cuit',
        'd.day as day',
        'cl.name as clientName',
        'cl.surname as clientSurname',
      ])
      .leftJoin('ci.receipt', 'r')
      .leftJoin('r.client', 'cl')
      .leftJoin('ci.concept', 'c')
      .leftJoin('r.day', 'd')
      .where('c.id = 6')
      .groupBy('r.number')
      .andWhere('d.day >= :start AND d.day <= :end', {
        start: start,
        end: end,
      })
      .getRawMany();
    
    array.forEach((a) => {
      a.isActive = Boolean(a.isActive);
      a.isCancelled = Boolean(a.isCancelled);
      a.amount = Number(a.amount);
    })
    
    return array;
  }

  async update(id: number, updateReceiptDto: UpdateReceiptDto) {
    const receipt = await this.receiptRepository.findOneBy({ id: id });
    if (!receipt) {
      throw new NotFoundException('Recibo no encontrado');
    }
    this.receiptRepository.update(id, updateReceiptDto as any);
    const updatedReceipt = await this.receiptRepository.findOneBy({ id: id });
    return updatedReceipt;
  }

  async updateDescription(
    id: number,
    updateReceiptDescription: UpdateReceiptDescriptionDto,
  ) {
    const receipt = await this.receiptRepository.findOneBy({ id: id });
    if (!receipt) {
      throw new NotFoundException('Recibo no encontrado');
    }
    this.receiptRepository.update(id, {
      description: updateReceiptDescription.description,
    });
    const updatedReceipt = await this.receiptRepository.findOneBy({ id: id });
    return updatedReceipt;
  }

  async remove(id: number) {
    const receipt = await this.receiptRepository.delete({ id: id });
    if (receipt.affected == 0) {
      throw new NotFoundException('Recibo no encontrado');
    }
    return receipt;
  }

  async close(id: number) {
    const receipt = await this.findOne(id);
    const totalAmount =
      receipt.cash +
      receipt.transferAmount +
      receipt.cheques.reduce((acc, curr) => {
        return Math.round((acc + curr.amount) * 100) / 100;
      }, 0);
    const totalConcepts = receipt.conceptItems.reduce((acc, curr) => {
      return Math.round((acc + curr.amount) * 100) / 100;
    }, 0);
    if (totalAmount !== totalConcepts) {
      throw new BadRequestException('El monto a computar debe ser igual a 0');
    }
    this.receiptRepository.update(id, { isActive: false });
    return await this.findOne(id);
  }

  async open(id: number) {
    const receipt = await this.findOne(id);
    if (!receipt) {
      throw new NotFoundException('Recibo no encontrado');
    }
    if (receipt.isCancelled) {
      throw new NotFoundException('No pueden reabrirse recibos cancelados');
    }
    await this.receiptRepository.update(id, {
      isActive: true,
    });
    return await this.findOne(id);
  }

  async cancel(id: number) {
    const receipt = await this.receiptRepository.findOne({
      where: { id },
      relations: ['day'],
    });
    if (!receipt) {
      throw new NotFoundException('Recibo no encontrado');
    }
    if (!receipt.day.isActive) {
      let day = receipt.day.day as unknown as string;
      day = day.slice(8, 10) + '/' + day.slice(5, 7) + '/' + day.slice(0, 4);
      throw new BadRequestException(`El día ${day} está cerrado`);
    }
    if (receipt.conceptItems.length !== 0) {
      throw new BadRequestException(
        'El recibo no debe tener netos relacionados',
      );
    }
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.update(Receipt, id, {
        isActive: false,
        isCancelled: true,
      });
      const lastReceipt: Receipt = await this.receiptRepository
        .createQueryBuilder('r')
        .orderBy('r.number', 'DESC')
        .take(1)
        .getOne();
      const newReceipt = queryRunner.manager.create(Receipt, {
        cash: receipt.cash,
        transferAmount: receipt.transferAmount,
        description: `Cancela ${receipt.number}`,
        day: receipt.day,
        number: lastReceipt.number + 1,
        client: receipt.client,
        cancelReceipt: receipt,
        isActive: false,
        isCancelled: true,
      });
      const createdReceipt = await queryRunner.manager.save(newReceipt);
      if (receipt.cheques) {
        for (const cheque of receipt.cheques) {
          await queryRunner.manager.update(Cheque, cheque, {
            cancelReceipt: createdReceipt,
          });
        }
      }
      await queryRunner.commitTransaction();
      return await this.findOne(createdReceipt.id);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      if (err instanceof BadRequestException) {
        throw new BadRequestException(err.message);
      } else {
        throw new BadRequestException('Algo falló');
      }
    } finally {
      await queryRunner.release();
    }
  }
}
