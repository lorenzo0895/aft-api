const path = require('path');
import { BadRequestException, Injectable } from '@nestjs/common';
import { Client, LocalAuth } from 'whatsapp-web.js';
import { spawn } from 'child_process';

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

}

