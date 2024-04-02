"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptsModule = void 0;
const common_1 = require("@nestjs/common");
const receipts_service_1 = require("./receipts.service");
const receipts_controller_1 = require("./receipts.controller");
const typeorm_1 = require("@nestjs/typeorm");
const receipt_entity_1 = require("./entities/receipt.entity");
const cheque_entity_1 = require("../cheques/entities/cheque.entity");
const day_entity_1 = require("../days/entities/day.entity");
const concept_entity_1 = require("../concept-items/entities/concept.entity");
let ReceiptsModule = class ReceiptsModule {
};
ReceiptsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([receipt_entity_1.Receipt, cheque_entity_1.Cheque, day_entity_1.Day, concept_entity_1.ConceptItem])],
        controllers: [receipts_controller_1.ReceiptsController],
        providers: [receipts_service_1.ReceiptsService],
    })
], ReceiptsModule);
exports.ReceiptsModule = ReceiptsModule;
//# sourceMappingURL=receipts.module.js.map