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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./entities/category.entity");
const tet_config_entity_1 = require("../tet_configs/entities/tet_config.entity");
const budget_transaction_entity_1 = require("../budget_transactions/entities/budget_transaction.entity");
const collaborators_service_1 = require("../collaborators/collaborators.service");
let CategoriesService = class CategoriesService {
    categoryRepository;
    tetConfigRepository;
    transactionRepository;
    collaboratorsService;
    constructor(categoryRepository, tetConfigRepository, transactionRepository, collaboratorsService) {
        this.categoryRepository = categoryRepository;
        this.tetConfigRepository = tetConfigRepository;
        this.transactionRepository = transactionRepository;
        this.collaboratorsService = collaboratorsService;
    }
    async getAllocatedSum(tetConfigId, excludeCategoryId) {
        const categories = await this.categoryRepository.find({ where: { tet_config: { id: tetConfigId } } });
        return categories.filter((c) => c.id !== excludeCategoryId).reduce((sum, c) => sum + Number(c.allocated_budget ?? 0), 0);
    }
    async create(createCategoryDto) {
        if (createCategoryDto.allocated_budget != null) {
            const tetConfig = await this.tetConfigRepository.findOne({ where: { id: createCategoryDto.tet_config_id } });
            if (!tetConfig)
                throw new common_1.NotFoundException('Tet config not found');
            const alreadyAllocated = await this.getAllocatedSum(createCategoryDto.tet_config_id);
            const newTotal = alreadyAllocated + Number(createCategoryDto.allocated_budget);
            if (newTotal > Number(tetConfig.total_budget)) {
                throw new common_1.BadRequestException(`Allocated budgets would exceed total budget. Available to allocate: ${Number(tetConfig.total_budget) - alreadyAllocated}`);
            }
        }
        const category = this.categoryRepository.create({
            ...createCategoryDto,
            tet_config: { id: createCategoryDto.tet_config_id },
        });
        return this.categoryRepository.save(category);
    }
    async findAllByTetConfig(tetConfigId) {
        return this.categoryRepository.find({
            where: { tet_config: { id: tetConfigId } },
        });
    }
    async findOne(id) {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return category;
    }
    async update(id, updateCategoryDto) {
        const category = await this.categoryRepository.findOne({ where: { id }, relations: ['tet_config'] });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        if (updateCategoryDto.allocated_budget != null) {
            const tetConfigId = category.tet_config.id;
            const tetConfig = await this.tetConfigRepository.findOne({ where: { id: tetConfigId } });
            if (!tetConfig)
                throw new common_1.NotFoundException('Tet config not found');
            const alreadyAllocated = await this.getAllocatedSum(tetConfigId, id);
            const newTotal = alreadyAllocated + Number(updateCategoryDto.allocated_budget);
            if (newTotal > Number(tetConfig.total_budget)) {
                throw new common_1.BadRequestException(`Allocated budgets would exceed total budget. Available to allocate: ${Number(tetConfig.total_budget) - alreadyAllocated}`);
            }
        }
        Object.assign(category, updateCategoryDto);
        return this.categoryRepository.save(category);
    }
    async remove(id) {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        await this.categoryRepository.softRemove(category);
        return { message: 'Category deleted successfully' };
    }
    async findTransactions(userId, categoryId, from, to, page = 1, limit = 20) {
        const category = await this.categoryRepository.findOne({ where: { id: categoryId }, relations: ['tet_config'] });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        await this.collaboratorsService.checkAccess(userId, category.tet_config.id);
        const query = this.transactionRepository
            .createQueryBuilder('tx')
            .where('tx.category_id = :categoryId', { categoryId })
            .orderBy('tx.transaction_date', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        if (from)
            query.andWhere('tx.transaction_date >= :from', { from: new Date(from) });
        if (to)
            query.andWhere('tx.transaction_date <= :to', { to: new Date(to) });
        const [data, total] = await query.getManyAndCount();
        return { data, total, page, limit };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(1, (0, typeorm_1.InjectRepository)(tet_config_entity_1.TetConfig)),
    __param(2, (0, typeorm_1.InjectRepository)(budget_transaction_entity_1.BudgetTransaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        collaborators_service_1.CollaboratorsService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map