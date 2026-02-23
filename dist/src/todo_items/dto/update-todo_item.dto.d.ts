import { CreateTodoItemDto } from './create-todo_item.dto';
declare const UpdateTodoItemDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTodoItemDto>>;
export declare class UpdateTodoItemDto extends UpdateTodoItemDto_base {
    category_id?: string;
    estimated_price?: number;
}
export {};
