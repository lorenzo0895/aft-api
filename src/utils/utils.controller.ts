import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UtilsService } from './utils.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { GetVouchersInfoConfig } from '../billings/dto/get-last-vouchers.dto';

@Controller('utils')
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) {}

  @Post('sendWhatsappFile')
  async sendWhatsappFile(@Body() body: { number: string }) {
    return await this.utilsService.sendWhatsappFile(body);
  }

  @Post('liquidacionPrimariaGranos')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const path = `./tmp`;
          fs.mkdirSync(path, { recursive: true });
          return cb(null, path);
        },
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFiles(@UploadedFiles() files: any[]) {
    const paths = files.map((it: any) => it.path);
    const array = await this.utilsService.liqPrimGranos(paths);
    paths.forEach((path) => {
      // fs.unlink(path, () => {
      //   return { message: 'Archivo eliminado correctamente' };
      // });
    });
    return array;
  }
}
