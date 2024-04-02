import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeneralConfigsService } from './general-configs.service';
import { CreateGeneralConfigDto } from './dto/create-general-config.dto';
import { UpdateGeneralConfigDto } from './dto/update-general-config.dto';

@Controller('general-configs')
export class GeneralConfigsController {
  constructor(private readonly generalConfigsService: GeneralConfigsService) {}

  // @Post()
  // async create(@Body() createGeneralConfigDto: CreateGeneralConfigDto) {
  //   return await this.generalConfigsService.create(createGeneralConfigDto);
  // }

  @Get()
  async findAll() {
    return await this.generalConfigsService.findAll();
  }

  @Get(':key')
  async findOne(@Param('key') key: string) {
    return await this.generalConfigsService.findOne(key);
  }

  @Patch()
  async update(@Body() body: { generalConfigs: UpdateGeneralConfigDto[] }) {
    return await this.generalConfigsService.update(body.generalConfigs);
  }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return await this.generalConfigsService.remove(+id);
  // }
}
