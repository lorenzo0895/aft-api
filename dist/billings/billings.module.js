"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingsModule = void 0;
const common_1 = require("@nestjs/common");
const billings_service_1 = require("./billings.service");
const billings_controller_1 = require("./billings.controller");
const typeorm_1 = require("@nestjs/typeorm");
const billing_entity_1 = require("./entities/billing.entity");
const general_configs_module_1 = require("../general-configs/general-configs.module");
let BillingsModule = class BillingsModule {
};
BillingsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([billing_entity_1.Billing]), general_configs_module_1.GeneralConfigsModule],
        controllers: [billings_controller_1.BillingsController],
        providers: [billings_service_1.BillingsService],
    })
], BillingsModule);
exports.BillingsModule = BillingsModule;
//# sourceMappingURL=billings.module.js.map