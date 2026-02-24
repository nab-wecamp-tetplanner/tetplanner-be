import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';
import { TetConfig } from '../tet_configs/entities/tet_config.entity';
import { BudgetTransaction } from '../budget_transactions/entities/budget_transaction.entity';
import { CollaboratorsModule } from '../collaborators/collaborators.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category, TetConfig, BudgetTransaction]), CollaboratorsModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
