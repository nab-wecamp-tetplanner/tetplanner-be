import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TetConfigsModule } from './tet_configs/tet_configs.module';
import { CategoriesModule } from './categories/categories.module';
import { TimelinePhasesModule } from './timeline_phases/timeline_phases.module';
import { TodoItemsModule } from './todo_items/todo_items.module';
import { BudgetTransactionsModule } from './budget_transactions/budget_transactions.module';
import { CollaboratorsModule } from './collaborators/collaborators.module';

@Module({
  imports: [UsersModule, TetConfigsModule, CategoriesModule, TimelinePhasesModule, TodoItemsModule, BudgetTransactionsModule, CollaboratorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
