"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDayDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const day_dto_1 = require("./day.dto");
class CreateDayDto extends (0, swagger_1.OmitType)(day_dto_1.DayDto, [
    'id',
    'isActive',
    'leftover',
    'totalAudited',
]) {
}
exports.CreateDayDto = CreateDayDto;
//# sourceMappingURL=create-day.dto.js.map