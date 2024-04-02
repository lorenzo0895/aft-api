"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConceptsModule = void 0;
const common_1 = require("@nestjs/common");
const concepts_service_1 = require("./concepts.service");
const concepts_controller_1 = require("./concepts.controller");
const concept_entity_1 = require("./entities/concept.entity");
const typeorm_1 = require("@nestjs/typeorm");
let ConceptsModule = class ConceptsModule {
};
ConceptsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([concept_entity_1.Concept])],
        controllers: [concepts_controller_1.ConceptsController],
        providers: [concepts_service_1.ConceptsService],
    })
], ConceptsModule);
exports.ConceptsModule = ConceptsModule;
//# sourceMappingURL=concepts.module.js.map