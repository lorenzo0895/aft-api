import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateGeneralConfigDto } from './dto/update-general-config.dto';
import { DataSource, Repository } from 'typeorm';
import { GeneralConfig } from './entities/general-config.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGeneralConfigDto } from './dto/create-general-config.dto';

@Injectable()
export class GeneralConfigsService {

  constructor(
    @InjectRepository(GeneralConfig) private generalConfigRepository: Repository<GeneralConfig>,
    private dataSource: DataSource
  ) {
    // this.setInitialConfig();
  }

  setInitialConfig() {
    const array = [
      { key: 'cuit', value: '11111111111' }
    ]
    array.forEach(async (element) => {
      const existing = await this.findOne(element.key);
      const config = this.generalConfigRepository.create(element);
      await this.generalConfigRepository.save(config);
    })
  }

  async create(createGeneralConfigDto: CreateGeneralConfigDto) {
    const concept = this.generalConfigRepository.create(createGeneralConfigDto);
    return await this.generalConfigRepository.save(concept);
  }

  async findAll() {
    return await this.generalConfigRepository.find();
  }

  async findOne(key: string) {
    return await this.generalConfigRepository.findOneBy({ key })
  }

  async update(generalConfigs: UpdateGeneralConfigDto[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const generalConfig of generalConfigs) {
        const updatedGeneralConfig = queryRunner.manager.update(
          GeneralConfig, 
          { key: generalConfig.key },
          generalConfig
        );
        // await queryRunner.manager.save(updatedGeneralConfig);
      }
      await queryRunner.commitTransaction();
      return { success: true };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      if (err instanceof BadRequestException) {
        throw new BadRequestException(err.message);
      } else {
        throw new BadRequestException("Algo falló");
      }
    } finally {
      await queryRunner.release();
    }
  }

  // async remove(id: number) {
  //   return `This action removes a #${id} generalConfig`;
  // }
}
