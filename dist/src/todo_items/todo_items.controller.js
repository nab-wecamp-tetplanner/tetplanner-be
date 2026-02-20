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
const todo_items_service_1 = require("./todo_items.service");
const create_todo_item_dto_1 = require("./dto/create-todo_item.dto");
const update_todo_item_dto_1 = require("./dto/update-todo_item.dto");
let TodoItemsController = class TodoItemsController {
    todoItemsService;
    constructor(todoItemsService) {
        this.todoItemsService = todoItemsService;
    }
    create(createTodoItemDto) {
        return this.todoItemsService.create(createTodoItemDto);
    }
    findAll() {
        return this.todoItemsService.findAll();
    }
    findOne(id) {
        return this.todoItemsService.findOne(+id);
    }
    update(id, updateTodoItemDto) {
        return this.todoItemsService.update(+id, updateTodoItemDto);
    }
    remove(id) {
        return this.todoItemsService.remove(+id);
    }
};
exports.TodoItemsController = TodoItemsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_todo_item_dto_1.CreateTodoItemDto]),
    __metadata("design:returntype", void 0)
], TodoItemsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TodoItemsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TodoItemsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_todo_item_dto_1.UpdateTodoItemDto]),
    __metadata("design:returntype", void 0)
], TodoItemsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TodoItemsController.prototype, "remove", null);
exports.TodoItemsController = TodoItemsController = __decorate([
    (0, common_1.Controller)('todo-items'),
    __metadata("design:paramtypes", [todo_items_service_1.TodoItemsService])
], TodoItemsController);
//# sourceMappingURL=todo_items.controller.js.map