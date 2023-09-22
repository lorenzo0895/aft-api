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
import { ChequesService } from './cheques.service';
import { ChequeDto } from './dto/cheque.dto';
import { CreateChequeDto } from './dto/create-cheque.dto';
import { UpdateChequeDto } from './dto/update-cheque.dto';

@Controller('cheques')
@ApiTags('cheques')
export class ChequesController {
  constructor(private readonly chequesService: ChequesService) {}

  @Get()
  @ApiOkResponse({ type: ChequeDto, isArray: true })
  findAll(@Query('onlyActive') onlyActive?: boolean) {
    onlyActive = String(onlyActive) === 'true' ? true : false;
    return this.chequesService.findAll(onlyActive);
  }

  @Get(':id')
  @ApiOkResponse({ type: ChequeDto })
  findOne(@Param('id') id: string) {
    return this.chequesService.findOne(+id);
  }

  @Post()
  @ApiOkResponse({ type: ChequeDto })
  create(@Body() createChequeDto: CreateChequeDto) {
    return this.chequesService.create(createChequeDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ChequeDto })
  update(@Param('id') id: string, @Body() updateChequeDto: UpdateChequeDto) {
    return this.chequesService.update(+id, updateChequeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chequesService.remove(+id);
  }
}
