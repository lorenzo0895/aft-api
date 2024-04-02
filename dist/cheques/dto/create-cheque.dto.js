"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateChequeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const cheque_dto_1 = require("./cheque.dto");
class CreateChequeDto extends (0, swagger_1.OmitType)(cheque_dto_1.ChequeDto, ['id']) {
}
exports.CreateChequeDto = CreateChequeDto;
//# sourceMappingURL=create-cheque.dto.js.map