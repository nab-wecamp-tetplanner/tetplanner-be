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
exports.Category = void 0;
const typeorm_1 = require("typeorm");
const tet_config_entity_1 = require("../../tet_configs/entities/tet_config.entity");
const todo_item_entity_1 = require("../../todo_items/entities/todo_item.entity");
const budget_transaction_entity_1 = require("../../budget_transactions/entities/budget_transaction.entity");
let Category = class Category {
    id;
    name;
    icon;
    color;
    is_system;
    allocated_budget;
    deleted_at;
    tet_config;
    todo_items;
    budget_transactions;
};
exports.Category = Category;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Category.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Category.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Category.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Category.prototype, "is_system", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 15, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Category.prototype, "allocated_budget", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Category.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tet_config_entity_1.TetConfig, (tet_config) => tet_config.categories),
    (0, typeorm_1.JoinColumn)({ name: 'tet_config_id' }),
    __metadata("design:type", tet_config_entity_1.TetConfig)
], Category.prototype, "tet_config", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => todo_item_entity_1.TodoItem, (todo_item) => todo_item.category, { cascade: ['remove'] }),
    __metadata("design:type", Array)
], Category.prototype, "todo_items", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => budget_transaction_entity_1.BudgetTransaction, (transaction) => transaction.category, { cascade: ['remove'] }),
    __metadata("design:type", Array)
], Category.prototype, "budget_transactions", void 0);
exports.Category = Category = __decorate([
    (0, typeorm_1.Entity)('categories')
], Category);
//# sourceMappingURL=category.entity.js.map