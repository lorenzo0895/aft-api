import { Controller, Post, Body, Get, Delete, Param, Query } from '@nestjs/common';
import { BillingsService } from './billings.service';
import { GetVouchersInfoConfig } from './dto/get-last-vouchers.dto';
import { ImportVouchers } from './dto/create-billing.dto';
import { GenerateCaeGroup } from './dto/generate-cae.dto';

@Controller('billings')
export class BillingsController {
  constructor(private readonly billingsService: BillingsService) {}

  @Get()
  async findBySalePoint(@Query('salePoint') salePoint: number) {
    return await this.billingsService.findBySalePoint(+salePoint);
  }

  @Post()
  async create(@Body() createBillingDto: ImportVouchers) {
    return await this.billingsService.create(createBillingDto);
  }

  @Post('generate-cae')
  async generateCAE(@Body() createBillingDto: GenerateCaeGroup) {
    return await this.billingsService.generateCAE(createBillingDto);
  }

  // @Post('createInvoice')
  // async createInvoice() {
  //   return await this.billingsService.createInvoice();
  // }

  @Post('getInvoices')
  async getInvoices(@Body() body: GetVouchersInfoConfig) {
    return await this.billingsService.getLastInvoices(body);
  }

  // @Post('import')
  // async import(@Body() body: ImportVouchers) {
  //   return await this.billingsService.import(body);
  // }

  @Delete()
  async remove(@Body() body: { ids: number[] }) {
    return await this.billingsService.remove(body.ids);
  }
}
