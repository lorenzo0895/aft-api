"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("./user.dto");
class CreateUserDto extends (0, swagger_1.OmitType)(user_dto_1.UserDto, [
    'id',
    'isActive',
    'receipts',
]) {
}
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map