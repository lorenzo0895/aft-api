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
exports.BillingsController = void 0;
const common_1 = require("@nestjs/common");
const billings_service_1 = require("./billings.service");
let BillingsController = class BillingsController {
    constructor(billingsService) {
        this.billingsService = billingsService;
    }
    async findBySalePoint(salePoint) {
        return await this.billingsService.findBySalePoint(+salePoint);
    }
    async create(createBillingDto) {
        return await this.billingsService.create(createBillingDto);
    }
    async generateCAE(createBillingDto) {
        return await this.billingsService.generateCAE(createBillingDto);
    }
    async getInvoices(body) {
        return await this.billingsService.getLastInvoices(body);
    }
    async remove(body) {
        return await this.billingsService.remove(body.ids);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('salePoint')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BillingsController.prototype, "findBySalePoint", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('generate-cae'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingsController.prototype, "generateCAE", null);
__decorate([
    (0, common_1.Post)('getInvoices'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingsController.prototype, "getInvoices", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingsController.prototype, "remove", null);
BillingsController = __decorate([
    (0, common_1.Controller)('billings'),
    __metadata("design:paramtypes", [billings_service_1.BillingsService])
], BillingsController);
exports.BillingsController = BillingsController;
//# sourceMappingURL=billings.controller.js.map