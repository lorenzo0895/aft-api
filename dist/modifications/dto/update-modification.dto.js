"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateModificationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_modification_dto_1 = require("./create-modification.dto");
class UpdateModificationDto extends (0, swagger_1.PartialType)(create_modification_dto_1.CreateModificationDto) {
}
exports.UpdateModificationDto = UpdateModificationDto;
//# sourceMappingURL=update-modification.dto.js.map