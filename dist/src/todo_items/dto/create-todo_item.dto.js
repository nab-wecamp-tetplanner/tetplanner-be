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
exports.CreateTodoItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../helper/enums");
class CreateTodoItemDto {
    title;
    priority;
    status;
    deadline;
    is_shopping;
    estimated_price;
    quantity;
    assigned_to;
    subtasks;
    tet_config_id;
    timeline_phase_id;
    category_id;
}
exports.CreateTodoItemDto = CreateTodoItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Todo item title' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTodoItemDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.TodoPriority, description: 'Priority level', nullable: true }),
    (0, class_validator_1.IsEnum)(enums_1.TodoPriority),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTodoItemDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.TodoStatus, description: 'Current status', nullable: true }),
    (0, class_validator_1.IsEnum)(enums_1.TodoStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTodoItemDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, description: 'Deadline', nullable: true }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value instanceof Date ? value.toISOString() : value)),
    __metadata("design:type", Date)
], CreateTodoItemDto.prototype, "deadline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, description: 'Is shopping item', nullable: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true' || value === true)
            return true;
        if (value === 'false' || value === false)
            return false;
        return value;
    }),
    __metadata("design:type", Boolean)
], CreateTodoItemDto.prototype, "is_shopping", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Estimated price', nullable: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTodoItemDto.prototype, "estimated_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Quantity', nullable: true }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTodoItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Assigned to user ID', nullable: true }),
    (0, class_validator_1.IsUUID)('4'),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTodoItemDto.prototype, "assigned_to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        additionalProperties: { type: 'boolean' },
        description: 'Subtasks map: task name → done',
        nullable: true,
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateTodoItemDto.prototype, "subtasks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Tet config ID' }),
    (0, class_validator_1.IsUUID)('4'),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTodoItemDto.prototype, "tet_config_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Timeline phase ID' }),
    (0, class_validator_1.IsUUID)('4'),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTodoItemDto.prototype, "timeline_phase_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Category ID' }),
    (0, class_validator_1.IsUUID)('4'),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTodoItemDto.prototype, "category_id", void 0);
//# sourceMappingURL=create-todo_item.dto.js.map