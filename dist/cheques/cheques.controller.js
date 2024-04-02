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
exports.ChequesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cheques_service_1 = require("./cheques.service");
const cheque_dto_1 = require("./dto/cheque.dto");
const create_cheque_dto_1 = require("./dto/create-cheque.dto");
const update_cheque_dto_1 = require("./dto/update-cheque.dto");
let ChequesController = class ChequesController {
    constructor(chequesService) {
        this.chequesService = chequesService;
    }
    findAll(onlyActive) {
        onlyActive = String(onlyActive) === 'true' ? true : false;
        return this.chequesService.findAll(onlyActive);
    }
    findOne(id) {
        return this.chequesService.findOne(+id);
    }
    create(createChequeDto) {
        return this.chequesService.create(createChequeDto);
    }
    update(id, updateChequeDto) {
        return this.chequesService.update(+id, updateChequeDto);
    }
    remove(id) {
        return this.chequesService.remove(+id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: cheque_dto_1.ChequeDto, isArray: true }),
    __param(0, (0, common_1.Query)('onlyActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], ChequesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: cheque_dto_1.ChequeDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChequesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOkResponse)({ type: cheque_dto_1.ChequeDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cheque_dto_1.CreateChequeDto]),
    __metadata("design:returntype", void 0)
], ChequesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: cheque_dto_1.ChequeDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cheque_dto_1.UpdateChequeDto]),
    __metadata("design:returntype", void 0)
], ChequesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChequesController.prototype, "remove", null);
ChequesController = __decorate([
    (0, common_1.Controller)('cheques'),
    (0, swagger_1.ApiTags)('cheques'),
    __metadata("design:paramtypes", [cheques_service_1.ChequesService])
], ChequesController);
exports.ChequesController = ChequesController;
//# sourceMappingURL=cheques.controller.js.map