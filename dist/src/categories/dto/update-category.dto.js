"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_category_dto_1 = require("./create-category.dto");
class UpdateCategoryDto extends (0, mapped_types_1.PartialType)((0, mapped_types_1.OmitType)(create_category_dto_1.CreateCategoryDto, ['tet_config_id'])) {
}
exports.UpdateCategoryDto = UpdateCategoryDto;
//# sourceMappingURL=update-category.dto.js.map