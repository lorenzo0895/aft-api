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
exports.Concept = void 0;
const concept_entity_1 = require("../../concept-items/entities/concept.entity");
const typeorm_1 = require("typeorm");
let Concept = class Concept {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Concept.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Concept.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Concept.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => concept_entity_1.ConceptItem, (conceptItem) => conceptItem.concept),
    __metadata("design:type", Array)
], Concept.prototype, "conceptItems", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Concept.prototype, "isOwnFee", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Concept.prototype, "isActive", void 0);
Concept = __decorate([
    (0, typeorm_1.Entity)()
], Concept);
exports.Concept = Concept;
//# sourceMappingURL=concept.entity.js.map