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
var TasksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const todo_item_entity_1 = require("../todo_items/entities/todo_item.entity");
const notifications_service_1 = require("../notifications/notifications.service");
const enums_1 = require("../helper/enums");
let TasksService = TasksService_1 = class TasksService {
    todoItemRepository;
    notificationsService;
    logger = new common_1.Logger(TasksService_1.name);
    constructor(todoItemRepository, notificationsService) {
        this.todoItemRepository = todoItemRepository;
        this.notificationsService = notificationsService;
    }
    async checkOverdueTasks() {
        this.logger.log('Checking for overdue todo items...');
        const overdueItems = await this.todoItemRepository.find({
            where: {
                deadline: (0, typeorm_2.LessThanOrEqual)(new Date()),
                is_overdue: false,
                status: (0, typeorm_2.Not)(enums_1.TodoStatus.COMPLETED),
            },
            relations: ['tet_config', 'tet_config.owner', 'assigned_to_user'],
        });
        for (const item of overdueItems) {
            const userId = item.assigned_to_user?.id ?? item.tet_config?.owner?.id;
            if (!userId)
                continue;
            await this.todoItemRepository.update(item.id, { is_overdue: true });
            await this.notificationsService.createForTodoItem(userId, item.id, `"${item.title}" is overdue!`);
        }
        this.logger.log(`Marked ${overdueItems.length} item(s) as overdue.`);
    }
};
exports.TasksService = TasksService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksService.prototype, "checkOverdueTasks", null);
exports.TasksService = TasksService = TasksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todo_item_entity_1.TodoItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        notifications_service_1.NotificationsService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map