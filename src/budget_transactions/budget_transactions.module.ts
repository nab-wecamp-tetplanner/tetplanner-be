import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetTransactionsService } from './budget_transactions.service';
import { BudgetTransactionsController } from './budget_transactions.controller';
import { BudgetTransaction } from './entities/budget_transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BudgetTransaction])],
  controllers: [BudgetTransactionsController],
  providers: [BudgetTransactionsService],
})
export class BudgetTransactionsModule {}
