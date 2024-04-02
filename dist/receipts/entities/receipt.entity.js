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
var Receipt_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Receipt = void 0;
const cheque_entity_1 = require("../../cheques/entities/cheque.entity");
const client_entity_1 = require("../../clients/entities/client.entity");
const concept_entity_1 = require("../../concept-items/entities/concept.entity");
const day_entity_1 = require("../../days/entities/day.entity");
const parseFloat_1 = require("../../shared/constants/parseFloat");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let Receipt = Receipt_1 = class Receipt {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Receipt.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", Number)
], Receipt.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => day_entity_1.Day, (day) => day.receipts, { eager: true }),
    __metadata("design:type", day_entity_1.Day)
], Receipt.prototype, "day", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client, (client) => client.receipts, { eager: true }),
    __metadata("design:type", client_entity_1.Client)
], Receipt.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 14,
        scale: 2,
        transformer: parseFloat_1.floatParser,
    }),
    __metadata("design:type", Number)
], Receipt.prototype, "transferAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Receipt.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 14,
        scale: 2,
        transformer: parseFloat_1.floatParser,
    }),
    __metadata("design:type", Number)
], Receipt.prototype, "cash", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cheque_entity_1.Cheque, (cheque) => cheque.receipt, {
        eager: true,
        cascade: ['insert', 'update'],
    }),
    __metadata("design:type", Array)
], Receipt.prototype, "cheques", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cheque_entity_1.Cheque, (cheque) => cheque.cancelReceipt, {
        eager: true,
        cascade: ['insert', 'update'],
    }),
    __metadata("design:type", Array)
], Receipt.prototype, "cancelCheques", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => concept_entity_1.ConceptItem, (conceptItem) => conceptItem.receipt, {
        eager: true,
    }),
    __metadata("design:type", Array)
], Receipt.prototype, "conceptItems", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.receipts, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], Receipt.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Receipt_1, (receipt) => receipt.id),
    __metadata("design:type", Receipt)
], Receipt.prototype, "cancelReceipt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Receipt.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Receipt.prototype, "isCancelled", void 0);
Receipt = Receipt_1 = __decorate([
    (0, typeorm_1.Entity)()
], Receipt);
exports.Receipt = Receipt;
//# sourceMappingURL=receipt.entity.js.map