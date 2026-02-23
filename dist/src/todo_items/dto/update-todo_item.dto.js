"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTodoItemDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const create_todo_item_dto_1 = require("./create-todo_item.dto");
class UpdateTodoItemDto extends (0, mapped_types_1.PartialType)(create_todo_item_dto_1.CreateTodoItemDto) {
    category_id;
    estimated_price;
}
exports.UpdateTodoItemDto = UpdateTodoItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Category ID', nullable: true }),
    (0, class_validator_1.IsUUID)('4'),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTodoItemDto.prototype, "category_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Estimated price', nullable: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateTodoItemDto.prototype, "estimated_price", void 0);
//# sourceMappingURL=update-todo_item.dto.js.map