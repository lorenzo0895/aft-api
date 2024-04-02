"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGeneralConfigDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_general_config_dto_1 = require("./create-general-config.dto");
class UpdateGeneralConfigDto extends (0, swagger_1.PartialType)(create_general_config_dto_1.CreateGeneralConfigDto) {
}
exports.UpdateGeneralConfigDto = UpdateGeneralConfigDto;
//# sourceMappingURL=update-general-config.dto.js.map