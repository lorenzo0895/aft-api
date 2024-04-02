import { GeneralConfigsService } from './general-configs.service';
import { UpdateGeneralConfigDto } from './dto/update-general-config.dto';
export declare class GeneralConfigsController {
    private readonly generalConfigsService;
    constructor(generalConfigsService: GeneralConfigsService);
    findAll(): Promise<import("./entities/general-config.entity").GeneralConfig[]>;
    findOne(key: string): Promise<import("./entities/general-config.entity").GeneralConfig>;
    update(body: {
        generalConfigs: UpdateGeneralConfigDto[];
    }): Promise<{
        success: boolean;
    }>;
}
