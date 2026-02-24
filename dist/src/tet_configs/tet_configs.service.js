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
exports.TetConfigsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tet_config_entity_1 = require("./entities/tet_config.entity");
const category_entity_1 = require("../categories/entities/category.entity");
const collaborator_entity_1 = require("../collaborators/entities/collaborator.entity");
const budget_calculations_service_1 = require("../helper/budget-calculations.service");
const enums_1 = require("../helper/enums");
function warningLevel(percentage) {
    if (percentage >= 100)
        return 'critical';
    if (percentage >= 80)
        return 'warning';
    return 'ok';
}
let TetConfigsService = class TetConfigsService {
    tetConfigRepository;
    categoryRepository;
    collaboratorRepository;
    budgetCalculationsService;
    constructor(tetConfigRepository, categoryRepository, collaboratorRepository, budgetCalculationsService) {
        this.tetConfigRepository = tetConfigRepository;
        this.categoryRepository = categoryRepository;
        this.collaboratorRepository = collaboratorRepository;
        this.budgetCalculationsService = budgetCalculationsService;
    }
    async create(userId, createTetConfigDto) {
        const tetConfig = this.tetConfigRepository.create({
            ...createTetConfigDto,
            owner: { id: userId },
        });
        return this.tetConfigRepository.save(tetConfig);
    }
    async findAllByUser(userId) {
        const [owned, collabs] = await Promise.all([this.tetConfigRepository.find({ where: { owner: { id: userId } } }), this.collaboratorRepository.find({ where: { user: { id: userId }, status: enums_1.CollaboratorStatus.ACCEPTED }, relations: ['tet_config'] })]);
        const collaboratedConfigs = collabs.map((c) => c.tet_config);
        const seen = new Set(owned.map((tc) => tc.id));
        return [...owned, ...collaboratedConfigs.filter((tc) => !seen.has(tc.id))];
    }
    async findOne(id) {
        const tetConfig = await this.tetConfigRepository.findOne({
            where: { id },
            relations: ['owner'],
        });
        if (!tetConfig) {
            throw new common_1.NotFoundException('Tet config not found');
        }
        return tetConfig;
    }
    async update(id, updateTetConfigDto) {
        const tetConfig = await this.tetConfigRepository.findOne({ where: { id } });
        if (!tetConfig) {
            throw new common_1.NotFoundException('Tet config not found');
        }
        Object.assign(tetConfig, updateTetConfigDto);
        return this.tetConfigRepository.save(tetConfig);
    }
    async updateBudget(id, totalBudget) {
        const tetConfig = await this.tetConfigRepository.findOne({ where: { id } });
        if (!tetConfig)
            throw new common_1.NotFoundException('Tet config not found');
        const categories = await this.categoryRepository.find({ where: { tet_config: { id } } });
        const alreadyAllocated = categories.reduce((sum, c) => sum + Number(c.allocated_budget ?? 0), 0);
        if (totalBudget < alreadyAllocated) {
            throw new common_1.BadRequestException(`New total budget (${totalBudget}) is less than already allocated category budgets (${alreadyAllocated})`);
        }
        tetConfig.total_budget = totalBudget;
        return this.tetConfigRepository.save(tetConfig);
    }
    async getBudgetSummary(id) {
        const tetConfig = await this.tetConfigRepository.findOne({ where: { id } });
        if (!tetConfig)
            throw new common_1.NotFoundException('Tet config not found');
        const totalBudget = Number(tetConfig.total_budget);
        const [usedBudget, plannedBudget, usedByCategory, plannedByCategory] = await Promise.all([this.budgetCalculationsService.calculateTotalUsed(id), this.budgetCalculationsService.calculateTotalPlanned(id), this.budgetCalculationsService.calculateUsedByCategory(id), this.budgetCalculationsService.calculatePlannedByCategory(id)]);
        const percentageUsed = this.budgetCalculationsService.calculatePercentage(usedBudget, totalBudget);
        const percentagePlanned = this.budgetCalculationsService.calculatePercentage(plannedBudget, totalBudget);
        const categories = await this.categoryRepository.find({
            where: { tet_config: { id } },
        });
        const categoryBreakdown = categories.map((cat) => {
            const catUsed = usedByCategory.get(cat.id) ?? 0;
            const catPlanned = plannedByCategory.get(cat.id) ?? 0;
            const catAllocated = cat.allocated_budget ? Number(cat.allocated_budget) : null;
            const catRemaining = catAllocated !== null ? catAllocated - catPlanned : null;
            const catPercentagePlanned = catAllocated && catAllocated > 0 ? this.budgetCalculationsService.calculatePercentage(catPlanned, catAllocated) : null;
            const catPercentageUsed = catAllocated && catAllocated > 0 ? this.budgetCalculationsService.calculatePercentage(catUsed, catAllocated) : null;
            return {
                id: cat.id,
                name: cat.name,
                icon: cat.icon,
                allocated_budget: catAllocated,
                planned_budget: catPlanned,
                used_budget: catUsed,
                remaining_budget: catRemaining,
                percentage_planned: catPercentagePlanned,
                percentage_used: catPercentageUsed,
                warning_level: catPercentagePlanned !== null ? warningLevel(catPercentagePlanned) : 'no_limit',
            };
        });
        return {
            total_budget: totalBudget,
            planned_budget: plannedBudget,
            used_budget: usedBudget,
            remaining_budget: totalBudget - plannedBudget,
            percentage_planned: percentagePlanned,
            percentage_used: percentageUsed,
            warning_level: warningLevel(percentagePlanned),
            categories: categoryBreakdown,
        };
    }
    async remove(id) {
        const tetConfig = await this.tetConfigRepository.findOne({ where: { id } });
        if (!tetConfig) {
            throw new common_1.NotFoundException('Tet config not found');
        }
        await this.tetConfigRepository.softRemove(tetConfig);
        return { message: 'Tet config deleted successfully' };
    }
};
exports.TetConfigsService = TetConfigsService;
exports.TetConfigsService = TetConfigsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tet_config_entity_1.TetConfig)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(2, (0, typeorm_1.InjectRepository)(collaborator_entity_1.Collaborator)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        budget_calculations_service_1.BudgetCalculationsService])
], TetConfigsService);
//# sourceMappingURL=tet_configs.service.js.map