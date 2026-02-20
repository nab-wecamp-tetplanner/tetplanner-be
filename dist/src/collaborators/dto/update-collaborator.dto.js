"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCollaboratorDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_collaborator_dto_1 = require("./create-collaborator.dto");
class UpdateCollaboratorDto extends (0, mapped_types_1.PartialType)(create_collaborator_dto_1.CreateCollaboratorDto) {
}
exports.UpdateCollaboratorDto = UpdateCollaboratorDto;
//# sourceMappingURL=update-collaborator.dto.js.map