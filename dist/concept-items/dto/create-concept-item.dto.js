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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateConceptItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const concept_item_dto_1 = require("./concept-item.dto");
class CreateConceptItemDto extends (0, swagger_1.OmitType)(concept_item_dto_1.ConceptItemDto, [
    'id',
    'isActive',
]) {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CreateConceptItemDto.prototype, "hasVat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateConceptItemDto.prototype, "aliquot", void 0);
exports.CreateConceptItemDto = CreateConceptItemDto;
//# sourceMappingURL=create-concept-item.dto.js.map