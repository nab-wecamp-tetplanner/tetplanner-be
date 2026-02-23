"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const todo_items_service_1 = require("./todo_items.service");
const todo_items_controller_1 = require("./todo_items.controller");
const todo_item_entity_1 = require("./entities/todo_item.entity");
const tet_config_entity_1 = require("../tet_configs/entities/tet_config.entity");
const collaborator_entity_1 = require("../collaborators/entities/collaborator.entity");
const budget_transaction_entity_1 = require("../budget_transactions/entities/budget_transaction.entity");
const timeline_phase_entity_1 = require("../timeline_phases/entities/timeline_phase.entity");
const collaborators_module_1 = require("../collaborators/collaborators.module");
const notifications_module_1 = require("../notifications/notifications.module");
const budget_calculations_service_1 = require("../helper/budget-calculations.service");
let TodoItemsModule = class TodoItemsModule {
};
exports.TodoItemsModule = TodoItemsModule;
exports.TodoItemsModule = TodoItemsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([todo_item_entity_1.TodoItem, tet_config_entity_1.TetConfig, collaborator_entity_1.Collaborator, budget_transaction_entity_1.BudgetTransaction, timeline_phase_entity_1.TimelinePhase]), collaborators_module_1.CollaboratorsModule, notifications_module_1.NotificationsModule],
        controllers: [todo_items_controller_1.TodoItemsController],
        providers: [todo_items_service_1.TodoItemsService, budget_calculations_service_1.BudgetCalculationsService],
    })
], TodoItemsModule);
//# sourceMappingURL=todo_items.module.js.map