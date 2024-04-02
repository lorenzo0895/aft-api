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
exports.DaysController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const days_service_1 = require("./days.service");
const create_day_dto_1 = require("./dto/create-day.dto");
const day_dto_1 = require("./dto/day.dto");
const update_day_dto_1 = require("./dto/update-day.dto");
let DaysController = class DaysController {
    constructor(daysService) {
        this.daysService = daysService;
    }
    findAll(full, onlyActive) {
        full = String(full) === 'true' ? true : false;
        onlyActive = String(onlyActive) === 'true' ? true : false;
        return this.daysService.findAll(full, onlyActive);
    }
    findOne(id) {
        return this.daysService.findOne(+id);
    }
    create(createDayDto) {
        return this.daysService.create(createDayDto);
    }
    update(id, updateDayDto) {
        return this.daysService.update(+id, updateDayDto);
    }
    close(id) {
        return this.daysService.close(+id);
    }
    open(id) {
        return this.daysService.open(+id);
    }
    remove(id) {
        return this.daysService.remove(+id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: day_dto_1.DayDto, isArray: true }),
    __param(0, (0, common_1.Query)('full')),
    __param(1, (0, common_1.Query)('onlyActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Boolean]),
    __metadata("design:returntype", void 0)
], DaysController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: day_dto_1.DayDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DaysController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOkResponse)({ type: day_dto_1.DayDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_day_dto_1.CreateDayDto]),
    __metadata("design:returntype", void 0)
], DaysController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: day_dto_1.DayDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_day_dto_1.UpdateDayDto]),
    __metadata("design:returntype", void 0)
], DaysController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('close/:id'),
    (0, swagger_1.ApiOkResponse)({ type: day_dto_1.DayDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DaysController.prototype, "close", null);
__decorate([
    (0, common_1.Patch)('open/:id'),
    (0, swagger_1.ApiOkResponse)({ type: day_dto_1.DayDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DaysController.prototype, "open", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DaysController.prototype, "remove", null);
DaysController = __decorate([
    (0, common_1.Controller)('days'),
    (0, swagger_1.ApiTags)('days'),
    __metadata("design:paramtypes", [days_service_1.DaysService])
], DaysController);
exports.DaysController = DaysController;
//# sourceMappingURL=days.controller.js.map