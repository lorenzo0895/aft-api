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
exports.ConceptItemService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const concept_entity_1 = require("./entities/concept.entity");
const concept_entity_2 = require("../concepts/entities/concept.entity");
let ConceptItemService = class ConceptItemService {
    constructor(conceptItemRepository, conceptRepository) {
        this.conceptItemRepository = conceptItemRepository;
        this.conceptRepository = conceptRepository;
    }
    async findAll(start, end, client, take) {
        let whereString = '';
        if (start)
            whereString += 'd.day >= :start AND d.day <= :end';
        if (start && client)
            whereString += ' AND client.id = :client';
        if (!start && client)
            whereString += 'client.id = :client';
        return await this.conceptItemRepository
            .createQueryBuilder('ci')
            .select([
            'ci.id',
            'ci.amount',
            'ci.description',
            'ci.isActive',
            'c.value',
            'r.id',
            'r.number',
            'r.description',
            'client.name',
            'client.surname',
            'd.day',
        ])
            .leftJoin('ci.concept', 'c')
            .leftJoin('ci.receipt', 'r')
            .leftJoin('r.day', 'd')
            .leftJoin('r.client', 'client')
            .where(whereString, {
            start: start,
            end: end,
            client: client,
        })
            .take(take)
            .orderBy('d.day', 'DESC')
            .getMany();
    }
    async findOne(id) {
        const conceptList = await this.conceptItemRepository.findOneBy({ id: id });
        if (!conceptList) {
            throw new common_1.NotFoundException('Neto no encontrado');
        }
        return conceptList;
    }
    async create(body) {
        var _a;
        const { hasVat, aliquot } = body, rest = __rest(body, ["hasVat", "aliquot"]);
        const concepts = await this.conceptRepository.find();
        const concept = this.conceptItemRepository.create(rest);
        const createdConcept = Object.assign(Object.assign({}, (await this.conceptItemRepository.save(concept))), { concept: concepts.find((it) => it.id === body.concept) });
        if (!body.hasVat)
            return [createdConcept];
        const fiscalDebit = this.conceptItemRepository.create({
            amount: Math.round(body.amount * body.aliquot) / 100,
            concept: 6,
            description: 'DF - ' + ((_a = body.description) !== null && _a !== void 0 ? _a : ''),
            receipt: body.receipt,
        });
        const createdFiscalDebit = Object.assign(Object.assign({}, (await this.conceptItemRepository.save(fiscalDebit))), { concept: concepts.find((it) => it.id === 6) });
        return [createdConcept, createdFiscalDebit];
    }
    async update(id, updateConceptDto) {
        const conceptItem = await this.conceptItemRepository.findOneBy({ id: id });
        if (!conceptItem)
            throw new common_1.NotFoundException('Neto no encontrado');
        await this.conceptItemRepository.update(id, updateConceptDto);
        const updatedConceptItem = await this.conceptItemRepository.findOneBy({
            id: id,
        });
        const concept = await this.conceptRepository.findOneBy({
            id: updateConceptDto.concept,
        });
        return Object.assign(Object.assign({}, updatedConceptItem), { concept: concept });
    }
    async close(id) {
        const conceptItem = await this.findOne(id);
        if (!conceptItem)
            throw new common_1.NotFoundException('Neto no encontrado');
        await this.conceptItemRepository.update(id, { isActive: false });
        return await this.findOne(id);
    }
    async open(id) {
        const conceptItem = await this.findOne(id);
        if (!conceptItem)
            throw new common_1.NotFoundException('Neto no encontrado');
        await this.conceptItemRepository.update(id, { isActive: true });
        return await this.findOne(id);
    }
    async remove(id) {
        const result = await this.conceptItemRepository.delete({ id: id });
        if (result.affected == 0) {
            throw new common_1.NotFoundException('Neto no encontrado');
        }
        return result;
    }
};
ConceptItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(concept_entity_1.ConceptItem)),
    __param(1, (0, typeorm_1.InjectRepository)(concept_entity_2.Concept)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ConceptItemService);
exports.ConceptItemService = ConceptItemService;
//# sourceMappingURL=concept-items.service.js.map