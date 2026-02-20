import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoItem } from './entities/todo_item.entity';
import { CreateTodoItemDto } from './dto/create-todo_item.dto';
import { UpdateTodoItemDto } from './dto/update-todo_item.dto';

@Injectable()
export class TodoItemsService {
  constructor(
    @InjectRepository(TodoItem)
    private readonly todoItemRepository: Repository<TodoItem>,
  ) {}

  async create(createTodoItemDto: CreateTodoItemDto) {
    const item = this.todoItemRepository.create({
      ...createTodoItemDto,
      tet_config: { id: createTodoItemDto.tet_config_id },
      timeline_phase: { id: createTodoItemDto.timeline_phase_id },
      category: { id: createTodoItemDto.category_id },
      ...(createTodoItemDto.assigned_to && { assigned_to_user: { id: createTodoItemDto.assigned_to } }),
    });
    return this.todoItemRepository.save(item);
  }

  async findAllByTetConfig(tetConfigId: string, timelinePhaseId?: string) {
    const where: any = { tet_config: { id: tetConfigId } };
    if (timelinePhaseId) where.timeline_phase = { id: timelinePhaseId };
    return this.todoItemRepository.find({
      where,
      order: { created_at: 'ASC' },
    });
  }

  async findOne(id: string) {
    const item = await this.todoItemRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Todo item not found');
    return item;
  }

  async update(id: string, updateTodoItemDto: UpdateTodoItemDto) {
    const item = await this.todoItemRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Todo item not found');
    Object.assign(item, updateTodoItemDto);
    return this.todoItemRepository.save(item);
  }

  async remove(id: string) {
    const item = await this.todoItemRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Todo item not found');
    await this.todoItemRepository.softRemove(item);
    return { message: 'Todo item deleted successfully' };
  }
}
