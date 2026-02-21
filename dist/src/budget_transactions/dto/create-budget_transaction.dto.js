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
exports.CreateBudgetTransactionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../helper/enums");
class CreateBudgetTransactionDto {
    amount;
    type;
    note;
    transaction_date;
    tet_config_id;
    category_id;
    todo_item_id;
}
exports.CreateBudgetTransactionDto = CreateBudgetTransactionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Transaction amount' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateBudgetTransactionDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.TransactionType, description: 'Transaction type' }),
    (0, class_validator_1.IsEnum)(enums_1.TransactionType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBudgetTransactionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Transaction note', nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBudgetTransactionDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, description: 'Transaction date' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => (value instanceof Date ? value.toISOString() : value)),
    __metadata("design:type", Date)
], CreateBudgetTransactionDto.prototype, "transaction_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Tet config ID' }),
    (0, class_validator_1.IsUUID)('4'),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBudgetTransactionDto.prototype, "tet_config_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Category ID' }),
    (0, class_validator_1.IsUUID)('4'),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBudgetTransactionDto.prototype, "category_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Todo item ID', nullable: true }),
    (0, class_validator_1.IsUUID)('4'),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBudgetTransactionDto.prototype, "todo_item_id", void 0);
//# sourceMappingURL=create-budget_transaction.dto.js.map