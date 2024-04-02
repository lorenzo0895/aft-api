"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConceptItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_concept_item_dto_1 = require("./create-concept-item.dto");
class UpdateConceptItemDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_concept_item_dto_1.CreateConceptItemDto, ['hasVat', 'aliquot'])) {
}
exports.UpdateConceptItemDto = UpdateConceptItemDto;
//# sourceMappingURL=update-concept-item.dto.js.map