import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Billing } from "./entities/billing.entity";
import {
  GetVouchersInfoConfig,
  GetVouchersInfoConfigInternal,
} from "./dto/get-last-vouchers.dto";
import { ImportVouchers } from "./dto/create-billing.dto";
import { GenerateCae, GenerateCaeGroup } from "./dto/generate-cae.dto";
import { join } from "path";
import { GeneralConfigsService } from "src/general-configs/general-configs.service";
const Afip = require("@afipsdk/afip.js");

@Injectable()
export class BillingsService {
  constructor(
    @InjectRepository(Billing) private billingRepository: Repository<Billing>,
    private generalConfigsService: GeneralConfigsService,
    private dataSource: DataSource,
  ) {}

  async generateAfipObject(): Promise<any> {
    const cuit = await this.generalConfigsService.findOne('cuit');
    if (!cuit) throw new NotFoundException();
    try {
      return new Afip({
        CUIT: cuit.value,
        cert: join(__dirname, "assets", "afip-certs", "cert"),
        key: join(__dirname, "assets", "afip-certs", "key"),
        production: false,
      });
    } catch (error) {
      throw new BadRequestException('Los certificados de AFIP son inválidos');
    }
  }

  async create(createBillingDto: ImportVouchers) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const createdVouchers = [];
      for (const voucher of createBillingDto.vouchers) {
        const newVoucher = queryRunner.manager.create(Billing, voucher);
        const a = await queryRunner.manager.save(newVoucher);
        createdVouchers.push(a);
      }
      await queryRunner.commitTransaction();
      return createdVouchers;
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

  async generateCAE(createBillingDto: GenerateCaeGroup) {
    const result = {
      success: {},
      error: {},
    };
    for (const voucher of createBillingDto.vouchers) {
      try {
        const a = await this._createVoucher(voucher);
        result.success[voucher.id] = a;
        await this.billingRepository.delete({ id: voucher.id });
      } catch (err) {
        result.error[voucher.id] = err.message;
      }
    }
    return result;
  }

  async findBySalePoint(salePoint: number): Promise<Billing[]> {
    return await this.billingRepository.findBy({ salePoint });
  }

  async getLastInvoices(config: GetVouchersInfoConfig) {
    const afip = await this.generateAfipObject();
    try {
      const last = await afip.ElectronicBilling.getLastVoucher(config.salePoint, 1);
      return await this._getVouchersInfo({
        salePoint: config.salePoint,
        type: 1,
        to: last,
        limit: config.limit,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async _getVouchersInfo(config: GetVouchersInfoConfigInternal) {
    const array = [];
    const limitFrom = config.to - config.limit + 1;
    const from = 1 < limitFrom ? limitFrom : 1;
    for (let i = from; i <= config.to; i++) {
      try {
        array.push(
          await this._getVoucherInfo(i, config.salePoint, config.type)
        );
      } catch (error) {}
    }
    return array;
  }

  private async _getVoucherInfo(
    voucherNumber: number,
    salePoint: number,
    type: number
  ) {
    const afip = await this.generateAfipObject();
    return await afip.ElectronicBilling.getVoucherInfo(
      voucherNumber,
      salePoint,
      type
    );
  }

  private async _createVoucher(generateCae: GenerateCae) {
    const salePoint = 2;
    const voucherType = 1;
    const afip = await this.generateAfipObject();
    const last = await afip.ElectronicBilling.getLastVoucher(
      salePoint,
      voucherType
    );

    /**
     * Numero de factura
     **/
    const number = (last ?? 0) + 1;

    /**
     * Fecha de la factura en formato aaaa-mm-dd (hasta 10 dias antes y 10 dias despues)
     **/
    const date = generateCae.date.replace(/-/g, '');
    const fechaServicioDesde = generateCae.dateFrom.replace(/-/g, '');
    const fechaServicioHasta = generateCae.dateTo.replace(/-/g, '');
    const fechaVencimientoPago = generateCae.datePayment.replace(/-/g, '');

    const data = {
      CantReg: 1, // Cantidad de facturas a registrar
      PtoVta: salePoint,
      CbteTipo: 1, // Factura A
      Concepto: 2, // Servicio
      DocTipo: 80, // CUIT
      DocNro: generateCae.cuit,
      CbteDesde: number,
      CbteHasta: number,
      CbteFch: date,
      FchServDesde: fechaServicioDesde,
      FchServHasta: fechaServicioHasta,
      FchVtoPago: fechaVencimientoPago,
      ImpTotal: generateCae.net + generateCae.vat,
      ImpTotConc: 0, // Importe neto no gravado
      ImpNeto: generateCae.net,
      ImpOpEx: 0,
      ImpIVA: generateCae.vat,
      ImpTrib: 0, //Importe otros de tributos
      MonId: "PES", //Tipo de moneda usada en la factura ('PES' = pesos argentinos)
      MonCotiz: 1, // Cotización de la moneda usada (1 para pesos argentinos)
      Iva: [
        {
          Id: 5,
          BaseImp: generateCae.net,
          Importe: generateCae.vat,
        }
      ],
    };

    const res = await afip.ElectronicBilling.createVoucher(data);
    return res;
  }

  async remove(ids: number[]) {
    const result = {
      success: [],
      error: [],
    }
    for (const id of ids) {
      try {
        const day = await this.billingRepository.delete({ id: id });
        if (day.affected === 0) throw new Error('Factura no encontrada')
        result.success.push(id);
      } catch (error) {
        result.error.push(id);
      }
    }
    return result;
  }
}
