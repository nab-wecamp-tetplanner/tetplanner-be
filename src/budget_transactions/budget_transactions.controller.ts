import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BudgetTransactionsService } from './budget_transactions.service';
import { CreateBudgetTransactionDto } from './dto/create-budget_transaction.dto';
import { UpdateBudgetTransactionDto } from './dto/update-budget_transaction.dto';

@Controller('budget-transactions')
export class BudgetTransactionsController {
  constructor(private readonly budgetTransactionsService: BudgetTransactionsService) {}

  @Post()
  create(@Body() createBudgetTransactionDto: CreateBudgetTransactionDto) {
    return this.budgetTransactionsService.create(createBudgetTransactionDto);
  }

  @Get()
  findAll() {
    return this.budgetTransactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.budgetTransactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBudgetTransactionDto: UpdateBudgetTransactionDto) {
    return this.budgetTransactionsService.update(+id, updateBudgetTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetTransactionsService.remove(+id);
  }
}
