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
exports.ConceptItemController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const concept_items_service_1 = require("./concept-items.service");
const concept_item_dto_1 = require("./dto/concept-item.dto");
const create_concept_item_dto_1 = require("./dto/create-concept-item.dto");
const update_concept_item_dto_1 = require("./dto/update-concept-item.dto");
let ConceptItemController = class ConceptItemController {
    constructor(conceptsService) {
        this.conceptsService = conceptsService;
    }
    create(createConceptDto) {
        return this.conceptsService.create(createConceptDto);
    }
    findAll(start, end, client, take) {
        return this.conceptsService.findAll(start, end, client, take);
    }
    findOne(id) {
        return this.conceptsService.findOne(+id);
    }
    update(id, updateConceptDto) {
        return this.conceptsService.update(+id, updateConceptDto);
    }
    close(id) {
        return this.conceptsService.close(+id);
    }
    open(id) {
        return this.conceptsService.open(+id);
    }
    remove(id) {
        return this.conceptsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOkResponse)({ type: concept_item_dto_1.ConceptItemDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_concept_item_dto_1.CreateConceptItemDto]),
    __metadata("design:returntype", void 0)
], ConceptItemController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: concept_item_dto_1.ConceptItemDto, isArray: true }),
    __param(0, (0, common_1.Query)('start')),
    __param(1, (0, common_1.Query)('end')),
    __param(2, (0, common_1.Query)('client')),
    __param(3, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date,
        Date, Number, Number]),
    __metadata("design:returntype", void 0)
], ConceptItemController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: concept_item_dto_1.ConceptItemDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConceptItemController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: concept_item_dto_1.ConceptItemDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_concept_item_dto_1.UpdateConceptItemDto]),
    __metadata("design:returntype", void 0)
], ConceptItemController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('close/:id'),
    (0, swagger_1.ApiOkResponse)({ type: concept_item_dto_1.ConceptItemDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConceptItemController.prototype, "close", null);
__decorate([
    (0, common_1.Patch)('open/:id'),
    (0, swagger_1.ApiOkResponse)({ type: concept_item_dto_1.ConceptItemDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConceptItemController.prototype, "open", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConceptItemController.prototype, "remove", null);
ConceptItemController = __decorate([
    (0, common_1.Controller)('concept-items'),
    (0, swagger_1.ApiTags)('concept-items'),
    __metadata("design:paramtypes", [concept_items_service_1.ConceptItemService])
], ConceptItemController);
exports.ConceptItemController = ConceptItemController;
//# sourceMappingURL=concept-items.controller.js.map