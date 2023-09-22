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
import { ConceptItemService } from './concept-items.service';
import { ConceptItemDto } from './dto/concept-item.dto';
import { CreateConceptItemDto } from './dto/create-concept-item.dto';
import { UpdateConceptItemDto } from './dto/update-concept-item.dto';

@Controller('concept-items')
@ApiTags('concept-items')
export class ConceptItemController {
  constructor(private readonly conceptsService: ConceptItemService) {}

  @Post()
  @ApiOkResponse({ type: ConceptItemDto })
  create(@Body() createConceptDto: CreateConceptItemDto) {
    return this.conceptsService.create(createConceptDto);
  }

  @Get()
  @ApiOkResponse({ type: ConceptItemDto, isArray: true })
  findAll(
    @Query('start') start: Date,
    @Query('end') end: Date,
    @Query('client') client: number,
    @Query('take') take: number,
  ) {
    return this.conceptsService.findAll(start, end, client, take);
  }

  @Get(':id')
  @ApiOkResponse({ type: ConceptItemDto })
  findOne(@Param('id') id: string) {
    return this.conceptsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ConceptItemDto })
  update(
    @Param('id') id: string,
    @Body() updateConceptDto: UpdateConceptItemDto,
  ) {
    return this.conceptsService.update(+id, updateConceptDto);
  }

  @Patch('close/:id')
  @ApiOkResponse({ type: ConceptItemDto })
  close(@Param('id') id: string) {
    return this.conceptsService.close(+id);
  }

  @Patch('open/:id')
  @ApiOkResponse({ type: ConceptItemDto })
  open(@Param('id') id: string) {
    return this.conceptsService.open(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conceptsService.remove(+id);
  }
}
