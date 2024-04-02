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
exports.ConceptsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const concept_entity_1 = require("./entities/concept.entity");
let ConceptsService = class ConceptsService {
    constructor(conceptRepository) {
        this.conceptRepository = conceptRepository;
    }
    async findAll() {
        return await this.conceptRepository.find();
    }
    async findOne(id) {
        const concept = await this.conceptRepository.findOneBy({ id: id });
        if (!concept) {
            throw new common_1.NotFoundException('Concept is not found');
        }
        return concept;
    }
    async create(createConceptDto) {
        const concept = this.conceptRepository.create(createConceptDto);
        return await this.conceptRepository.save(concept);
    }
    async update(id, updateConceptDto) {
        const concept = await this.conceptRepository.findOneBy({ id: id });
        if (!concept) {
            throw new common_1.NotFoundException('Concept is not found');
        }
        this.conceptRepository.update(id, updateConceptDto);
        const updatedConcept = await this.conceptRepository.findOneBy({ id: id });
        return updatedConcept;
    }
    async remove(id) {
        const result = await this.conceptRepository.delete({ id: id });
        if (result.affected == 0) {
            throw new common_1.NotFoundException('Concept is not found');
        }
        return result;
    }
};
ConceptsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(concept_entity_1.Concept)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ConceptsService);
exports.ConceptsService = ConceptsService;
//# sourceMappingURL=concepts.service.js.map