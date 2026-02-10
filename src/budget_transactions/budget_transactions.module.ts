import { Module } from '@nestjs/common';
import { BudgetTransactionsService } from './budget_transactions.service';
import { BudgetTransactionsController } from './budget_transactions.controller';

@Module({
  controllers: [BudgetTransactionsController],
  providers: [BudgetTransactionsService],
})
export class BudgetTransactionsModule {}
