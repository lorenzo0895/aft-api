"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralConfigsModule = void 0;
const common_1 = require("@nestjs/common");
const general_configs_service_1 = require("./general-configs.service");
const general_configs_controller_1 = require("./general-configs.controller");
const typeorm_1 = require("@nestjs/typeorm");
const general_config_entity_1 = require("./entities/general-config.entity");
let GeneralConfigsModule = class GeneralConfigsModule {
};
GeneralConfigsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([general_config_entity_1.GeneralConfig])],
        controllers: [general_configs_controller_1.GeneralConfigsController],
        providers: [general_configs_service_1.GeneralConfigsService],
        exports: [general_configs_service_1.GeneralConfigsService],
    })
], GeneralConfigsModule);
exports.GeneralConfigsModule = GeneralConfigsModule;
//# sourceMappingURL=general-configs.module.js.map