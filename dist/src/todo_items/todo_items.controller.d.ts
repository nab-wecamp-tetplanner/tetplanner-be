import { TodoItemsService } from './todo_items.service';
import { CreateTodoItemDto } from './dto/create-todo_item.dto';
import { UpdateTodoItemDto } from './dto/update-todo_item.dto';
export declare class TodoItemsController {
    private readonly todoItemsService;
    constructor(todoItemsService: TodoItemsService);
    create(req: any, createDto: CreateTodoItemDto): Promise<import("./entities/todo_item.entity").TodoItem>;
    findAll(req: any, tetConfigId: string, timelinePhaseId?: string): Promise<import("./entities/todo_item.entity").TodoItem[]>;
    findOne(req: any, id: string): Promise<import("./entities/todo_item.entity").TodoItem>;
    update(req: any, id: string, updateDto: UpdateTodoItemDto): Promise<import("./entities/todo_item.entity").TodoItem>;
    remove(req: any, id: string): Promise<{
        message: string;
    }>;
}
