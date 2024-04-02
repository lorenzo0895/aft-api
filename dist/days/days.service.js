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
exports.DaysService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cheque_entity_1 = require("../cheques/entities/cheque.entity");
const typeorm_2 = require("typeorm");
const day_entity_1 = require("./entities/day.entity");
let DaysService = class DaysService {
    constructor(dayRepository) {
        this.dayRepository = dayRepository;
    }
    async create(createDayDto) {
        const find = await this.dayRepository.findOneBy({ day: createDayDto.day });
        if (find)
            throw new common_1.BadRequestException('El día ya existente');
        const day = this.dayRepository.create(createDayDto);
        return await this.dayRepository.save(day);
    }
    async findAll(full, onlyActive) {
        if (!full) {
            const where = onlyActive ? { isActive: true } : undefined;
            return await this.dayRepository.find({
                where: where,
                order: { day: 'DESC' },
            });
        }
        return await this.dayRepository
            .createQueryBuilder('d')
            .select([
            'd.id as id',
            'd.day as day',
            'd.isActive as isActive',
            'IFNULL(COUNT(r.id), 0) as receiptsQuantity',
            '(IFNULL(SUM(r.cash), 0)+IFNULL(SUM(r.transferAmount), 0)+IFNULL(SUM(subQuery.total), 0)) as totalReceived',
            'd.totalAudited as totalAudited',
        ])
            .where(onlyActive ? 'd.isActive = TRUE' : '')
            .leftJoin('d.receipts', 'r', 'd.id = r.dayId AND r.isCancelled = FALSE')
            .leftJoin((subQuery) => {
            return subQuery
                .select('SUM(c.amount)', 'total')
                .addSelect('c.receiptId')
                .from(cheque_entity_1.Cheque, 'c')
                .groupBy('c.receiptId');
        }, 'subQuery', 'subQuery.receiptId = r.id')
            .groupBy('d.id')
            .orderBy('d.day', 'DESC')
            .take(1000)
            .getRawMany();
    }
    async findOne(id) {
        const day = await this.dayRepository.findOneBy({ id: id });
        if (!day)
            throw new common_1.NotFoundException('Día no encontrado');
        return day;
    }
    async update(id, updateDayDto) {
        const day = await this.dayRepository.findOneBy({ id: id });
        if (!day)
            throw new common_1.NotFoundException('Día no encontrado');
        await this.dayRepository.update(id, updateDayDto);
        const updatedDay = await this.dayRepository.findOneBy({ id: id });
        return updatedDay;
    }
    async close(id) {
        const day = await this.dayRepository.findOneBy({ id: id });
        if (!day)
            throw new common_1.NotFoundException('Día no encontrado');
        await this.dayRepository.update(id, { isActive: false });
        return await this.dayRepository.findOneBy({ id: id });
    }
    async open(id) {
        const day = await this.dayRepository.findOneBy({ id: id });
        if (!day)
            throw new common_1.NotFoundException('Día no encontrado');
        await this.dayRepository.update(id, { isActive: true });
        return await this.dayRepository.findOneBy({ id: id });
    }
    async remove(id) {
        const day = await this.dayRepository.delete({ id: id });
        if (day.affected == 0)
            throw new common_1.NotFoundException('Día no encontrado');
        return day;
    }
};
DaysService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(day_entity_1.Day)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DaysService);
exports.DaysService = DaysService;
//# sourceMappingURL=days.service.js.map