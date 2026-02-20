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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const tet_config_entity_1 = require("../../tet_configs/entities/tet_config.entity");
const collaborator_entity_1 = require("../../collaborators/entities/collaborator.entity");
const notification_entity_1 = require("../../notifications/entities/notification.entity");
const todo_item_entity_1 = require("../../todo_items/entities/todo_item.entity");
const budget_transaction_entity_1 = require("../../budget_transactions/entities/budget_transaction.entity");
let User = class User {
    id;
    email;
    password_hash;
    name;
    is_verified;
    image_url;
    created_at;
    deleted_at;
    tet_configs;
    collaborators;
    notifications;
    assigned_todo_items;
    recorded_transactions;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password_hash", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "is_verified", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "image_url", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tet_config_entity_1.TetConfig, (tet_config) => tet_config.owner),
    __metadata("design:type", Array)
], User.prototype, "tet_configs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => collaborator_entity_1.Collaborator, (collaborator) => collaborator.user, { cascade: ['remove'] }),
    __metadata("design:type", Array)
], User.prototype, "collaborators", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, (notification) => notification.user, { cascade: ['remove'] }),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => todo_item_entity_1.TodoItem, (todo_item) => todo_item.assigned_to_user),
    __metadata("design:type", Array)
], User.prototype, "assigned_todo_items", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => budget_transaction_entity_1.BudgetTransaction, (transaction) => transaction.recorded_by_user),
    __metadata("design:type", Array)
], User.prototype, "recorded_transactions", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map