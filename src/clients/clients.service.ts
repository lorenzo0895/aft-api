import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    if (!createClientDto.name) {
      throw new BadRequestException('El nombre no puede ser nulo');
    }
    if (!createClientDto.cuit) {
      throw new BadRequestException('El CUIT no puede ser nulo');
    }
    const cuitRepeated = await this.clientRepository.findOneBy({
      cuit: createClientDto.cuit,
    });
    if (cuitRepeated) {
      throw new BadRequestException('CUIT repetido');
    }
    const client = this.clientRepository.create(createClientDto);
    return await this.clientRepository.save(client);
  }

  async findAll(): Promise<Client[]> {
    return this.clientRepository
      .createQueryBuilder('c')
      .select([
        'c.name as name',
        'c.surname as surname',
        'c.isActive as isActive',
        'c.cuit as cuit',
        'c.location as location',
        'c.id as id',
        'c.phone as phone',
        'c.fiscalCondition as fiscalCondition',
      ])
      .orderBy('CONCAT(IFNULL(c.surname, "ZZZ"), c.name)', 'ASC')
      .getRawMany();
  }

  async findOne(id: number) {
    const client = await this.clientRepository.findOneBy({ id: id });
    if (!client) {
      throw new NotFoundException('Client no encontrado');
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepository.findOneBy({ id: id });
    if (!client) {
      throw new NotFoundException('Client no encontrado');
    }
    if (!updateClientDto.name) {
      throw new BadRequestException('El nombre no puede ser nulo');
    }
    if (!updateClientDto.cuit) {
      throw new BadRequestException('El CUIT no puede ser nulo');
    }
    const cuitRepeated = await this.clientRepository.findOneBy({
      cuit: updateClientDto.cuit,
    });
    if (cuitRepeated && client.id !== cuitRepeated.id) {
      throw new BadRequestException('CUIT repetido');
    }
    this.clientRepository.update(id, updateClientDto);
    const updatedClient = await this.clientRepository.findOneBy({ id: id });
    return updatedClient;
  }

  async remove(id: number) {
    const client = await this.clientRepository.delete({ id: id });
    if (client.affected == 0) {
      throw new NotFoundException('Client no encontrado');
    }
    return client;
  }
}
