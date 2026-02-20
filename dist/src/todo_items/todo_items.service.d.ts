import { CreateTodoItemDto } from './dto/create-todo_item.dto';
import { UpdateTodoItemDto } from './dto/update-todo_item.dto';
export declare class TodoItemsService {
    create(createTodoItemDto: CreateTodoItemDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTodoItemDto: UpdateTodoItemDto): string;
    remove(id: number): string;
}
