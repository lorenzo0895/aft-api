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
exports.ReceiptDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_dto_1 = require("../../clients/dto/client.dto");
const day_dto_1 = require("../../days/dto/day.dto");
const user_entity_1 = require("../../users/entities/user.entity");
class ReceiptDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReceiptDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", day_dto_1.DayDto)
], ReceiptDto.prototype, "day", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", client_dto_1.ClientDto)
], ReceiptDto.prototype, "client", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReceiptDto.prototype, "transferAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReceiptDto.prototype, "cash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", user_entity_1.User)
], ReceiptDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReceiptDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], ReceiptDto.prototype, "cheques", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ReceiptDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ReceiptDto.prototype, "isCanceled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", ReceiptDto)
], ReceiptDto.prototype, "cancelReceipt", void 0);
exports.ReceiptDto = ReceiptDto;
//# sourceMappingURL=receipt.dto.js.map