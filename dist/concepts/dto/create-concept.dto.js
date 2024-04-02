"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateConceptDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const concept_dto_1 = require("./concept.dto");
class CreateConceptDto extends (0, swagger_1.OmitType)(concept_dto_1.ConceptDto, [
    'id',
    'isActive',
]) {
}
exports.CreateConceptDto = CreateConceptDto;
//# sourceMappingURL=create-concept.dto.js.map