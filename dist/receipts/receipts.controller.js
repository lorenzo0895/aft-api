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
exports.ReceiptsController = void 0;
const common_1 = require("@nestjs/common");
const receipts_service_1 = require("./receipts.service");
const create_receipt_dto_1 = require("./dto/create-receipt.dto");
const update_receipt_dto_1 = require("./dto/update-receipt.dto");
const swagger_1 = require("@nestjs/swagger");
const receipt_dto_1 = require("./dto/receipt.dto");
const update_receipt_description_dto_1 = require("./dto/update-receipt-description.dto");
let ReceiptsController = class ReceiptsController {
    constructor(receiptsService) {
        this.receiptsService = receiptsService;
    }
    findAll(start, end, client, take) {
        return this.receiptsService.findAll(start, end, client, take);
    }
    findOne(id) {
        return this.receiptsService.findOne(+id);
    }
    async report(start, end, orderBy, client) {
        return this.receiptsService.minuta(start, end, orderBy, client);
    }
    async xubio(start, end) {
        return this.receiptsService.xubio(start, end);
    }
    async create(createReceiptDto) {
        return this.receiptsService.create(createReceiptDto);
    }
    async update(id, updateReceiptDto) {
        return this.receiptsService.update(+id, updateReceiptDto);
    }
    async updateDescription(id, updateReceiptDescriptionDto) {
        return this.receiptsService.updateDescription(+id, updateReceiptDescriptionDto);
    }
    async close(id) {
        return this.receiptsService.close(+id);
    }
    async open(id) {
        return this.receiptsService.open(+id);
    }
    async cancel(id) {
        return this.receiptsService.cancel(+id);
    }
    remove(id) {
        return this.receiptsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: receipt_dto_1.ReceiptDto, isArray: true }),
    __param(0, (0, common_1.Query)('start')),
    __param(1, (0, common_1.Query)('end')),
    __param(2, (0, common_1.Query)('client')),
    __param(3, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date,
        Date, Number, Number]),
    __metadata("design:returntype", void 0)
], ReceiptsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: receipt_dto_1.ReceiptDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReceiptsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('report/minuta'),
    __param(0, (0, common_1.Query)('start')),
    __param(1, (0, common_1.Query)('end')),
    __param(2, (0, common_1.Query)('orderBy')),
    __param(3, (0, common_1.Query)('client')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date,
        Date, String, Number]),
    __metadata("design:returntype", Promise)
], ReceiptsController.prototype, "report", null);
__decorate([
    (0, common_1.Get)('report/xubio'),
    __param(0, (0, common_1.Query)('start')),
    __param(1, (0, common_1.Query)('end')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date, Date]),
    __metadata("design:returntype", Promise)
], ReceiptsController.prototype, "xubio", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOkResponse)({ type: receipt_dto_1.ReceiptDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_receipt_dto_1.CreateReceiptDto]),
    __metadata("design:returntype", Promise)
], ReceiptsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: receipt_dto_1.ReceiptDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_receipt_dto_1.UpdateReceiptDto]),
    __metadata("design:returntype", Promise)
], ReceiptsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('description/:id'),
    (0, swagger_1.ApiOkResponse)({ type: receipt_dto_1.ReceiptDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_receipt_description_dto_1.UpdateReceiptDescriptionDto]),
    __metadata("design:returntype", Promise)
], ReceiptsController.prototype, "updateDescription", null);
__decorate([
    (0, common_1.Patch)('close/:id'),
    (0, swagger_1.ApiOkResponse)({ type: receipt_dto_1.ReceiptDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReceiptsController.prototype, "close", null);
__decorate([
    (0, common_1.Patch)('open/:id'),
    (0, swagger_1.ApiOkResponse)({ type: receipt_dto_1.ReceiptDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReceiptsController.prototype, "open", null);
__decorate([
    (0, common_1.Patch)('cancel/:id'),
    (0, swagger_1.ApiOkResponse)({ type: receipt_dto_1.ReceiptDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReceiptsController.prototype, "cancel", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReceiptsController.prototype, "remove", null);
ReceiptsController = __decorate([
    (0, common_1.Controller)('receipts'),
    (0, swagger_1.ApiTags)('receipts'),
    __metadata("design:paramtypes", [receipts_service_1.ReceiptsService])
], ReceiptsController);
exports.ReceiptsController = ReceiptsController;
//# sourceMappingURL=receipts.controller.js.map