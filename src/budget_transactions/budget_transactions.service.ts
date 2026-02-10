import { Injectable } from '@nestjs/common';
import { CreateBudgetTransactionDto } from './dto/create-budget_transaction.dto';
import { UpdateBudgetTransactionDto } from './dto/update-budget_transaction.dto';

@Injectable()
export class BudgetTransactionsService {
  create(createBudgetTransactionDto: CreateBudgetTransactionDto) {
    return 'This action adds a new budgetTransaction';
  }

  findAll() {
    return `This action returns all budgetTransactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} budgetTransaction`;
  }

  update(id: number, updateBudgetTransactionDto: UpdateBudgetTransactionDto) {
    return `This action updates a #${id} budgetTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} budgetTransaction`;
  }
}
