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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const client_entity_1 = require("./entities/client.entity");
let ClientsService = class ClientsService {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async create(createClientDto) {
        if (!createClientDto.name) {
            throw new common_1.BadRequestException('El nombre no puede ser nulo');
        }
        if (!createClientDto.cuit) {
            throw new common_1.BadRequestException('El CUIT no puede ser nulo');
        }
        const cuitRepeated = await this.clientRepository.findOneBy({
            cuit: createClientDto.cuit,
        });
        if (cuitRepeated) {
            throw new common_1.BadRequestException('CUIT repetido');
        }
        const client = this.clientRepository.create(createClientDto);
        return await this.clientRepository.save(client);
    }
    async findAll() {
        return this.clientRepository
            .createQueryBuilder('c')
            .select([
            'c.name as name',
            'c.surname as surname',
            'c.isActive as isActive',
            'c.cuit as cuit',
            'c.location as location',
            'c.id as id',
            'c.phone as phone',
            'c.fiscalCondition as fiscalCondition',
        ])
            .orderBy('CONCAT(IFNULL(c.surname, "ZZZ"), c.name)', 'ASC')
            .getRawMany();
    }
    async findOne(id) {
        const client = await this.clientRepository.findOneBy({ id: id });
        if (!client) {
            throw new common_1.NotFoundException('Client no encontrado');
        }
        return client;
    }
    async update(id, updateClientDto) {
        const client = await this.clientRepository.findOneBy({ id: id });
        if (!client) {
            throw new common_1.NotFoundException('Client no encontrado');
        }
        if (!updateClientDto.name) {
            throw new common_1.BadRequestException('El nombre no puede ser nulo');
        }
        if (!updateClientDto.cuit) {
            throw new common_1.BadRequestException('El CUIT no puede ser nulo');
        }
        const cuitRepeated = await this.clientRepository.findOneBy({
            cuit: updateClientDto.cuit,
        });
        if (cuitRepeated && client.id !== cuitRepeated.id) {
            throw new common_1.BadRequestException('CUIT repetido');
        }
        this.clientRepository.update(id, updateClientDto);
        const updatedClient = await this.clientRepository.findOneBy({ id: id });
        return updatedClient;
    }
    async remove(id) {
        const client = await this.clientRepository.delete({ id: id });
        if (client.affected == 0) {
            throw new common_1.NotFoundException('Client no encontrado');
        }
        return client;
    }
};
ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClientsService);
exports.ClientsService = ClientsService;
//# sourceMappingURL=clients.service.js.map