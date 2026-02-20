"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTodoItemDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_todo_item_dto_1 = require("./create-todo_item.dto");
class UpdateTodoItemDto extends (0, mapped_types_1.PartialType)(create_todo_item_dto_1.CreateTodoItemDto) {
}
exports.UpdateTodoItemDto = UpdateTodoItemDto;
//# sourceMappingURL=update-todo_item.dto.js.map