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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tet_config_entity_1 = require("../tet_configs/entities/tet_config.entity");
const todo_item_entity_1 = require("../todo_items/entities/todo_item.entity");
const budget_transaction_entity_1 = require("../budget_transactions/entities/budget_transaction.entity");
const category_entity_1 = require("../categories/entities/category.entity");
const collaborators_service_1 = require("../collaborators/collaborators.service");
const budget_calculations_service_1 = require("../helper/budget-calculations.service");
const enums_1 = require("../helper/enums");
let DashboardService = class DashboardService {
    tetConfigRepository;
    todoItemRepository;
    transactionRepository;
    categoryRepository;
    collaboratorsService;
    budgetCalculationsService;
    constructor(tetConfigRepository, todoItemRepository, transactionRepository, categoryRepository, collaboratorsService, budgetCalculationsService) {
        this.tetConfigRepository = tetConfigRepository;
        this.todoItemRepository = todoItemRepository;
        this.transactionRepository = transactionRepository;
        this.categoryRepository = categoryRepository;
        this.collaboratorsService = collaboratorsService;
        this.budgetCalculationsService = budgetCalculationsService;
    }
    async getOverview(userId, tetConfigId) {
        await this.collaboratorsService.checkAccess(userId, tetConfigId);
        const tetConfig = await this.tetConfigRepository.findOne({ where: { id: tetConfigId } });
        if (!tetConfig)
            throw new common_1.NotFoundException('Tet config not found');
        const items = await this.todoItemRepository.find({ where: { tet_config: { id: tetConfigId } } });
        const total = items.length;
        const completed = items.filter((i) => i.status === enums_1.TodoStatus.COMPLETED).length;
        const pending = items.filter((i) => i.status === enums_1.TodoStatus.PENDING).length;
        const in_progress = items.filter((i) => i.status === enums_1.TodoStatus.IN_PROGRESS).length;
        const overdue = items.filter((i) => i.is_overdue).length;
        const shopping_total = items.filter((i) => i.is_shopping).length;
        const shopping_purchased = items.filter((i) => i.is_shopping && i.purchased).length;
        const completion_rate = total > 0 ? Math.round((completed / total) * 100) : 0;
        const now = new Date();
        const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        const upcoming_deadlines = items.filter((i) => i.deadline && i.deadline > now && i.deadline <= in7Days && i.status !== enums_1.TodoStatus.COMPLETED).length;
        return {
            tet_config: { id: tetConfig.id, name: tetConfig.name, year: tetConfig.year, currency: tetConfig.currency },
            tasks: { total, completed, pending, in_progress, overdue, completion_rate, upcoming_deadlines },
            shopping: { total: shopping_total, purchased: shopping_purchased },
        };
    }
    async getBudgetSummary(userId, tetConfigId) {
        await this.collaboratorsService.checkAccess(userId, tetConfigId);
        const tetConfig = await this.tetConfigRepository.findOne({ where: { id: tetConfigId } });
        if (!tetConfig)
            throw new common_1.NotFoundException('Tet config not found');
        const totalBudget = Number(tetConfig.total_budget);
        const [usedBudget, plannedBudget, usedByCategory, plannedByCategory] = await Promise.all([this.budgetCalculationsService.calculateTotalUsed(tetConfigId), this.budgetCalculationsService.calculateTotalPlanned(tetConfigId), this.budgetCalculationsService.calculateUsedByCategory(tetConfigId), this.budgetCalculationsService.calculatePlannedByCategory(tetConfigId)]);
        const categories = await this.categoryRepository.find({ where: { tet_config: { id: tetConfigId } } });
        const categoryBreakdown = categories.map((cat) => {
            const catUsed = usedByCategory.get(cat.id) ?? 0;
            const catPlanned = plannedByCategory.get(cat.id) ?? 0;
            const catAllocated = cat.allocated_budget ? Number(cat.allocated_budget) : null;
            return {
                id: cat.id,
                name: cat.name,
                color: cat.color,
                allocated_budget: catAllocated,
                planned_budget: catPlanned,
                used_budget: catUsed,
                remaining_budget: catAllocated !== null ? catAllocated - catPlanned : null,
            };
        });
        return {
            currency: tetConfig.currency,
            total_budget: totalBudget,
            planned_budget: plannedBudget,
            used_budget: usedBudget,
            remaining_budget: totalBudget - plannedBudget,
            percentage_planned: this.budgetCalculationsService.calculatePercentage(plannedBudget, totalBudget),
            percentage_used: this.budgetCalculationsService.calculatePercentage(usedBudget, totalBudget),
            categories: categoryBreakdown,
        };
    }
    async getExpenseByCategory(userId, tetConfigId) {
        await this.collaboratorsService.checkAccess(userId, tetConfigId);
        const tetConfig = await this.tetConfigRepository.findOne({ where: { id: tetConfigId } });
        if (!tetConfig)
            throw new common_1.NotFoundException('Tet config not found');
        const [usedByCategory, plannedByCategory] = await Promise.all([this.budgetCalculationsService.calculateUsedByCategory(tetConfigId), this.budgetCalculationsService.calculatePlannedByCategory(tetConfigId)]);
        const categories = await this.categoryRepository.find({ where: { tet_config: { id: tetConfigId } } });
        const data = categories.map((cat) => ({
            id: cat.id,
            name: cat.name,
            color: cat.color,
            icon: cat.icon,
            used: usedByCategory.get(cat.id) ?? 0,
            planned: plannedByCategory.get(cat.id) ?? 0,
        }));
        return { currency: tetConfig.currency, categories: data };
    }
    async getTrend(userId, tetConfigId, groupBy = 'week') {
        await this.collaboratorsService.checkAccess(userId, tetConfigId);
        const tetConfig = await this.tetConfigRepository.findOne({ where: { id: tetConfigId } });
        if (!tetConfig)
            throw new common_1.NotFoundException('Tet config not found');
        const dateTrunc = groupBy === 'month' ? 'month' : 'week';
        const rows = await this.todoItemRepository.createQueryBuilder('todo').select(`DATE_TRUNC('${dateTrunc}', todo.created_at)`, 'period').addSelect('COALESCE(SUM(CASE WHEN todo.purchased = true THEN todo.estimated_price * todo.quantity ELSE 0 END), 0)', 'used').addSelect('COALESCE(SUM(todo.estimated_price * todo.quantity), 0)', 'planned').where('todo.tet_config_id = :id', { id: tetConfigId }).andWhere('todo.estimated_price IS NOT NULL').groupBy('period').orderBy('period', 'ASC').getRawMany();
        return {
            currency: tetConfig.currency,
            group_by: groupBy,
            data: rows.map((r) => ({ period: r.period, used: parseFloat(r.used), planned: parseFloat(r.planned) })),
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tet_config_entity_1.TetConfig)),
    __param(1, (0, typeorm_1.InjectRepository)(todo_item_entity_1.TodoItem)),
    __param(2, (0, typeorm_1.InjectRepository)(budget_transaction_entity_1.BudgetTransaction)),
    __param(3, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        collaborators_service_1.CollaboratorsService,
        budget_calculations_service_1.BudgetCalculationsService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map