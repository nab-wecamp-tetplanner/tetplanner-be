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
const todo_item_entity_1 = require("../todo_items/entities/todo_item.entity");
let TetConfigsService = class TetConfigsService {
    tetConfigRepository;
    todoItemRepository;
    constructor(tetConfigRepository, todoItemRepository) {
        this.tetConfigRepository = tetConfigRepository;
        this.todoItemRepository = todoItemRepository;
    }
    async create(userId, createTetConfigDto) {
        const tetConfig = this.tetConfigRepository.create({
            ...createTetConfigDto,
            owner: { id: userId },
        });
        return this.tetConfigRepository.save(tetConfig);
    }
    async findAllByUser(userId) {
        return this.tetConfigRepository.find({
            where: { owner: { id: userId } },
        });
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
        if (!tetConfig) {
            throw new common_1.NotFoundException('Tet config not found');
        }
        tetConfig.total_budget = totalBudget;
        return this.tetConfigRepository.save(tetConfig);
    }
    async getBudgetSummary(id) {
        const tetConfig = await this.tetConfigRepository.findOne({ where: { id } });
        if (!tetConfig) {
            throw new common_1.NotFoundException('Tet config not found');
        }
        const result = await this.todoItemRepository
            .createQueryBuilder('todo')
            .select('COALESCE(SUM(todo.estimated_price * todo.quantity), 0)', 'used_budget')
            .where('todo.tet_config_id = :id', { id })
            .andWhere('todo.purchased = :purchased', { purchased: true })
            .getRawOne();
        return {
            total_budget: tetConfig.total_budget,
            used_budget: parseFloat(result.used_budget),
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
    __param(1, (0, typeorm_1.InjectRepository)(todo_item_entity_1.TodoItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TetConfigsService);
//# sourceMappingURL=tet_configs.service.js.map