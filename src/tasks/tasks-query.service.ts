import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { TodoItem } from '../todo_items/entities/todo_item.entity';
import { CollaboratorsService } from '../collaborators/collaborators.service';
import { TodoStatus } from '../helper/enums';

@Injectable()
export class TasksQueryService {
  constructor(
    @InjectRepository(TodoItem)
    private readonly todoItemRepository: Repository<TodoItem>,
    private readonly collaboratorsService: CollaboratorsService,
  ) {}

  async getToday(userId: string, tetConfigId: string) {
    await this.collaboratorsService.checkAccess(userId, tetConfigId);

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    return this.todoItemRepository.find({
      where: { tet_config: { id: tetConfigId }, deadline: Between(startOfDay, endOfDay) },
      relations: ['category', 'assigned_to_user', 'timeline_phase'],
      order: { deadline: 'ASC' },
    });
  }

  async getUpcoming(userId: string, tetConfigId: string) {
    await this.collaboratorsService.checkAccess(userId, tetConfigId);

    const now = new Date();
    const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    return this.todoItemRepository.find({
      where: { tet_config: { id: tetConfigId }, deadline: Between(now, in7Days), status: TodoStatus.PENDING },
      relations: ['category', 'assigned_to_user', 'timeline_phase'],
      order: { deadline: 'ASC' },
    });
  }
}
