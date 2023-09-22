import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DaysService } from './days.service';
import { CreateDayDto } from './dto/create-day.dto';
import { DayDto } from './dto/day.dto';
import { UpdateDayDto } from './dto/update-day.dto';

@Controller('days')
@ApiTags('days')
export class DaysController {
  constructor(private readonly daysService: DaysService) {}

  @Get()
  @ApiOkResponse({ type: DayDto, isArray: true })
  findAll(
    @Query('full') full?: boolean,
    @Query('onlyActive') onlyActive?: boolean,
  ) {
    full = String(full) === 'true' ? true : false;
    onlyActive = String(onlyActive) === 'true' ? true : false;
    return this.daysService.findAll(full, onlyActive);
  }

  @Get(':id')
  @ApiOkResponse({ type: DayDto })
  findOne(@Param('id') id: string) {
    return this.daysService.findOne(+id);
  }

  @Post()
  @ApiOkResponse({ type: DayDto })
  create(@Body() createDayDto: CreateDayDto) {
    return this.daysService.create(createDayDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: DayDto })
  update(@Param('id') id: string, @Body() updateDayDto: UpdateDayDto) {
    return this.daysService.update(+id, updateDayDto);
  }

  @Patch('close/:id')
  @ApiOkResponse({ type: DayDto })
  close(@Param('id') id: string) {
    return this.daysService.close(+id);
  }

  @Patch('open/:id')
  @ApiOkResponse({ type: DayDto })
  open(@Param('id') id: string) {
    return this.daysService.open(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.daysService.remove(+id);
  }
}
