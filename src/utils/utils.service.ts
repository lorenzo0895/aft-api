import Afip from '@afipsdk/afip.js';
import ElectronicBilling from '@afipsdk/afip.js/types/Class/ElectronicBilling';
import { BadRequestException, Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { Client, LocalAuth } from 'whatsapp-web.js';
const AfipBuilder = require('@afipsdk/afip.js');

@Injectable()
export class UtilsService {
  private _isAuthenticated;
  private _qr: string;
  private wppClient: Client = new Client({
    authStrategy: new LocalAuth({ clientId: 'id-1' }),
  });

  constructor() {
    // this.wppClient.on('authenticated', () => {
    //   console.log('estoy autenticado');
    //   this._isAuthenticated = true;
    // });
    // this.wppClient.on('qr', (qr) => {
    //   this._qr = qr;
    //   console.log(qr);
    // });
    // this.wppClient.initialize();
  }

  // private async _generateQr(): Promise<string> {
  //   this.wppClient.destroy();
  //   // this.wppClient = new Client({
  //   //   authStrategy: new LocalAuth({ clientId: 'id-1' }),
  //   // });
  //   return new Promise((resolve, reject) => {
  //     this.wppClient = new Client({
  //       authStrategy: new LocalAuth({ clientId: 'id-1' }),
  //     });
  //     this.wppClient.on('qr', (qr) => resolve(qr));
  //     setTimeout(() => reject('Timeout'), 30000);
  //     this.wppClient.initialize();
  //   });
  // }

  async sendWhatsappFile(body: { number: string }) {
    if (!body || !body.number) {
      throw new BadRequestException('El número no puede ser nulo');
    }
    // if (!this._isAuthenticated) {
    //   return { qr: this._qr };
    // }
    await this.wppClient.sendMessage(body.number + '@c.us', 'Hola');
    return { status: 'ok' };
  }

  async liqPrimGranos(pdfs: string[]) {
    console.log(pdfs);
    const script = spawn('python', [
      './assets/python/liqPrimGranos.py',
      ...pdfs,
    ]);
    script.on('error', (error) => {
      console.error(`Error al ejecutar el script en python: ${error.message}`);
    });
    let result = '';
    for await (const chunk of script.stdout) {
      result += chunk;
    }
    result = result.replace(/'/g, '"');
    return JSON.parse(result);
  }

  async getLastInvoices(taxId: number) {
    const afip: Afip = new AfipBuilder({
      CUIT: 20389781542,
      production: false,
    });
    // const punto_de_venta = 1;
    // const tipo_de_factura = 11;
    // const taxId = await afip.RegisterScopeThirteen.getTaxIDByDocument(38978154);
    // const a = await afip.RegisterScopeThirteen.getTaxpayerDetails(20389781542);
    // return { a };
    return {
      a: await afip.RegisterScopeThirteen.getTaxpayerDetails(taxId),
    };
    // console.log(a);
    // return afip.ElectronicBilling.getVoucherInfo(
    //   3,
    //   punto_de_venta,
    //   tipo_de_factura,
    // );
  }

  async createInvoice() {
    const afip = new Afip({ CUIT: 20389781542, production: false });
    const punto_de_venta = 1;
    const tipo_de_factura = 11;
    const last_voucher = await afip.ElectronicBilling.getLastVoucher(
      punto_de_venta,
      tipo_de_factura,
    );

    /**
     * Concepto de la factura
     *
     * Opciones:
     *
     * 1 = Productos
     * 2 = Servicios
     * 3 = Productos y Servicios
     **/
    const concepto = 1;

    /**
     * Tipo de documento del comprador
     *
     * Opciones:
     *
     * 80 = CUIT
     * 86 = CUIL
     * 96 = DNI
     * 99 = Consumidor Final
     **/
    const tipo_de_documento = 80;

    /**
     * Numero de documento del comprador (0 para consumidor final)
     **/
    const numero_de_documento = 33693450239;

    /**
     * Numero de factura
     **/
    const numero_de_factura = last_voucher + 1;

    /**
     * Fecha de la factura en formato aaaa-mm-dd (hasta 10 dias antes y 10 dias despues)
     **/
    const fecha = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];

    /**
     * Importe de la Factura
     **/
    const importe_total = 100;

    /**
     * Los siguientes campos solo son obligatorios para los conceptos 2 y 3
     **/

    const fecha_servicio_desde = null,
      fecha_servicio_hasta = null,
      fecha_vencimiento_pago = null;

    // if (concepto === 2 || concepto === 3) {
    //   /**
    //    * Fecha de inicio de servicio en formato aaaammdd
    //    **/
    //   const fecha_servicio_desde = 20191213;

    //   /**
    //    * Fecha de fin de servicio en formato aaaammdd
    //    **/
    //   const fecha_servicio_hasta = 20191213;

    //   /**
    //    * Fecha de vencimiento del pago en formato aaaammdd
    //    **/
    //   const fecha_vencimiento_pago = 20191213;
    // }

    const data = {
      CantReg: 1, // Cantidad de facturas a registrar
      PtoVta: punto_de_venta,
      CbteTipo: tipo_de_factura,
      Concepto: concepto,
      DocTipo: tipo_de_documento,
      DocNro: numero_de_documento,
      CbteDesde: numero_de_factura,
      CbteHasta: numero_de_factura,
      CbteFch: parseInt(fecha.replace(/-/g, '')),
      FchServDesde: fecha_servicio_desde,
      FchServHasta: fecha_servicio_hasta,
      FchVtoPago: fecha_vencimiento_pago,
      ImpTotal: importe_total,
      ImpTotConc: 0, // Importe neto no gravado
      ImpNeto: importe_total,
      ImpOpEx: 0,
      ImpIVA: 0,
      ImpTrib: 0, //Importe total de tributos
      MonId: 'PES', //Tipo de moneda usada en la factura ('PES' = pesos argentinos)
      MonCotiz: 1, // Cotización de la moneda usada (1 para pesos argentinos)
    };

    /**
     * Creamos la Factura
     **/
    const res = await afip.ElectronicBilling.createVoucher(data);

    /**
     * Mostramos por pantalla los datos de la nueva Factura
     **/
    return res;
  }
}
