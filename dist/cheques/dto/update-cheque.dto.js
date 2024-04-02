"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChequeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_cheque_dto_1 = require("./create-cheque.dto");
class UpdateChequeDto extends (0, swagger_1.PartialType)(create_cheque_dto_1.CreateChequeDto) {
}
exports.UpdateChequeDto = UpdateChequeDto;
//# sourceMappingURL=update-cheque.dto.js.map