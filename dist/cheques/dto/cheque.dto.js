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
exports.ChequeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const receipt_dto_1 = require("../../receipts/dto/receipt.dto");
class ChequeDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ChequeDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ChequeDto.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ChequeDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ChequeDto.prototype, "bank", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ChequeDto.prototype, "branchOffice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ChequeDto.prototype, "cuit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", receipt_dto_1.ReceiptDto)
], ChequeDto.prototype, "receipt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", receipt_dto_1.ReceiptDto)
], ChequeDto.prototype, "cancelReceipt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ChequeDto.prototype, "amount", void 0);
exports.ChequeDto = ChequeDto;
//# sourceMappingURL=cheque.dto.js.map