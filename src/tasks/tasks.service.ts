import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Not, Repository } from 'typeorm';
import { TodoItem } from '../todo_items/entities/todo_item.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { TodoStatus } from '../helper/enums';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(TodoItem)
    private readonly todoItemRepository: Repository<TodoItem>,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async checkOverdueTasks() {
    this.logger.log('Checking for overdue todo items...');

    const overdueItems = await this.todoItemRepository.find({
      where: {
        deadline: LessThanOrEqual(new Date()),
        is_overdue: false,
        status: Not(TodoStatus.COMPLETED),
      },
      relations: ['tet_config', 'tet_config.owner'],
    });

    for (const item of overdueItems) {
      const userId = item.assigned_to ?? item.tet_config?.owner?.id;
      if (!userId) continue;

      await this.todoItemRepository.update(item.id, { is_overdue: true });
      // eslint-disable-next-line prettier/prettier
      await this.notificationsService.createForTodoItem(userId, item.id, `"${item.title}" is overdue!`);
    }

    this.logger.log(`Marked ${overdueItems.length} item(s) as overdue.`);
  }
}
