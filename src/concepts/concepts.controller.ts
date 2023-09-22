import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ConceptsService } from './concepts.service';
import { ConceptDto } from './dto/concept.dto';
import { CreateConceptDto } from './dto/create-concept.dto';
import { UpdateConceptDto } from './dto/update-concept.dto';

@Controller('concepts')
@ApiTags('concepts')
export class ConceptsController {
  constructor(private readonly conceptsService: ConceptsService) {}

  @Post()
  @ApiOkResponse({ type: ConceptDto })
  create(@Body() createConceptDto: CreateConceptDto) {
    return this.conceptsService.create(createConceptDto);
  }

  @Get()
  @ApiOkResponse({ type: ConceptDto, isArray: true })
  findAll() {
    return this.conceptsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ConceptDto })
  findOne(@Param('id') id: string) {
    return this.conceptsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ConceptDto })
  update(@Param('id') id: string, @Body() updateConceptDto: UpdateConceptDto) {
    return this.conceptsService.update(+id, updateConceptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conceptsService.remove(+id);
  }
}
