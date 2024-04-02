"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralConfigsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const general_config_entity_1 = require("./entities/general-config.entity");
const typeorm_2 = require("@nestjs/typeorm");
let GeneralConfigsService = class GeneralConfigsService {
    constructor(generalConfigRepository, dataSource) {
        this.generalConfigRepository = generalConfigRepository;
        this.dataSource = dataSource;
    }
    setInitialConfig() {
        const array = [
            { key: 'cuit', value: '11111111111' }
        ];
        array.forEach(async (element) => {
            const existing = await this.findOne(element.key);
            const config = this.generalConfigRepository.create(element);
            await this.generalConfigRepository.save(config);
        });
    }
    async create(createGeneralConfigDto) {
        const concept = this.generalConfigRepository.create(createGeneralConfigDto);
        return await this.generalConfigRepository.save(concept);
    }
    async findAll() {
        return await this.generalConfigRepository.find();
    }
    async findOne(key) {
        return await this.generalConfigRepository.findOneBy({ key });
    }
    async update(generalConfigs) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            for (const generalConfig of generalConfigs) {
                const updatedGeneralConfig = queryRunner.manager.update(general_config_entity_1.GeneralConfig, { key: generalConfig.key }, generalConfig);
            }
            await queryRunner.commitTransaction();
            return { success: true };
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            if (err instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException(err.message);
            }
            else {
                throw new common_1.BadRequestException("Algo falló");
            }
        }
        finally {
            await queryRunner.release();
        }
    }
};
GeneralConfigsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(general_config_entity_1.GeneralConfig)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.DataSource])
], GeneralConfigsService);
exports.GeneralConfigsService = GeneralConfigsService;
//# sourceMappingURL=general-configs.service.js.map