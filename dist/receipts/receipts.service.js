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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cheque_entity_1 = require("../cheques/entities/cheque.entity");
const typeorm_2 = require("typeorm");
const receipt_entity_1 = require("./entities/receipt.entity");
const concept_entity_1 = require("../concept-items/entities/concept.entity");
let ReceiptsService = class ReceiptsService {
    constructor(receiptRepository, conceptItemRepository, dataSource) {
        this.receiptRepository = receiptRepository;
        this.conceptItemRepository = conceptItemRepository;
        this.dataSource = dataSource;
    }
    async findLast() {
        return await this.receiptRepository
            .createQueryBuilder('r')
            .orderBy('r.number', 'DESC')
            .take(1)
            .getOne();
    }
    async create(body) {
        var _a;
        const { cheques } = body, rest = __rest(body, ["cheques"]);
        const total = body.cash +
            body.transferAmount +
            body.cheques.reduce((acc, curr) => {
                return acc + curr.amount;
            }, 0);
        if (total <= 0) {
            throw new common_1.BadRequestException('El importe total debe ser mayor a cero');
        }
        const lastReceipt = await this.findLast();
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const newReceipt = queryRunner.manager.create(receipt_entity_1.Receipt, Object.assign(Object.assign({}, rest), { number: ((_a = lastReceipt === null || lastReceipt === void 0 ? void 0 : lastReceipt.number) !== null && _a !== void 0 ? _a : 0) + 1 }));
            const createdReceipt = await queryRunner.manager.save(newReceipt);
            for (const cheque of cheques) {
                const createdCheque = queryRunner.manager.create(cheque_entity_1.Cheque, Object.assign(Object.assign({}, cheque), { receipt: createdReceipt }));
                await queryRunner.manager.save(cheque_entity_1.Cheque, createdCheque);
            }
            await queryRunner.commitTransaction();
            return await this.findOne(createdReceipt.id);
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            if (err instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException(err.message);
            }
            else {
                throw new common_1.BadRequestException('Algo falló');
            }
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll(start, end, client, take) {
        let whereString = '';
        if (start)
            whereString += 'd.day >= :start AND d.day <= :end';
        if (start && client)
            whereString += ' AND c.id = :client';
        if (!start && client)
            whereString += 'c.id = :client';
        return await this.receiptRepository
            .createQueryBuilder('r')
            .leftJoinAndSelect('r.day', 'd')
            .leftJoinAndSelect('r.cancelReceipt', 'cr')
            .leftJoinAndSelect('r.client', 'c')
            .leftJoinAndSelect('r.cheques', 'ch')
            .leftJoinAndSelect('r.cancelCheques', 'ch2')
            .where(whereString, {
            start: start,
            end: end,
            client: client,
        })
            .orderBy('r.number', 'DESC')
            .take(take)
            .getMany();
    }
    async findOne(id) {
        const receipt = await this.receiptRepository
            .createQueryBuilder('r')
            .where('r.id = :id', { id: id })
            .leftJoinAndSelect('r.cancelReceipt', 'cr')
            .leftJoinAndSelect('r.cheques', 'ch')
            .leftJoinAndSelect('r.cancelCheques', 'ch2')
            .leftJoinAndSelect('r.day', 'd')
            .leftJoinAndSelect('r.client', 'c')
            .leftJoinAndSelect('r.conceptItems', 'ci')
            .leftJoinAndSelect('ci.concept', 'concept')
            .getOne();
        if (!receipt) {
            throw new common_1.NotFoundException('Recibo no encontrado');
        }
        const cancelledBy = await this.receiptRepository.findOneBy({
            cancelReceipt: receipt,
        });
        return Object.assign(Object.assign({}, receipt), { cancelledBy });
    }
    async minuta(start, end, orderBy, client) {
        const filterByClient = client ? ' AND r.client = :client' : '';
        return await this.receiptRepository
            .createQueryBuilder('r')
            .select([
            'r.id',
            'r.number',
            'r.cash',
            'r.transferAmount',
            'r.description',
        ])
            .leftJoinAndSelect('r.conceptItems', 'ci')
            .leftJoin('r.day', 'd')
            .leftJoin('r.client', 'client')
            .leftJoin('ci.concept', 'c')
            .leftJoinAndSelect('r.cheques', 'ch1')
            .leftJoinAndSelect('r.cancelCheques', 'ch2')
            .leftJoinAndSelect('r.cancelReceipt', 'cr')
            .addSelect([
            'c.id',
            'c.description',
            'client.name',
            'client.surname',
            'd.day',
        ])
            .andWhere('d.day >= :start AND d.day <= :end' + filterByClient, {
            start: start,
            end: end,
            client: client,
        })
            .orderBy(orderBy === 'client' ? 'client.surname' : 'r.number', 'ASC')
            .getMany();
    }
    async xubio(start, end) {
        const array = await this.conceptItemRepository
            .createQueryBuilder('ci')
            .select([
            'r.number as number',
            'r.id as id',
            'r.isActive as isActive',
            'r.isCancelled as isCancelled',
            'ROUND(SUM(ci.amount), 2) as amount',
            'cl.name as name',
            'cl.surname as surname',
            'cl.cuit as cuit',
            'd.day as day',
            'cl.name as clientName',
            'cl.surname as clientSurname',
        ])
            .leftJoin('ci.receipt', 'r')
            .leftJoin('r.client', 'cl')
            .leftJoin('ci.concept', 'c')
            .leftJoin('r.day', 'd')
            .where('c.id = 6')
            .groupBy('r.number')
            .andWhere('d.day >= :start AND d.day <= :end', {
            start: start,
            end: end,
        })
            .getRawMany();
        array.forEach((a) => {
            a.isActive = Boolean(a.isActive);
            a.isCancelled = Boolean(a.isCancelled);
            a.amount = Number(a.amount);
        });
        return array;
    }
    async update(id, updateReceiptDto) {
        const receipt = await this.receiptRepository.findOneBy({ id: id });
        if (!receipt) {
            throw new common_1.NotFoundException('Recibo no encontrado');
        }
        this.receiptRepository.update(id, updateReceiptDto);
        const updatedReceipt = await this.receiptRepository.findOneBy({ id: id });
        return updatedReceipt;
    }
    async updateDescription(id, updateReceiptDescription) {
        const receipt = await this.receiptRepository.findOneBy({ id: id });
        if (!receipt) {
            throw new common_1.NotFoundException('Recibo no encontrado');
        }
        this.receiptRepository.update(id, {
            description: updateReceiptDescription.description,
        });
        const updatedReceipt = await this.receiptRepository.findOneBy({ id: id });
        return updatedReceipt;
    }
    async remove(id) {
        const receipt = await this.receiptRepository.delete({ id: id });
        if (receipt.affected == 0) {
            throw new common_1.NotFoundException('Recibo no encontrado');
        }
        return receipt;
    }
    async close(id) {
        const receipt = await this.findOne(id);
        const totalAmount = receipt.cash +
            receipt.transferAmount +
            receipt.cheques.reduce((acc, curr) => {
                return Math.round((acc + curr.amount) * 100) / 100;
            }, 0);
        const totalConcepts = receipt.conceptItems.reduce((acc, curr) => {
            return Math.round((acc + curr.amount) * 100) / 100;
        }, 0);
        if (totalAmount !== totalConcepts) {
            throw new common_1.BadRequestException('El monto a computar debe ser igual a 0');
        }
        this.receiptRepository.update(id, { isActive: false });
        return await this.findOne(id);
    }
    async open(id) {
        const receipt = await this.findOne(id);
        if (!receipt) {
            throw new common_1.NotFoundException('Recibo no encontrado');
        }
        if (receipt.isCancelled) {
            throw new common_1.NotFoundException('No pueden reabrirse recibos cancelados');
        }
        await this.receiptRepository.update(id, {
            isActive: true,
        });
        return await this.findOne(id);
    }
    async cancel(id) {
        const receipt = await this.receiptRepository.findOne({
            where: { id },
            relations: ['day'],
        });
        if (!receipt) {
            throw new common_1.NotFoundException('Recibo no encontrado');
        }
        if (!receipt.day.isActive) {
            let day = receipt.day.day;
            day = day.slice(8, 10) + '/' + day.slice(5, 7) + '/' + day.slice(0, 4);
            throw new common_1.BadRequestException(`El día ${day} está cerrado`);
        }
        if (receipt.conceptItems.length !== 0) {
            throw new common_1.BadRequestException('El recibo no debe tener netos relacionados');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.update(receipt_entity_1.Receipt, id, {
                isActive: false,
                isCancelled: true,
            });
            const lastReceipt = await this.receiptRepository
                .createQueryBuilder('r')
                .orderBy('r.number', 'DESC')
                .take(1)
                .getOne();
            const newReceipt = queryRunner.manager.create(receipt_entity_1.Receipt, {
                cash: receipt.cash,
                transferAmount: receipt.transferAmount,
                description: `Cancela ${receipt.number}`,
                day: receipt.day,
                number: lastReceipt.number + 1,
                client: receipt.client,
                cancelReceipt: receipt,
                isActive: false,
                isCancelled: true,
            });
            const createdReceipt = await queryRunner.manager.save(newReceipt);
            if (receipt.cheques) {
                for (const cheque of receipt.cheques) {
                    await queryRunner.manager.update(cheque_entity_1.Cheque, cheque, {
                        cancelReceipt: createdReceipt,
                    });
                }
            }
            await queryRunner.commitTransaction();
            return await this.findOne(createdReceipt.id);
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            if (err instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException(err.message);
            }
            else {
                throw new common_1.BadRequestException('Algo falló');
            }
        }
        finally {
            await queryRunner.release();
        }
    }
};
ReceiptsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(receipt_entity_1.Receipt)),
    __param(1, (0, typeorm_1.InjectRepository)(concept_entity_1.ConceptItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], ReceiptsService);
exports.ReceiptsService = ReceiptsService;
//# sourceMappingURL=receipts.service.js.map