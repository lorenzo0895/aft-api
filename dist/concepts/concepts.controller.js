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
exports.ConceptsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const concepts_service_1 = require("./concepts.service");
const concept_dto_1 = require("./dto/concept.dto");
const create_concept_dto_1 = require("./dto/create-concept.dto");
const update_concept_dto_1 = require("./dto/update-concept.dto");
let ConceptsController = class ConceptsController {
    constructor(conceptsService) {
        this.conceptsService = conceptsService;
    }
    create(createConceptDto) {
        return this.conceptsService.create(createConceptDto);
    }
    findAll() {
        return this.conceptsService.findAll();
    }
    findOne(id) {
        return this.conceptsService.findOne(+id);
    }
    update(id, updateConceptDto) {
        return this.conceptsService.update(+id, updateConceptDto);
    }
    remove(id) {
        return this.conceptsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOkResponse)({ type: concept_dto_1.ConceptDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_concept_dto_1.CreateConceptDto]),
    __metadata("design:returntype", void 0)
], ConceptsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: concept_dto_1.ConceptDto, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConceptsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: concept_dto_1.ConceptDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConceptsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: concept_dto_1.ConceptDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_concept_dto_1.UpdateConceptDto]),
    __metadata("design:returntype", void 0)
], ConceptsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConceptsController.prototype, "remove", null);
ConceptsController = __decorate([
    (0, common_1.Controller)('concepts'),
    (0, swagger_1.ApiTags)('concepts'),
    __metadata("design:paramtypes", [concepts_service_1.ConceptsService])
], ConceptsController);
exports.ConceptsController = ConceptsController;
//# sourceMappingURL=concepts.controller.js.map