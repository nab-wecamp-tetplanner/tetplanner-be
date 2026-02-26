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
exports.TetConfig = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const category_entity_1 = require("../../categories/entities/category.entity");
const timeline_phase_entity_1 = require("../../timeline_phases/entities/timeline_phase.entity");
const todo_item_entity_1 = require("../../todo_items/entities/todo_item.entity");
const budget_transaction_entity_1 = require("../../budget_transactions/entities/budget_transaction.entity");
const collaborator_entity_1 = require("../../collaborators/entities/collaborator.entity");
let TetConfig = class TetConfig {
    id;
    year;
    name;
    total_budget;
    currency;
    created_at;
    deleted_at;
    owner;
    categories;
    timeline_phases;
    todo_items;
    budget_transactions;
    collaborators;
};
exports.TetConfig = TetConfig;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TetConfig.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], TetConfig.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TetConfig.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], TetConfig.prototype, "total_budget", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 3, nullable: true, default: 'VND' }),
    __metadata("design:type", String)
], TetConfig.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TetConfig.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], TetConfig.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.tet_configs),
    (0, typeorm_1.JoinColumn)({ name: 'owner_id' }),
    __metadata("design:type", user_entity_1.User)
], TetConfig.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => category_entity_1.Category, (category) => category.tet_config, { cascade: ['remove'] }),
    __metadata("design:type", Array)
], TetConfig.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => timeline_phase_entity_1.TimelinePhase, (phase) => phase.tet_config, { cascade: ['remove'] }),
    __metadata("design:type", Array)
], TetConfig.prototype, "timeline_phases", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => todo_item_entity_1.TodoItem, (todo) => todo.tet_config, { cascade: ['remove'] }),
    __metadata("design:type", Array)
], TetConfig.prototype, "todo_items", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => budget_transaction_entity_1.BudgetTransaction, (transaction) => transaction.tet_config, { cascade: ['remove'] }),
    __metadata("design:type", Array)
], TetConfig.prototype, "budget_transactions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => collaborator_entity_1.Collaborator, (collaborator) => collaborator.tet_config, { cascade: ['remove'] }),
    __metadata("design:type", Array)
], TetConfig.prototype, "collaborators", void 0);
exports.TetConfig = TetConfig = __decorate([
    (0, typeorm_1.Entity)('tet_configs')
], TetConfig);
//# sourceMappingURL=tet_config.entity.js.map