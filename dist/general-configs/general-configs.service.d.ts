import { UpdateGeneralConfigDto } from './dto/update-general-config.dto';
import { DataSource, Repository } from 'typeorm';
import { GeneralConfig } from './entities/general-config.entity';
import { CreateGeneralConfigDto } from './dto/create-general-config.dto';
export declare class GeneralConfigsService {
    private generalConfigRepository;
    private dataSource;
    constructor(generalConfigRepository: Repository<GeneralConfig>, dataSource: DataSource);
    setInitialConfig(): void;
    create(createGeneralConfigDto: CreateGeneralConfigDto): Promise<GeneralConfig>;
    findAll(): Promise<GeneralConfig[]>;
    findOne(key: string): Promise<GeneralConfig>;
    update(generalConfigs: UpdateGeneralConfigDto[]): Promise<{
        success: boolean;
    }>;
}
