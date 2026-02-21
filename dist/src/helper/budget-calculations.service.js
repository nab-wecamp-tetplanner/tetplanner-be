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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetCalculationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const todo_item_entity_1 = require("../todo_items/entities/todo_item.entity");
let BudgetCalculationsService = class BudgetCalculationsService {
    todoItemRepository;
    constructor(todoItemRepository) {
        this.todoItemRepository = todoItemRepository;
    }
    async calculateTotalUsed(tetConfigId) {
        const result = await this.todoItemRepository.createQueryBuilder('todo').select('COALESCE(SUM(todo.estimated_price * todo.quantity), 0)', 'used').where('todo.tet_config_id = :id', { id: tetConfigId }).andWhere('todo.purchased = :purchased', { purchased: true }).getRawOne();
        return parseFloat(result?.used ?? '0');
    }
    async calculateUsedByCategory(tetConfigId) {
        const categoryRows = await this.todoItemRepository.createQueryBuilder('todo').select('todo.category_id', 'category_id').addSelect('COALESCE(SUM(todo.estimated_price * todo.quantity), 0)', 'used_budget').where('todo.tet_config_id = :id', { id: tetConfigId }).andWhere('todo.purchased = :purchased', { purchased: true }).groupBy('todo.category_id').getRawMany();
        return new Map(categoryRows.map((r) => [r.category_id, parseFloat(r.used_budget)]));
    }
    calculatePercentage(used, total) {
        return total > 0 ? Math.round((used / total) * 100) : 0;
    }
};
exports.BudgetCalculationsService = BudgetCalculationsService;
exports.BudgetCalculationsService = BudgetCalculationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todo_item_entity_1.TodoItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BudgetCalculationsService);
//# sourceMappingURL=budget-calculations.service.js.map