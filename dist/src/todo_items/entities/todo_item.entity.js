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
exports.TodoItem = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../helper/enums");
const tet_config_entity_1 = require("../../tet_configs/entities/tet_config.entity");
const timeline_phase_entity_1 = require("../../timeline_phases/entities/timeline_phase.entity");
const category_entity_1 = require("../../categories/entities/category.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const budget_transaction_entity_1 = require("../../budget_transactions/entities/budget_transaction.entity");
const notification_entity_1 = require("../../notifications/entities/notification.entity");
let TodoItem = class TodoItem {
    id;
    title;
    priority;
    status;
    deadline;
    is_overdue;
    is_shopping;
    estimated_price;
    quantity;
    purchased;
    assigned_to;
    subtasks;
    done_percentage;
    computeDonePercentage() {
        const entries = Object.keys(this.subtasks ?? {});
        if (entries.length === 0) {
            this.done_percentage = 0;
            return;
        }
        const done = Object.values(this.subtasks).filter(Boolean).length;
        this.done_percentage = Math.round((done / entries.length) * 100);
    }
    created_at;
    deleted_at;
    tet_config;
    timeline_phase;
    category;
    assigned_to_user;
    budget_transactions;
    notifications;
};
exports.TodoItem = TodoItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TodoItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TodoItem.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.TodoPriority, default: enums_1.TodoPriority.MEDIUM }),
    __metadata("design:type", String)
], TodoItem.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.TodoStatus, default: enums_1.TodoStatus.PENDING }),
    __metadata("design:type", String)
], TodoItem.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { nullable: true }),
    __metadata("design:type", Date)
], TodoItem.prototype, "deadline", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], TodoItem.prototype, "is_overdue", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], TodoItem.prototype, "is_shopping", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 15, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], TodoItem.prototype, "estimated_price", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { default: 1 }),
    __metadata("design:type", Number)
], TodoItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], TodoItem.prototype, "purchased", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], TodoItem.prototype, "assigned_to", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: {} }),
    __metadata("design:type", Object)
], TodoItem.prototype, "subtasks", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TodoItem.prototype, "computeDonePercentage", null);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TodoItem.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], TodoItem.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tet_config_entity_1.TetConfig, (tet_config) => tet_config.todo_items),
    (0, typeorm_1.JoinColumn)({ name: 'tet_config_id' }),
    __metadata("design:type", tet_config_entity_1.TetConfig)
], TodoItem.prototype, "tet_config", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => timeline_phase_entity_1.TimelinePhase, (phase) => phase.todo_items),
    (0, typeorm_1.JoinColumn)({ name: 'timeline_phase_id' }),
    __metadata("design:type", timeline_phase_entity_1.TimelinePhase)
], TodoItem.prototype, "timeline_phase", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.todo_items),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", category_entity_1.Category)
], TodoItem.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.assigned_todo_items, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'assigned_to' }),
    __metadata("design:type", user_entity_1.User)
], TodoItem.prototype, "assigned_to_user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => budget_transaction_entity_1.BudgetTransaction, (transaction) => transaction.todo_item),
    __metadata("design:type", Array)
], TodoItem.prototype, "budget_transactions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, (notification) => notification.todo_item, { cascade: ['remove'] }),
    __metadata("design:type", Array)
], TodoItem.prototype, "notifications", void 0);
exports.TodoItem = TodoItem = __decorate([
    (0, typeorm_1.Entity)('todo_items')
], TodoItem);
//# sourceMappingURL=todo_item.entity.js.map