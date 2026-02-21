import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoItem } from './entities/todo_item.entity';
import { CreateTodoItemDto } from './dto/create-todo_item.dto';
import { UpdateTodoItemDto } from './dto/update-todo_item.dto';
import { CollaboratorsService } from '../collaborators/collaborators.service';

@Injectable()
export class TodoItemsService {
  constructor(
    @InjectRepository(TodoItem)
    private readonly todoItemRepository: Repository<TodoItem>,
    private readonly collaboratorsService: CollaboratorsService,
  ) {}

  async create(userId: string, createDto: CreateTodoItemDto) {
    await this.collaboratorsService.checkAccess(userId, createDto.tet_config_id);
    const item = this.todoItemRepository.create({
      ...createDto,
      tet_config: { id: createDto.tet_config_id },
      timeline_phase: { id: createDto.timeline_phase_id },
      category: { id: createDto.category_id },
      ...(createDto.assigned_to && { assigned_to_user: { id: createDto.assigned_to } }),
    });
    return this.todoItemRepository.save(item);
  }

  async findAllByTetConfig(userId: string, tetConfigId: string, timelinePhaseId?: string) {
    await this.collaboratorsService.checkAccess(userId, tetConfigId);
    const where: any = { tet_config: { id: tetConfigId } };
    if (timelinePhaseId) where.timeline_phase = { id: timelinePhaseId };
    return this.todoItemRepository.find({
      where,
      order: { created_at: 'ASC' },
    });
  }

  async findOne(userId: string, id: string) {
    const item = await this.todoItemRepository.findOne({
      where: { id },
      relations: ['tet_config'],
    });
    if (!item) throw new NotFoundException('Todo item not found');
    await this.collaboratorsService.checkAccess(userId, item.tet_config.id);
    return item;
  }

  async update(userId: string, id: string, updateDto: UpdateTodoItemDto) {
    const item = await this.todoItemRepository.findOne({
      where: { id },
      relations: ['tet_config'],
    });
    if (!item) throw new NotFoundException('Todo item not found');
    await this.collaboratorsService.checkAccess(userId, item.tet_config.id);
    Object.assign(item, updateDto);
    return this.todoItemRepository.save(item);
  }

  async remove(userId: string, id: string) {
    const item = await this.todoItemRepository.findOne({
      where: { id },
      relations: ['tet_config'],
    });
    if (!item) throw new NotFoundException('Todo item not found');
    await this.collaboratorsService.checkAccess(userId, item.tet_config.id);
    await this.todoItemRepository.softRemove(item);
    return { message: 'Todo item deleted successfully' };
  }
}
