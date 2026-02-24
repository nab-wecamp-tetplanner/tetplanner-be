import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TetConfig } from '../tet_configs/entities/tet_config.entity';
import { TodoItem } from '../todo_items/entities/todo_item.entity';
import { BudgetTransaction } from '../budget_transactions/entities/budget_transaction.entity';
import { Category } from '../categories/entities/category.entity';
import { CollaboratorsModule } from '../collaborators/collaborators.module';
import { BudgetCalculationsService } from '../helper/budget-calculations.service';

@Module({
  imports: [TypeOrmModule.forFeature([TetConfig, TodoItem, BudgetTransaction, Category]), CollaboratorsModule],
  controllers: [DashboardController],
  providers: [DashboardService, BudgetCalculationsService],
})
export class DashboardModule {}
