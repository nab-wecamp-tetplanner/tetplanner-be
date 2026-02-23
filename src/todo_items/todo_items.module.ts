import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItemsService } from './todo_items.service';
import { TodoItemsController } from './todo_items.controller';
import { TodoItem } from './entities/todo_item.entity';
import { TetConfig } from '../tet_configs/entities/tet_config.entity';
import { Collaborator } from '../collaborators/entities/collaborator.entity';
import { BudgetTransaction } from '../budget_transactions/entities/budget_transaction.entity';
import { CollaboratorsModule } from '../collaborators/collaborators.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { BudgetCalculationsService } from '../helper/budget-calculations.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoItem, TetConfig, Collaborator, BudgetTransaction]), CollaboratorsModule, NotificationsModule],
  controllers: [TodoItemsController],
  providers: [TodoItemsService, BudgetCalculationsService],
})
export class TodoItemsModule {}
