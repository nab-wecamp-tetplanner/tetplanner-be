import { TodoItemsService } from './todo_items.service';
import { CreateTodoItemDto } from './dto/create-todo_item.dto';
import { UpdateTodoItemDto } from './dto/update-todo_item.dto';
import { UpsertSubtaskDto, RemoveSubtaskDto } from './dto/subtask.dto';
import type { AuthRequest } from '../helper/interfaces/auth-request.interface';
export declare class TodoItemsController {
    private readonly todoItemsService;
    constructor(todoItemsService: TodoItemsService);
    create(req: AuthRequest, createDto: CreateTodoItemDto): Promise<import("./entities/todo_item.entity").TodoItem>;
    findAll(req: AuthRequest, tetConfigId: string, timelinePhaseId?: string): Promise<import("./entities/todo_item.entity").TodoItem[]>;
    findAllByPhase(req: AuthRequest, phaseId: string): Promise<import("./entities/todo_item.entity").TodoItem[]>;
    findOne(req: AuthRequest, id: string): Promise<import("./entities/todo_item.entity").TodoItem>;
    update(req: AuthRequest, id: string, updateDto: UpdateTodoItemDto): Promise<{
        todo_item: import("./entities/todo_item.entity").TodoItem;
        budget: {
            total_budget: number;
            planned_budget: number;
            used_budget: number;
            remaining_budget: number;
            percentage_used: number;
            percentage_planned: number;
            warning_level: string;
        };
    }>;
    upsertSubtask(req: AuthRequest, id: string, dto: UpsertSubtaskDto): Promise<import("./entities/todo_item.entity").TodoItem>;
    removeSubtask(req: AuthRequest, id: string, dto: RemoveSubtaskDto): Promise<import("./entities/todo_item.entity").TodoItem>;
    remove(req: AuthRequest, id: string): Promise<{
        message: string;
    }>;
}
