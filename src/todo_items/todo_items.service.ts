import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoItem } from './entities/todo_item.entity';
import { TetConfig } from '../tet_configs/entities/tet_config.entity';
import { Collaborator } from '../collaborators/entities/collaborator.entity';
import { CreateTodoItemDto } from './dto/create-todo_item.dto';
import { UpdateTodoItemDto } from './dto/update-todo_item.dto';
import { CollaboratorsService } from '../collaborators/collaborators.service';
import { NotificationsService } from '../notifications/notifications.service';
import { BudgetCalculationsService } from '../helper/budget-calculations.service';

@Injectable()
export class TodoItemsService {
  constructor(
    @InjectRepository(TodoItem)
    private readonly todoItemRepository: Repository<TodoItem>,
    @InjectRepository(TetConfig)
    private readonly tetConfigRepository: Repository<TetConfig>,
    @InjectRepository(Collaborator)
    private readonly collaboratorRepository: Repository<Collaborator>,
    private readonly collaboratorsService: CollaboratorsService,
    private readonly notificationsService: NotificationsService,
    private readonly budgetCalculationsService: BudgetCalculationsService,
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

    const wasPurchased = item.purchased;
    Object.assign(item, updateDto);
    const saved = await this.todoItemRepository.save(item);

    // check and notify
    if (!wasPurchased && saved.purchased) {
      await this.checkBudgetAndNotify(saved.tet_config.id);
    }

    return saved;
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

  private async checkBudgetAndNotify(tetConfigId: string) {
    const tetConfig = await this.tetConfigRepository.findOne({
      where: { id: tetConfigId },
      relations: ['owner'],
    });
    if (!tetConfig || !tetConfig.total_budget) return;

    const used = await this.budgetCalculationsService.calculateTotalUsed(tetConfigId);
    const percentage = this.budgetCalculationsService.calculatePercentage(used, Number(tetConfig.total_budget));

    // determine notification message
    let message: string | null = null;
    if (percentage >= 100) {
      message = `Budget exceeded! You've used ${percentage}% of your Tết budget`;
    } else if (percentage >= 80) {
      message = `Budget warning! You've used ${percentage}% of your Tết budget`;
    }

    if (!message) return;

    // send to owner
    await this.notificationsService.createForUser(tetConfig.owner.id, message);

    // send to all collaborators
    const collaborators = await this.collaboratorRepository.find({
      where: { tet_config: { id: tetConfigId } },
      relations: ['user'],
    });

    for (const collab of collaborators) {
      await this.notificationsService.createForUser(collab.user.id, message);
    }
  }
}
