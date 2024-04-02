import { UtilsService } from './utils.service';
export declare class UtilsController {
    private readonly utilsService;
    constructor(utilsService: UtilsService);
    sendWhatsappFile(body: {
        number: string;
    }): Promise<{
        status: string;
    }>;
    uploadFiles(files: any[]): Promise<any>;
}
