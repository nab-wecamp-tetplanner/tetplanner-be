import { Test, TestingModule } from '@nestjs/testing';
import { BudgetTransactionsController } from './budget_transactions.controller';
import { BudgetTransactionsService } from './budget_transactions.service';

describe('BudgetTransactionsController', () => {
  let controller: BudgetTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BudgetTransactionsController],
      providers: [BudgetTransactionsService],
    }).compile();

    controller = module.get<BudgetTransactionsController>(BudgetTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
