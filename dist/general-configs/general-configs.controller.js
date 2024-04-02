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
exports.GeneralConfigsController = void 0;
const common_1 = require("@nestjs/common");
const general_configs_service_1 = require("./general-configs.service");
let GeneralConfigsController = class GeneralConfigsController {
    constructor(generalConfigsService) {
        this.generalConfigsService = generalConfigsService;
    }
    async findAll() {
        return await this.generalConfigsService.findAll();
    }
    async findOne(key) {
        return await this.generalConfigsService.findOne(key);
    }
    async update(body) {
        return await this.generalConfigsService.update(body.generalConfigs);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GeneralConfigsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':key'),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GeneralConfigsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GeneralConfigsController.prototype, "update", null);
GeneralConfigsController = __decorate([
    (0, common_1.Controller)('general-configs'),
    __metadata("design:paramtypes", [general_configs_service_1.GeneralConfigsService])
], GeneralConfigsController);
exports.GeneralConfigsController = GeneralConfigsController;
//# sourceMappingURL=general-configs.controller.js.map