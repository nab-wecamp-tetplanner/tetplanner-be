"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTetConfigDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_tet_config_dto_1 = require("./create-tet_config.dto");
class UpdateTetConfigDto extends (0, mapped_types_1.PartialType)(create_tet_config_dto_1.CreateTetConfigDto) {
}
exports.UpdateTetConfigDto = UpdateTetConfigDto;
//# sourceMappingURL=update-tet_config.dto.js.map