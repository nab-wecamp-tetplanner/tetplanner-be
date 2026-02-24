import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TetConfigsService } from './tet_configs.service';
import { TetConfigsController } from './tet_configs.controller';
import { TetConfig } from './entities/tet_config.entity';
import { TodoItem } from '../todo_items/entities/todo_item.entity';
import { Category } from '../categories/entities/category.entity';
import { Collaborator } from '../collaborators/entities/collaborator.entity';
import { BudgetCalculationsService } from '../helper/budget-calculations.service';

@Module({
  imports: [TypeOrmModule.forFeature([TetConfig, TodoItem, Category, Collaborator])],
  controllers: [TetConfigsController],
  providers: [TetConfigsService, BudgetCalculationsService],
})
export class TetConfigsModule {}
