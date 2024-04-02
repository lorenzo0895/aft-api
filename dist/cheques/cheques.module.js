"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChequesModule = void 0;
const common_1 = require("@nestjs/common");
const cheques_service_1 = require("./cheques.service");
const cheques_controller_1 = require("./cheques.controller");
const cheque_entity_1 = require("./entities/cheque.entity");
const typeorm_1 = require("@nestjs/typeorm");
let ChequesModule = class ChequesModule {
};
ChequesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([cheque_entity_1.Cheque])],
        controllers: [cheques_controller_1.ChequesController],
        providers: [cheques_service_1.ChequesService],
    })
], ChequesModule);
exports.ChequesModule = ChequesModule;
//# sourceMappingURL=cheques.module.js.map