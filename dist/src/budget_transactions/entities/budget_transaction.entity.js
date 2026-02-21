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
exports.BudgetTransaction = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../helper/enums");
const tet_config_entity_1 = require("../../tet_configs/entities/tet_config.entity");
const category_entity_1 = require("../../categories/entities/category.entity");
const todo_item_entity_1 = require("../../todo_items/entities/todo_item.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let BudgetTransaction = class BudgetTransaction {
    id;
    amount;
    type;
    note;
    transaction_date;
    tet_config;
    category;
    todo_item;
    recorded_by_user;
};
exports.BudgetTransaction = BudgetTransaction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BudgetTransaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], BudgetTransaction.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.TransactionType }),
    __metadata("design:type", String)
], BudgetTransaction.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BudgetTransaction.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", Date)
], BudgetTransaction.prototype, "transaction_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tet_config_entity_1.TetConfig, (tet_config) => tet_config.budget_transactions),
    (0, typeorm_1.JoinColumn)({ name: 'tet_config_id' }),
    __metadata("design:type", tet_config_entity_1.TetConfig)
], BudgetTransaction.prototype, "tet_config", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.budget_transactions),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", category_entity_1.Category)
], BudgetTransaction.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => todo_item_entity_1.TodoItem, (todo_item) => todo_item.budget_transactions, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'todo_item_id' }),
    __metadata("design:type", todo_item_entity_1.TodoItem)
], BudgetTransaction.prototype, "todo_item", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.recorded_transactions),
    (0, typeorm_1.JoinColumn)({ name: 'recorded_by' }),
    __metadata("design:type", user_entity_1.User)
], BudgetTransaction.prototype, "recorded_by_user", void 0);
exports.BudgetTransaction = BudgetTransaction = __decorate([
    (0, typeorm_1.Entity)('budget_transactions')
], BudgetTransaction);
//# sourceMappingURL=budget_transaction.entity.js.map