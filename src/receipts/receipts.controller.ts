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
import { ReceiptsService } from './receipts.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReceiptDto } from './dto/receipt.dto';
import { UpdateReceiptDescriptionDto } from './dto/update-receipt-description.dto';

@Controller('receipts')
@ApiTags('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Get()
  @ApiOkResponse({ type: ReceiptDto, isArray: true })
  findAll(
    @Query('start') start: Date,
    @Query('end') end: Date,
    @Query('client') client: number,
    @Query('take') take: number,
  ) {
    return this.receiptsService.findAll(start, end, client, take);
  }

  @Get()
  @ApiOkResponse({ type: ReceiptDto, isArray: true })
  findPage(
    @Query('start') start: Date,
    @Query('end') end: Date,
    @Query('client') client: number,
    @Query('take') take: number,
    @Query('page') page: number,
  ) {
    return this.receiptsService.findPage(start, end, client, take ? +take : 10, page ? +page : 1);
  }

  @Get(':id')
  @ApiOkResponse({ type: ReceiptDto })
  findOne(@Param('id') id: string) {
    return this.receiptsService.findOne(+id);
  }

  @Get('report/minuta')
  async report(
    @Query('start') start: Date,
    @Query('end') end: Date,
    @Query('orderBy') orderBy: 'receipt' | 'client',
    @Query('client') client?: number | undefined,
  ) {
    return this.receiptsService.minuta(start, end, orderBy, client);
  }

  @Get('report/xubio')
  async xubio(@Query('start') start: Date, @Query('end') end: Date) {
    return this.receiptsService.xubio(start, end);
  }

  @Post()
  @ApiOkResponse({ type: ReceiptDto })
  async create(@Body() createReceiptDto: CreateReceiptDto) {
    return this.receiptsService.create(createReceiptDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ReceiptDto })
  async update(
    @Param('id') id: string,
    @Body() updateReceiptDto: UpdateReceiptDto,
  ) {
    return this.receiptsService.update(+id, updateReceiptDto);
  }

  @Patch('description/:id')
  @ApiOkResponse({ type: ReceiptDto })
  async updateDescription(
    @Param('id') id: string,
    @Body() updateReceiptDescriptionDto: UpdateReceiptDescriptionDto,
  ) {
    return this.receiptsService.updateDescription(
      +id,
      updateReceiptDescriptionDto,
    );
  }

  @Patch('close/:id')
  @ApiOkResponse({ type: ReceiptDto })
  async close(@Param('id') id: string) {
    return this.receiptsService.close(+id);
  }

  @Patch('open/:id')
  @ApiOkResponse({ type: ReceiptDto })
  async open(@Param('id') id: string) {
    return this.receiptsService.open(+id);
  }

  @Patch('cancel/:id')
  @ApiOkResponse({ type: ReceiptDto })
  async cancel(@Param('id') id: string) {
    return this.receiptsService.cancel(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receiptsService.remove(+id);
  }
}
