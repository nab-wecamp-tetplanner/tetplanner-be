import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoItemDto } from './create-todo_item.dto';

export class UpdateTodoItemDto extends PartialType(CreateTodoItemDto) {}
