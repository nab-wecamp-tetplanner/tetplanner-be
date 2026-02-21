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
exports.TodoItemsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const todo_items_service_1 = require("./todo_items.service");
const create_todo_item_dto_1 = require("./dto/create-todo_item.dto");
const update_todo_item_dto_1 = require("./dto/update-todo_item.dto");
const subtask_dto_1 = require("./dto/subtask.dto");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let TodoItemsController = class TodoItemsController {
    todoItemsService;
    constructor(todoItemsService) {
        this.todoItemsService = todoItemsService;
    }
    async create(req, createDto) {
        return this.todoItemsService.create(req.user.userId, createDto);
    }
    async findAll(req, tetConfigId, timelinePhaseId) {
        return this.todoItemsService.findAllByTetConfig(req.user.userId, tetConfigId, timelinePhaseId);
    }
    async findOne(req, id) {
        return this.todoItemsService.findOne(req.user.userId, id);
    }
    async update(req, id, updateDto) {
        return this.todoItemsService.update(req.user.userId, id, updateDto);
    }
    async upsertSubtask(req, id, dto) {
        return this.todoItemsService.upsertSubtask(req.user.userId, id, dto.name, dto.done ?? false);
    }
    async removeSubtask(req, id, dto) {
        return this.todoItemsService.removeSubtask(req.user.userId, id, dto.name);
    }
    async remove(req, id) {
        return this.todoItemsService.remove(req.user.userId, id);
    }
};
exports.TodoItemsController = TodoItemsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new todo item' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Todo item created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_todo_item_dto_1.CreateTodoItemDto]),
    __metadata("design:returntype", Promise)
], TodoItemsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all todo items by tet config, optionally filtered by timeline phase' }),
    (0, swagger_1.ApiQuery)({ name: 'tet_config_id', required: true, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'timeline_phase_id', required: false, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Todo items returned' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('tet_config_id')),
    __param(2, (0, common_1.Query)('timeline_phase_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], TodoItemsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a todo item by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Todo item returned' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Todo item not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TodoItemsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a todo item' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Todo item updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Todo item not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_todo_item_dto_1.UpdateTodoItemDto]),
    __metadata("design:returntype", Promise)
], TodoItemsController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/subtasks'),
    (0, swagger_1.ApiOperation)({ summary: 'Add or update a subtask (upsert by name)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Subtask upserted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Todo item not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, subtask_dto_1.UpsertSubtaskDto]),
    __metadata("design:returntype", Promise)
], TodoItemsController.prototype, "upsertSubtask", null);
__decorate([
    (0, common_1.Delete)(':id/subtasks'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a subtask by name' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Subtask removed' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Todo item not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, subtask_dto_1.RemoveSubtaskDto]),
    __metadata("design:returntype", Promise)
], TodoItemsController.prototype, "removeSubtask", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a todo item (soft delete)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Todo item deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Todo item not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TodoItemsController.prototype, "remove", null);
exports.TodoItemsController = TodoItemsController = __decorate([
    (0, swagger_1.ApiTags)('todo-items'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('todo-items'),
    __metadata("design:paramtypes", [todo_items_service_1.TodoItemsService])
], TodoItemsController);
//# sourceMappingURL=todo_items.controller.js.map