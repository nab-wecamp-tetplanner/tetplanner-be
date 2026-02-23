import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoItem } from './entities/todo_item.entity';
import { TetConfig } from '../tet_configs/entities/tet_config.entity';
import { Collaborator } from '../collaborators/entities/collaborator.entity';
import { BudgetTransaction } from '../budget_transactions/entities/budget_transaction.entity';
import { CreateTodoItemDto } from './dto/create-todo_item.dto';
import { UpdateTodoItemDto } from './dto/update-todo_item.dto';
import { CollaboratorsService } from '../collaborators/collaborators.service';
import { NotificationsService } from '../notifications/notifications.service';
import { BudgetCalculationsService } from '../helper/budget-calculations.service';
import { TodoStatus, TransactionType } from '../helper/enums';

@Injectable()
export class TodoItemsService {
  constructor(
    @InjectRepository(TodoItem)
    private readonly todoItemRepository: Repository<TodoItem>,
    @InjectRepository(TetConfig)
    private readonly tetConfigRepository: Repository<TetConfig>,
    @InjectRepository(Collaborator)
    private readonly collaboratorRepository: Repository<Collaborator>,
    @InjectRepository(BudgetTransaction)
    private readonly budgetTransactionRepository: Repository<BudgetTransaction>,
    private readonly collaboratorsService: CollaboratorsService,
    private readonly notificationsService: NotificationsService,
    private readonly budgetCalculationsService: BudgetCalculationsService,
  ) {}

  async create(userId: string, createDto: CreateTodoItemDto) {
    await this.collaboratorsService.checkAccess(userId, createDto.tet_config_id);

    if (createDto.is_shopping && (!createDto.category_id || createDto.estimated_price == null)) {
      throw new BadRequestException('Shopping items require a category and an estimated price');
    }

    const item = this.todoItemRepository.create({
      ...createDto,
      tet_config: { id: createDto.tet_config_id },
      timeline_phase: { id: createDto.timeline_phase_id },
      ...(createDto.category_id && { category: { id: createDto.category_id } }),
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
      relations: ['tet_config', 'category'],
    });
    if (!item) throw new NotFoundException('Todo item not found');
    await this.collaboratorsService.checkAccess(userId, item.tet_config.id);

    const wasCompleted = item.status === TodoStatus.COMPLETED;
    const hadCost = item.estimated_price != null;

    Object.assign(item, updateDto);

    const isNowCompleted = item.status === TodoStatus.COMPLETED;
    const hasCost = item.estimated_price != null;

    const categoryId = updateDto.category_id ?? item.category?.id;
    if (item.is_shopping && (!categoryId || item.estimated_price == null)) {
      throw new BadRequestException('Shopping items require a category and an estimated price');
    }

    if (!wasCompleted && isNowCompleted && hasCost) {
      item.purchased = true;
    } else if (wasCompleted && !isNowCompleted && hadCost) {
      item.purchased = false;
    }

    const saved = await this.todoItemRepository.save(item);
    const tetConfigId = item.tet_config.id;
    const total = Number(item.tet_config.total_budget ?? 0);

    if (!wasCompleted && isNowCompleted && hasCost) {
      const amount = Number(item.estimated_price) * (item.quantity ?? 1);
      const tx = this.budgetTransactionRepository.create({
        amount,
        type: TransactionType.EXPENSE,
        note: `Completed: ${item.title}`,
        transaction_date: new Date(),
        tet_config: { id: tetConfigId },
        category: item.category ? { id: item.category.id } : undefined,
        todo_item: { id: item.id },
        recorded_by_user: { id: userId },
      });
      await this.budgetTransactionRepository.save(tx);
      await this.checkBudgetAndNotify(tetConfigId);
    } else if (wasCompleted && !isNowCompleted && hadCost) {
      const tx = await this.budgetTransactionRepository.findOne({ where: { todo_item: { id: item.id } } });
      if (tx) await this.budgetTransactionRepository.remove(tx);
    }

    const [used, planned] = await Promise.all([this.budgetCalculationsService.calculateTotalUsed(tetConfigId), this.budgetCalculationsService.calculateTotalPlanned(tetConfigId)]);
    const percentage_used = this.budgetCalculationsService.calculatePercentage(used, total);
    const percentage_planned = this.budgetCalculationsService.calculatePercentage(planned, total);

    return {
      todo_item: saved,
      budget: {
        total_budget: total,
        planned_budget: planned,
        used_budget: used,
        remaining_budget: total - planned,
        percentage_used,
        percentage_planned,
        warning_level: percentage_planned >= 100 ? 'critical' : percentage_planned >= 80 ? 'warning' : 'ok',
      },
    };
  }

  async upsertSubtask(userId: string, id: string, name: string, done: boolean) {
    const item = await this.todoItemRepository.findOne({
      where: { id },
      relations: ['tet_config'],
    });
    if (!item) throw new NotFoundException('Todo item not found');
    await this.collaboratorsService.checkAccess(userId, item.tet_config.id);

    item.subtasks = { ...item.subtasks, [name]: done };
    return this.todoItemRepository.save(item);
  }

  async removeSubtask(userId: string, id: string, name: string) {
    const item = await this.todoItemRepository.findOne({
      where: { id },
      relations: ['tet_config'],
    });
    if (!item) throw new NotFoundException('Todo item not found');
    await this.collaboratorsService.checkAccess(userId, item.tet_config.id);

    const { [name]: _, ...rest } = item.subtasks ?? {};
    item.subtasks = rest;
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
