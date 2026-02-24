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
exports.TasksQueryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const todo_item_entity_1 = require("../todo_items/entities/todo_item.entity");
const collaborators_service_1 = require("../collaborators/collaborators.service");
const enums_1 = require("../helper/enums");
let TasksQueryService = class TasksQueryService {
    todoItemRepository;
    collaboratorsService;
    constructor(todoItemRepository, collaboratorsService) {
        this.todoItemRepository = todoItemRepository;
        this.collaboratorsService = collaboratorsService;
    }
    async getToday(userId, tetConfigId) {
        await this.collaboratorsService.checkAccess(userId, tetConfigId);
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        return this.todoItemRepository.find({
            where: { tet_config: { id: tetConfigId }, deadline: (0, typeorm_2.Between)(startOfDay, endOfDay) },
            relations: ['category', 'assigned_to_user', 'timeline_phase'],
            order: { deadline: 'ASC' },
        });
    }
    async getUpcoming(userId, tetConfigId) {
        await this.collaboratorsService.checkAccess(userId, tetConfigId);
        const now = new Date();
        const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        return this.todoItemRepository.find({
            where: { tet_config: { id: tetConfigId }, deadline: (0, typeorm_2.Between)(now, in7Days), status: enums_1.TodoStatus.PENDING },
            relations: ['category', 'assigned_to_user', 'timeline_phase'],
            order: { deadline: 'ASC' },
        });
    }
};
exports.TasksQueryService = TasksQueryService;
exports.TasksQueryService = TasksQueryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todo_item_entity_1.TodoItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        collaborators_service_1.CollaboratorsService])
], TasksQueryService);
//# sourceMappingURL=tasks-query.service.js.map