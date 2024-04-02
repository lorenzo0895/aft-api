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
exports.ConceptItem = void 0;
const concept_entity_1 = require("../../concepts/entities/concept.entity");
const receipt_entity_1 = require("../../receipts/entities/receipt.entity");
const parseFloat_1 = require("../../shared/constants/parseFloat");
const typeorm_1 = require("typeorm");
let ConceptItem = class ConceptItem {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ConceptItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => concept_entity_1.Concept, (concept) => concept.conceptItems, {
        eager: true,
    }),
    __metadata("design:type", concept_entity_1.Concept)
], ConceptItem.prototype, "concept", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => receipt_entity_1.Receipt, (receipt) => receipt.conceptItems),
    __metadata("design:type", receipt_entity_1.Receipt)
], ConceptItem.prototype, "receipt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 14,
        scale: 2,
        transformer: parseFloat_1.floatParser,
    }),
    __metadata("design:type", Number)
], ConceptItem.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ConceptItem.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ConceptItem.prototype, "isActive", void 0);
ConceptItem = __decorate([
    (0, typeorm_1.Entity)()
], ConceptItem);
exports.ConceptItem = ConceptItem;
//# sourceMappingURL=concept.entity.js.map