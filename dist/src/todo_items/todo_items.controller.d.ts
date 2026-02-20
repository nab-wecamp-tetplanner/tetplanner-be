import { TodoItemsService } from './todo_items.service';
import { CreateTodoItemDto } from './dto/create-todo_item.dto';
import { UpdateTodoItemDto } from './dto/update-todo_item.dto';
export declare class TodoItemsController {
    private readonly todoItemsService;
    constructor(todoItemsService: TodoItemsService);
    create(createTodoItemDto: CreateTodoItemDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTodoItemDto: UpdateTodoItemDto): string;
    remove(id: string): string;
}
