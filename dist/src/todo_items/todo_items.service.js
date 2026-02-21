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
exports.TodoItemsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const todo_item_entity_1 = require("./entities/todo_item.entity");
const tet_config_entity_1 = require("../tet_configs/entities/tet_config.entity");
const collaborator_entity_1 = require("../collaborators/entities/collaborator.entity");
const collaborators_service_1 = require("../collaborators/collaborators.service");
const notifications_service_1 = require("../notifications/notifications.service");
const budget_calculations_service_1 = require("../helper/budget-calculations.service");
let TodoItemsService = class TodoItemsService {
    todoItemRepository;
    tetConfigRepository;
    collaboratorRepository;
    collaboratorsService;
    notificationsService;
    budgetCalculationsService;
    constructor(todoItemRepository, tetConfigRepository, collaboratorRepository, collaboratorsService, notificationsService, budgetCalculationsService) {
        this.todoItemRepository = todoItemRepository;
        this.tetConfigRepository = tetConfigRepository;
        this.collaboratorRepository = collaboratorRepository;
        this.collaboratorsService = collaboratorsService;
        this.notificationsService = notificationsService;
        this.budgetCalculationsService = budgetCalculationsService;
    }
    async create(userId, createDto) {
        await this.collaboratorsService.checkAccess(userId, createDto.tet_config_id);
        const item = this.todoItemRepository.create({
            ...createDto,
            tet_config: { id: createDto.tet_config_id },
            timeline_phase: { id: createDto.timeline_phase_id },
            category: { id: createDto.category_id },
            ...(createDto.assigned_to && { assigned_to_user: { id: createDto.assigned_to } }),
        });
        return this.todoItemRepository.save(item);
    }
    async findAllByTetConfig(userId, tetConfigId, timelinePhaseId) {
        await this.collaboratorsService.checkAccess(userId, tetConfigId);
        const where = { tet_config: { id: tetConfigId } };
        if (timelinePhaseId)
            where.timeline_phase = { id: timelinePhaseId };
        return this.todoItemRepository.find({
            where,
            order: { created_at: 'ASC' },
        });
    }
    async findOne(userId, id) {
        const item = await this.todoItemRepository.findOne({
            where: { id },
            relations: ['tet_config'],
        });
        if (!item)
            throw new common_1.NotFoundException('Todo item not found');
        await this.collaboratorsService.checkAccess(userId, item.tet_config.id);
        return item;
    }
    async update(userId, id, updateDto) {
        const item = await this.todoItemRepository.findOne({
            where: { id },
            relations: ['tet_config'],
        });
        if (!item)
            throw new common_1.NotFoundException('Todo item not found');
        await this.collaboratorsService.checkAccess(userId, item.tet_config.id);
        const wasPurchased = item.purchased;
        Object.assign(item, updateDto);
        const saved = await this.todoItemRepository.save(item);
        if (!wasPurchased && saved.purchased) {
            await this.checkBudgetAndNotify(saved.tet_config.id);
        }
        return saved;
    }
    async remove(userId, id) {
        const item = await this.todoItemRepository.findOne({
            where: { id },
            relations: ['tet_config'],
        });
        if (!item)
            throw new common_1.NotFoundException('Todo item not found');
        await this.collaboratorsService.checkAccess(userId, item.tet_config.id);
        await this.todoItemRepository.softRemove(item);
        return { message: 'Todo item deleted successfully' };
    }
    async checkBudgetAndNotify(tetConfigId) {
        const tetConfig = await this.tetConfigRepository.findOne({
            where: { id: tetConfigId },
            relations: ['owner'],
        });
        if (!tetConfig || !tetConfig.total_budget)
            return;
        const used = await this.budgetCalculationsService.calculateTotalUsed(tetConfigId);
        const percentage = this.budgetCalculationsService.calculatePercentage(used, Number(tetConfig.total_budget));
        let message = null;
        if (percentage >= 100) {
            message = `Budget exceeded! You've used ${percentage}% of your Tết budget`;
        }
        else if (percentage >= 80) {
            message = `Budget warning! You've used ${percentage}% of your Tết budget`;
        }
        if (!message)
            return;
        await this.notificationsService.createForUser(tetConfig.owner.id, message);
        const collaborators = await this.collaboratorRepository.find({
            where: { tet_config: { id: tetConfigId } },
            relations: ['user'],
        });
        for (const collab of collaborators) {
            await this.notificationsService.createForUser(collab.user.id, message);
        }
    }
};
exports.TodoItemsService = TodoItemsService;
exports.TodoItemsService = TodoItemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todo_item_entity_1.TodoItem)),
    __param(1, (0, typeorm_1.InjectRepository)(tet_config_entity_1.TetConfig)),
    __param(2, (0, typeorm_1.InjectRepository)(collaborator_entity_1.Collaborator)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        collaborators_service_1.CollaboratorsService,
        notifications_service_1.NotificationsService,
        budget_calculations_service_1.BudgetCalculationsService])
], TodoItemsService);
//# sourceMappingURL=todo_items.service.js.map