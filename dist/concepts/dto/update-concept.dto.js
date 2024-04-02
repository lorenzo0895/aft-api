"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConceptDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_concept_dto_1 = require("./create-concept.dto");
class UpdateConceptDto extends (0, swagger_1.PartialType)(create_concept_dto_1.CreateConceptDto) {
}
exports.UpdateConceptDto = UpdateConceptDto;
//# sourceMappingURL=update-concept.dto.js.map