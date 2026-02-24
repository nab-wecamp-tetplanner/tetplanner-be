"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dashboard_service_1 = require("./dashboard.service");
const dashboard_controller_1 = require("./dashboard.controller");
const tet_config_entity_1 = require("../tet_configs/entities/tet_config.entity");
const todo_item_entity_1 = require("../todo_items/entities/todo_item.entity");
const budget_transaction_entity_1 = require("../budget_transactions/entities/budget_transaction.entity");
const category_entity_1 = require("../categories/entities/category.entity");
const collaborators_module_1 = require("../collaborators/collaborators.module");
const budget_calculations_service_1 = require("../helper/budget-calculations.service");
let DashboardModule = class DashboardModule {
};
exports.DashboardModule = DashboardModule;
exports.DashboardModule = DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tet_config_entity_1.TetConfig, todo_item_entity_1.TodoItem, budget_transaction_entity_1.BudgetTransaction, category_entity_1.Category]), collaborators_module_1.CollaboratorsModule],
        controllers: [dashboard_controller_1.DashboardController],
        providers: [dashboard_service_1.DashboardService, budget_calculations_service_1.BudgetCalculationsService],
    })
], DashboardModule);
//# sourceMappingURL=dashboard.module.js.map